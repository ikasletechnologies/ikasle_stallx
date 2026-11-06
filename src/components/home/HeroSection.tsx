import React from 'react'
import { ArrowRight, Check, Hand, Sparkles, type LucideIcon } from 'lucide-react'
import CardSwap, { Card as SwapCard } from '@/components/common/CardSwap'
import { services } from '@/data/services'
import { ServiceIllustration } from './ServiceIllustrations'
import { AboutIllustration } from './AboutIllustration'

interface HeroCard {
  id: string
  title: string
  tagline: string
  icon: LucideIcon
  art: React.ReactNode
}

const heroCards: HeroCard[] = [
  {
    id: 'space-to-experience',
    title: 'From space to experience',
    tagline: 'Empty floor plans turned into branded worlds',
    icon: Sparkles,
    art: (
      <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_70%_40%,#0d3352_0%,#091925_75%)]">
        <AboutIllustration className="h-full w-full p-3" />
      </div>
    ),
  },
  ...services.map((service) => ({
    id: service.id,
    title: service.title,
    tagline: service.menuDescription,
    icon: service.icon,
    art: <ServiceIllustration serviceId={service.id} className="h-full w-full" />,
  })),
]

export const HeroSection: React.FC = () => (
  <section id="home" className="scroll-mt-24 relative isolate min-h-[700px] overflow-hidden bg-[#061f3b] text-white">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(40,106,181,.55),transparent_34%),radial-gradient(circle_at_60%_65%,rgba(241,90,36,.2),transparent_32%),linear-gradient(135deg,#04182d_0%,#082e59_55%,#064786_100%)]" />
    <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:72px_72px]" />

    <div className="relative z-10 mx-auto grid min-h-[700px] max-w-[1440px] grid-cols-1 items-center gap-12 px-6 pb-32 pt-16 sm:px-10 lg:grid-cols-[47%_53%] lg:px-16 lg:pb-36">
      <div className="relative z-20" data-reveal-stagger="slide-right">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.17em] text-[#ff7a42] backdrop-blur-md">
          <Sparkles className="h-4 w-4" />
          Exhibition experiences 2026
        </div>

        <h1 className="text-[51px] font-black leading-[1.08] tracking-[-0.05em] sm:text-[68px] xl:text-[78px]">
          Big ideas.
          <br />
          <span className="font-medium text-white">Bold spaces.</span>
        </h1>
        <p className="mt-6 max-w-[600px] text-base font-medium leading-relaxed text-white/80 sm:text-lg">
          Custom exhibition stalls and immersive brand environments designed to turn every interaction into a lasting impression.
        </p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/85">
          {['Custom-built', 'Turnkey delivery', 'Brand focused'].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#ff7138]" strokeWidth={3} />
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href="#contact" className="group inline-flex items-center gap-4 rounded-full bg-[#f15a24] px-7 py-3.5 text-sm font-extrabold shadow-[0_12px_30px_rgba(241,90,36,.35)] transition hover:bg-[#ff6b30]">
            Plan your expo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#services" className="rounded-full border border-white/75 bg-white/10 px-7 py-3.5 text-sm font-extrabold backdrop-blur transition hover:bg-white hover:text-[#071c31]">
            View services
          </a>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[680px]" data-reveal="zoom-tilt" style={{ '--reveal-delay': '250ms' } as React.CSSProperties}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f15a24]/20 blur-[90px]" />
        <div className="relative h-[340px] sm:h-[440px] lg:h-[540px]">
          <CardSwap
            theme="navy"
            width={460}
            height={340}
            cardDistance={52}
            verticalDistance={58}
            depth={90}
            visibleCards={4}
            delay={3800}
            cardRadius={22}
            ariaLabel="StallX services showcase"
          >
            {heroCards.map((card, index) => {
              const CardIcon = card.icon
              return (
                <SwapCard key={card.id}>
                  <div className="flex h-full flex-col gap-2 p-2">
                    <div className="flex h-11 shrink-0 items-center gap-3 px-2">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f15a24] text-white shadow-[0_6px_16px_rgba(241,90,36,.45)]">
                        <CardIcon className="h-4 w-4" strokeWidth={2.2} />
                      </span>
                      <span className="min-w-0">
                        <strong className="block truncate text-[15px] font-extrabold leading-tight">{card.title}</strong>
                        <span className="block truncate text-[11px] font-medium text-white/60">{card.tagline}</span>
                      </span>
                      <span className="ml-auto shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white/70">
                        {String(index + 1).padStart(2, '0')} / {String(heroCards.length).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="min-h-0 flex-1 overflow-hidden rounded-[15px] ring-1 ring-white/10">{card.art}</div>
                  </div>
                </SwapCard>
              )
            })}
          </CardSwap>
        </div>
        <p className="mt-2 flex items-center justify-center gap-2 text-xs font-semibold text-white/55">
          <Hand className="h-4 w-4 text-[#ff7138]" />
          Drag, click or use arrow keys to explore
        </p>
      </div>
    </div>

    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="h-full w-full" aria-hidden="true">
        <path d="M0,78 C150,15 210,135 350,78 C485,24 540,136 680,80 C830,18 900,142 1040,80 C1180,22 1300,70 1440,104 L1440,150 L0,150 Z" fill="#f15a24" opacity=".95" />
        <path d="M0,64 C150,1 210,121 350,64 C485,10 540,122 680,66 C830,4 900,128 1040,66 C1180,8 1300,56 1440,90 L1440,150 L0,150 Z" fill="#fbf7f1" />
      </svg>
    </div>
  </section>
)
