import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Image } from 'lucide-react'

interface GroupCompany {
  name: string
  /** Logo image URL — leave empty to show the placeholder. */
  logo?: string
  website: string
}

// Replace these placeholders with the real group companies.
const companies: GroupCompany[] = [
  { name: 'Company one', website: '#contact' },
  { name: 'Company two', website: '#contact' },
  { name: 'Company three', website: '#contact' },
  { name: 'Company four', website: '#contact' },
  { name: 'Company five', website: '#contact' },
  { name: 'Company six', website: '#contact' },
]

const AUTOPLAY_MS = 3500

export const GroupCompaniesSection: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0)
  const [positions, setPositions] = useState(1)
  const [paused, setPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  /** Distance between the left edges of two neighbouring cards. */
  const stepOf = (track: HTMLDivElement) => {
    const [first, second] = Array.from(track.children) as HTMLElement[]
    if (!first) return track.clientWidth
    return second ? second.offsetLeft - first.offsetLeft : first.offsetWidth
  }

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const step = stepOf(track)
    const cardWidth = (track.children[0] as HTMLElement | undefined)?.offsetWidth ?? step
    const gap = step - cardWidth
    const visible = Math.max(1, Math.round((track.clientWidth + gap) / step))
    setPositions(Math.max(1, companies.length - visible + 1))
    setPosition(Math.round(track.scrollLeft / step))
  }, [])

  const scrollToPosition = useCallback((index: number) => {
    const track = trackRef.current
    if (!track) return
    track.scrollTo({ left: index * stepOf(track), behavior: 'smooth' })
  }, [])

  const next = useCallback(() => scrollToPosition(position >= positions - 1 ? 0 : position + 1), [position, positions, scrollToPosition])
  const prev = useCallback(() => scrollToPosition(position <= 0 ? positions - 1 : position - 1), [position, positions, scrollToPosition])

  useEffect(() => {
    measure()
    const track = trackRef.current
    if (!track) return undefined
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [measure])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || reduceMotion || positions < 2) return undefined
    const timer = window.setTimeout(next, AUTOPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [paused, reduceMotion, positions, next])

  const arrowClass =
    'flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-[#071c31] shadow-sm transition hover:border-[#f15a24] hover:bg-[#f15a24] hover:text-white disabled:opacity-40'

  return (
    <section className="relative overflow-hidden bg-[#f8f6f1] px-4 py-2 sm:px-6 lg:px-8" aria-labelledby="group-companies-title">
      <div className="pointer-events-none absolute right-7 top-0 hidden h-32 w-72 opacity-35 lg:block">
        <div className="absolute right-5 top-6 h-20 w-48 border-x border-t border-slate-400 [transform:skewY(-10deg)]" />
        <div className="absolute right-20 top-0 h-28 w-24 border-x border-t border-slate-400" />
        <div className="absolute right-2 top-20 h-px w-64 -rotate-[10deg] bg-slate-400" />
        <div className="absolute right-2 top-20 h-px w-64 -rotate-[20deg] bg-slate-300" />
        <div className="absolute right-28 top-12 h-14 w-px bg-slate-400" />
        <div className="absolute right-12 top-12 h-12 w-px bg-slate-400" />
      </div>

      <div className="relative mx-auto max-w-[1380px]">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4" data-reveal="blur-in">
          <div>
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ef5a25] sm:text-xs">Our group companies</p>
              <span className="h-[2px] w-12 bg-[#ef5a25]" />
            </div>
            <h2 id="group-companies-title" className="mt-2 text-[38px] font-black leading-[0.95] tracking-[-0.045em] text-[#071c31] sm:text-[50px]">
              One group. Multiple <span className="text-[#f15a24]">possibilities.</span>
            </h2>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <button type="button" onClick={prev} disabled={positions < 2} aria-label="Previous companies" className={arrowClass}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={next} disabled={positions < 2} aria-label="Next companies" className={arrowClass}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Group companies"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            onScroll={measure}
            data-reveal-stagger="flip-up"
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {companies.map((company, index) => (
              <article
                key={company.name}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${companies.length}: ${company.name}`}
                className="flex min-h-[205px] shrink-0 basis-full snap-start flex-col items-center justify-center rounded-xl border border-dashed border-slate-400 bg-white/20 px-6 py-5 text-center transition hover:border-[#f15a24] hover:bg-white/60 sm:basis-[calc((100%-20px)/2)] md:basis-[calc((100%-40px)/3)]"
              >
                {company.logo ? (
                  <img src={company.logo} alt={`${company.name} logo`} className="h-14 max-w-[160px] object-contain" />
                ) : (
                  <>
                    <div className="flex h-12 w-14 items-center justify-center rounded-sm border-2 border-slate-400 bg-white text-slate-400">
                      <Image className="h-7 w-7" strokeWidth={1.7} />
                    </div>
                    <p className="mt-2 text-sm text-slate-500">Company logo</p>
                  </>
                )}
                <h3 className="mt-1 text-lg font-extrabold text-[#071c31]">{company.name}</h3>
                <a
                  href={company.website}
                  aria-label={`Visit ${company.name} website`}
                  className="mt-3 inline-flex min-w-44 items-center justify-center gap-4 rounded-md border border-slate-400 bg-white/60 px-5 py-1.5 text-sm font-bold text-[#071c31] transition hover:border-[#f15a24] hover:text-[#f15a24]"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>

          {positions > 1 && (
            <div className="mt-5 flex items-center justify-center gap-2">
              {Array.from({ length: positions }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => scrollToPosition(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === position}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === position ? 'w-8 bg-[#f15a24]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
