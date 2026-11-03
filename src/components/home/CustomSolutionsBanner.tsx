import React from 'react'
import { ArrowRight } from 'lucide-react'

export const CustomSolutionsBanner: React.FC = () => (
      <section className="px-4 sm:px-6 lg:px-8" aria-label="Custom solutions">
        <a
          href="#contact"
          data-reveal="unfold"
          className="group relative mx-auto grid max-w-[1380px] overflow-hidden rounded-xl bg-gradient-to-r from-[#f05a21] via-[#ff6a22] to-[#f4511e] px-5 py-4 text-white shadow-[0_8px_24px_rgba(241,90,36,0.18)] transition hover:shadow-[0_10px_30px_rgba(241,90,36,0.28)] sm:grid-cols-[210px_1fr_auto] sm:items-center sm:px-8"
        >
          <div className="flex items-center gap-5 sm:pr-7">
            <span className="whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.2em]">
              And more
            </span>
            <span className="h-px w-14 bg-white/80" />
          </div>

          <div className="mt-3 border-white/55 sm:mt-0 sm:border-l sm:pl-8">
            <h3 className="text-xl font-extrabold leading-none tracking-[-0.02em] sm:text-2xl">
              Your ideas. More possibilities.
            </h3>
            <p className="mt-1 text-xs font-medium text-white/95 sm:text-sm">
              Have something different in mind? Let&apos;s explore a custom solution for your brand.
            </p>
          </div>

          <div className="pointer-events-none absolute bottom-0 right-12 hidden h-full w-64 opacity-30 lg:block">
            <div className="absolute bottom-3 right-4 h-10 w-44 border-x border-t border-white [transform:skewY(-12deg)]" />
            <div className="absolute bottom-3 right-11 h-16 w-24 border-x border-t border-white" />
            <div className="absolute bottom-3 right-0 h-px w-56 -rotate-[8deg] bg-white" />
            <div className="absolute bottom-3 right-0 h-px w-56 -rotate-[18deg] bg-white/80" />
            <div className="absolute bottom-3 right-24 h-14 w-px bg-white/80" />
            <div className="absolute bottom-3 right-16 h-12 w-px bg-white/80" />
            <div className="absolute bottom-3 right-8 h-9 w-px bg-white/80" />
          </div>

          <div className="relative z-10 mt-4 flex justify-end sm:mt-0 sm:pl-8">
            <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </a>
      </section>
)
