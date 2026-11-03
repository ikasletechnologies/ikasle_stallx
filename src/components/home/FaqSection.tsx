import React from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'How early should I enquire?',
    answer: 'Share your event date and requirements as early as possible so we can plan the design, approvals, fabrication and production schedule.',
  },
  {
    question: 'Can you design for my stall dimensions?',
    answer: 'Yes. Every concept is adapted to your exact floor plan, open sides, height limits, venue rules and visitor-flow requirements.',
  },
  {
    question: 'What should I include in my brief?',
    answer: 'Include your event details, stall size, brand guidelines, objectives, preferred features, reference ideas, budget range and project timeline.',
  },
  {
    question: 'Can I request a custom design?',
    answer: 'Absolutely. We create tailor-made exhibition environments that reflect your brand, products, audience and campaign goals.',
  },
  {
    question: 'Do you handle fabrication and installation?',
    answer: 'Yes. Our turnkey service covers design development, fabrication, logistics, on-site installation, handover and dismantling.',
  },
  {
    question: 'Can you integrate screens and interactive technology?',
    answer: 'Yes. We can incorporate LED displays, touchscreens, product demos, lighting systems, audio and other interactive experiences.',
  },
  {
    question: 'Do you work across different exhibition venues?',
    answer: 'Yes. We coordinate with venues and organisers while adapting the build to their technical, safety and access requirements.',
  },
  {
    question: 'How long does production take?',
    answer: 'Timelines depend on the scale and complexity of the project, but a typical custom stall requires several weeks from approval to completion.',
  },
  {
    question: 'Can the stall be reused for future events?',
    answer: 'Yes. We can design modular components that can be stored, reconfigured and reused across different spaces and exhibitions.',
  },
  {
    question: 'How do I get a quotation?',
    answer: 'Send us your event details, stall dimensions and requirements through the contact section, and our team will prepare a tailored proposal.',
  },
]

export const FaqSection: React.FC = () => (
      <section className="bg-[#f8f6f1] px-4 py-2 sm:px-6 lg:px-8" aria-labelledby="faq-title">
        <div className="mx-auto max-w-[1380px]">
          <div className="mb-5" data-reveal="slide-left">
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#ef5a25] sm:text-xs">
                FAQ
              </p>
              <span className="h-[2px] w-12 bg-[#ef5a25]" />
            </div>
            <h2
              id="faq-title"
              className="mt-2 text-[38px] font-black leading-[0.95] tracking-[-0.045em] text-[#071c31] sm:text-[52px]"
            >
              Your expo questions, <span className="text-[#f15a24]">answered.</span>
            </h2>
          </div>

          <div className="space-y-2" data-reveal-stagger="drop">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group overflow-hidden rounded-lg border border-slate-300 bg-white/35 open:border-[#f15a24]/50 open:bg-gradient-to-r open:from-[#fff3eb] open:to-white/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-3 text-sm font-extrabold text-[#101d2b] marker:hidden sm:text-base [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180 group-open:text-[#f15a24]" />
                </summary>
                <div className="border-t border-[#f15a24]/25 px-5 py-3 text-sm font-medium leading-relaxed text-[#344454]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
)
