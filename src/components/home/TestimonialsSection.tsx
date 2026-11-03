import React, { useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
}

// SAMPLE CONTENT — replace with real, approved client testimonials before going live.
const testimonials: Testimonial[] = [
  {
    quote: 'StallX completely transformed our expo presence. The stall looked stunning and pulled in visitors all three days!',
    name: 'Client Name',
    role: 'Marketing Head, Company',
    rating: 5,
  },
  {
    quote: 'Professional, creative and on time. From the 3D design to on-site setup, everything was handled end to end.',
    name: 'Client Name',
    role: 'Founder, Company',
    rating: 5,
  },
  {
    quote: 'Our product launch stage was exactly what we imagined. The team understood our brand from the very first meeting.',
    name: 'Client Name',
    role: 'Brand Manager, Company',
    rating: 5,
  },
  {
    quote: 'Smart modular design that we have reused across multiple trade shows. Great value and great finish.',
    name: 'Client Name',
    role: 'Director, Company',
    rating: 5,
  },
]

// Where "Read More Reviews" points — e.g. your Google Business reviews link.
const REVIEWS_URL = '#contact'

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const QuoteMark: React.FC = () => (
  <svg viewBox="0 0 44 32" className="h-7 w-10 text-[#f15a24]" fill="currentColor" aria-hidden="true">
    <path d="M0 32V19.2C0 8.5 5.2 2.1 15.6 0l2 4.4c-5 1.5-7.6 4.6-8 9.4H18V32H0zm26 0V19.2C26 8.5 31.2 2.1 41.6 0l2 4.4c-5 1.5-7.6 4.6-8 9.4H44V32H26z" />
  </svg>
)

const HeartDoodle: React.FC = () => (
  <svg viewBox="0 0 48 44" className="h-11 w-12 -rotate-6 text-[#f15a24]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M24 40C14 32 4 25 4 14.5 4 8.6 8.5 4 14 4c4.3 0 7.6 2.6 10 6.5C26.4 6.6 29.7 4 34 4c5.5 0 10 4.6 10 10.5C44 25 34 32 24 40z" />
    <path d="M24 40c-2-6 1-13 7-17" opacity=".55" />
  </svg>
)

export const TestimonialsSection: React.FC = () => {
  const total = testimonials.length
  const [start, setStart] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  const go = (step: 1 | -1) => {
    setDirection(step === 1 ? 'next' : 'prev')
    setStart((current) => (current + step + total) % total)
  }

  const visible = [testimonials[start], testimonials[(start + 1) % total]].map((testimonial, slot) => ({
    testimonial,
    index: (start + slot) % total,
  }))

  const arrowClass =
    'flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#071c31] shadow-[0_6px_18px_rgba(7,28,49,.08)] transition hover:border-[#f15a24] hover:bg-[#f15a24] hover:text-white'

  return (
    <section className="bg-[#f8f6f1] px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="testimonials-title">
      <div className="mx-auto grid max-w-[1380px] items-center gap-8 lg:grid-cols-[360px_minmax(0,1fr)_auto] lg:gap-10">
        {/* Intro */}
        <div data-reveal="swing">
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ef5a25] sm:text-xs">Happy clients</p>
            <span className="h-[2px] w-12 bg-[#ef5a25]" />
          </div>
          <div className="mt-3 flex items-start gap-3">
            <h2 id="testimonials-title" className="whitespace-nowrap text-[34px] font-black leading-none tracking-[-0.04em] text-[#071c31] sm:text-[42px]">
              Happy Clients.
              <span className="relative mt-1 block w-fit font-extrabold italic tracking-[-0.03em] text-[#f15a24]">
                Real Results.
                <svg viewBox="0 0 220 12" preserveAspectRatio="none" className="absolute -bottom-3 left-0 h-3 w-full text-[#f15a24]/70" aria-hidden="true">
                  <path d="M2 9C60 2 150 1 218 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
            <HeartDoodle />
          </div>

          <a
            href={REVIEWS_URL}
            className="group mt-8 inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-[#071c31] shadow-[0_6px_18px_rgba(7,28,49,.08)] transition hover:border-[#f15a24] hover:text-[#f15a24]"
          >
            Read More Reviews
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2" aria-live="polite" data-reveal="rise-tilt" style={{ '--reveal-delay': '150ms' } as React.CSSProperties}>
          {visible.map(({ testimonial, index }, slot) => (
            <figure
              key={`${index}-${start}`}
              className={`flex-col rounded-2xl border border-white bg-white p-6 shadow-[0_14px_40px_rgba(7,28,49,.08)] sm:p-7 ${
                direction === 'next' ? 'animate-slide-up-in' : 'animate-slide-down-in'
              } ${slot === 1 ? 'hidden [animation-delay:80ms] sm:flex' : 'flex'}`}
            >
              <QuoteMark />
              <blockquote className="mt-4 flex-1 text-[15px] font-medium leading-relaxed text-[#2a3b4c]">{testimonial.quote}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071c31] text-sm font-black text-white ring-2 ring-[#f15a24]/40 ring-offset-2">
                  {initialsOf(testimonial.name)}
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-sm font-extrabold text-[#071c31]">{testimonial.name}</strong>
                  <span className="block truncate text-xs font-medium text-slate-500">{testimonial.role}</span>
                  <span className="mt-1 flex gap-0.5" aria-label={`Rated ${testimonial.rating} out of 5`}>
                    {Array.from({ length: 5 }, (_, star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${star < testimonial.rating ? 'fill-[#fbbf24] text-[#fbbf24]' : 'fill-slate-200 text-slate-200'}`}
                        aria-hidden="true"
                      />
                    ))}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3 lg:flex-col" data-reveal="fade-up" style={{ '--reveal-delay': '350ms' } as React.CSSProperties}>
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={arrowClass}>
            <ArrowUp className="hidden h-4 w-4 lg:block" strokeWidth={2.5} />
            <ArrowLeft className="h-4 w-4 lg:hidden" strokeWidth={2.5} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={arrowClass}>
            <ArrowDown className="hidden h-4 w-4 lg:block" strokeWidth={2.5} />
            <ArrowRight className="h-4 w-4 lg:hidden" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  )
}
