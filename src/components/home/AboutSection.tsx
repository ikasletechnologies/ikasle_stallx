import React from 'react'
import { AboutIllustration } from './AboutIllustration'

export const AboutSection: React.FC = () => (
      <section id="about" className="scroll-mt-24 overflow-hidden bg-[#f8f6f1]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[43%_17%_40%]">
          <div className="flex min-h-[350px] items-center px-6 py-12 sm:px-10 lg:px-14 xl:px-16">
            <div data-reveal-stagger="mask-up">
              <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ef5a25] sm:text-xs">
                About StallX
              </p>
              <h2 className="max-w-[610px] text-[43px] font-black leading-[0.9] tracking-[-0.045em] text-[#071c31] sm:text-[55px] lg:text-[58px]">
                7 years of
                <br />
                turning spaces
                <br />
                into <span className="text-[#f15a24]">experiences.</span>
              </h2>
              <p className="mt-5 max-w-[520px] text-sm font-medium leading-[1.45] text-[#17293a] sm:text-base">
                Ikaslé StallX creates custom expo stalls and
                <br className="hidden sm:block" /> event environments that bring your brand to life.
              </p>
              <div className="mt-5 h-[3px] w-14 bg-[#f15a24]" />
            </div>
          </div>

          <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden border-y border-slate-200/60 bg-[#faf9f5] py-10 lg:min-h-[350px] lg:border-y-0 lg:border-x">
            <div className="pointer-events-none absolute inset-7 bg-[linear-gradient(to_right,rgba(148,163,184,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,.18)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative text-center" data-reveal="pop" style={{ '--reveal-delay': '200ms' } as React.CSSProperties}>
              <span className="block text-[118px] font-black leading-[0.72] tracking-[-0.08em] text-[#f15a24] sm:text-[140px] lg:text-[124px] xl:text-[150px]">
                7
              </span>
              <p className="mt-5 text-sm font-black uppercase leading-[1.05] tracking-[0.12em] text-[#071c31] sm:text-base">
                Years of
                <br />
                experience
              </p>
            </div>
          </div>

          <div data-reveal="wipe" style={{ '--reveal-delay': '300ms' } as React.CSSProperties} className="relative flex min-h-[350px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_70%_40%,#0d3352_0%,#091925_70%)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:28px_28px]" />
            <AboutIllustration className="relative h-full max-h-[380px] w-full p-4 sm:p-6" />
          </div>
        </div>
      </section>
)
