import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 280) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div
      aria-hidden={!isVisible}
      className={`transition-all duration-300 ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#081e33]/90 text-white shadow-xl backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-[#ff7a00] hover:border-[#ff7a00] hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff7a00]"
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-0.5" strokeWidth={2.5} />
        
        {/* Tooltip on right side since button is on the left */}
        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-[#081e33] px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg backdrop-blur transition-opacity group-hover:opacity-100">
          Scroll to top
        </span>
      </button>
    </div>
  )
}
