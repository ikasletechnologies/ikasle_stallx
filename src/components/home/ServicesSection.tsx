import React from 'react'
import { Check, ChevronDown, ArrowUpRight } from 'lucide-react'
import { services } from '@/data/services'
import { ServiceIllustration } from './ServiceIllustrations'

export const ServicesSection: React.FC = () => (
  <section id="services" className="scroll-mt-[74px] bg-[#f8f6f1] px-4 py-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[1380px]">
      <div className="mb-7" data-reveal="fade-up">
        <div className="flex items-center gap-3">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ef5a25] sm:text-xs">Our services</p>
          <span className="h-[2px] w-12 bg-[#ef5a25]" />
        </div>
        <h2 className="mt-2 text-[38px] font-black leading-[0.95] tracking-[-0.045em] text-[#071c31] sm:text-[52px] lg:text-[58px]">
          Spaces designed around <span className="text-[#f15a24]">your brand.</span>
        </h2>
        <p className="mt-3 max-w-2xl text-sm font-medium text-slate-600">Hover over a service topic or tap it to explore everything included.</p>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => {
          const ServiceIcon = service.icon
          return (
            <article key={service.id} id={service.id} data-reveal={index % 2 === 0 ? 'slide-right' : 'slide-left'} className="scroll-mt-[90px] group/service overflow-visible rounded-2xl border border-[#cfd3d5] bg-white/55 shadow-sm transition hover:border-[#f15a24]/60 hover:shadow-lg">
              <div className="grid overflow-visible rounded-2xl lg:grid-cols-[240px_300px_1fr]">
                <ServiceIllustration serviceId={service.id} className="h-52 overflow-hidden rounded-t-2xl lg:h-full lg:min-h-[245px] lg:rounded-l-2xl lg:rounded-tr-none" />

                <div className="flex gap-4 border-b border-slate-200 px-5 py-6 lg:border-b-0 lg:border-r lg:px-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f15a24] text-white shadow-md shadow-orange-200">
                    <ServiceIcon className="h-6 w-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-[24px] font-extrabold leading-none tracking-[-0.03em] text-[#071c31] transition-colors group-hover/service:text-[#f15a24]">{service.title}</h3>
                    <p className="mt-3 text-sm font-medium leading-[1.35] text-[#405060]">{service.description}</p>
                    <a href="#contact" className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-[#f15a24] hover:underline">
                      Discuss this service <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                <div className="grid content-start gap-2 p-4 sm:grid-cols-2 sm:p-5">
                  {service.topics.map((topic) => (
                    <details key={topic.title} className="group/topic relative rounded-xl border border-slate-200 bg-white transition hover:z-20 hover:border-[#f15a24]/50 hover:shadow-md open:border-[#f15a24]/50 open:shadow-md">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-extrabold text-[#17293a] transition group-hover/topic:text-[#f15a24] [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center gap-2">
                          <Check className="h-4 w-4 shrink-0 text-[#f15a24]" strokeWidth={3} />
                          {topic.title}
                        </span>
                        <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open/topic:rotate-180" />
                      </summary>
                      <ul className="hidden border-t border-orange-100 bg-[#fffaf6] px-4 py-3 text-xs font-medium leading-relaxed text-slate-600 group-open/topic:block lg:group-hover/topic:block">
                        {topic.items.map((item) => (
                          <li key={item} className="flex gap-2 py-1">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#f15a24]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  </section>
)