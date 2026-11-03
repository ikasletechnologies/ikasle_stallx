import { useLayoutEffect } from 'react'

const SELECTOR = '[data-reveal], [data-reveal-stagger]'

/**
 * Plays each element's `data-reveal` / `data-reveal-stagger` animation (see index.css)
 * the first time it scrolls into view. Runs before paint so nothing flashes, and does
 * nothing for visitors who prefer reduced motion.
 */
export const useScrollReveal = () => {
  useLayoutEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined

    const root = document.documentElement
    root.classList.add('reveal-armed')

    const intersection = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-revealed')
          intersection.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )

    const watch = (scope: ParentNode) => {
      scope.querySelectorAll(SELECTOR).forEach((element) => {
        if (!element.classList.contains('is-revealed')) intersection.observe(element)
      })
    }
    watch(document)

    const mutations = new MutationObserver((records) => {
      records.forEach((record) =>
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.matches(SELECTOR)) intersection.observe(node)
          watch(node)
        }),
      )
    })
    mutations.observe(document.body, { childList: true, subtree: true })

    return () => {
      intersection.disconnect()
      mutations.disconnect()
      root.classList.remove('reveal-armed')
    }
  }, [])
}
