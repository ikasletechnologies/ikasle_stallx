import React from 'react'

interface LegalSection {
  title: string
  content: string
}

interface LegalPageLayoutProps {
  eyebrow: string
  title: string
  intro: string
  sections: LegalSection[]
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({ eyebrow, title, intro, sections }) => (
  <main className="bg-[#fbf7f1] px-5 py-16 sm:px-8 lg:py-24">
    <div className="mx-auto max-w-4xl">
      <div className="rounded-3xl bg-gradient-to-br from-[#061f3b] to-[#0b477c] px-7 py-12 text-white shadow-xl sm:px-12">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff7138]">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-6xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">{intro}</p>
      </div>

      <div className="mt-8 space-y-4">
        {sections.map((section, index) => (
          <section key={section.title} className="rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
            <div className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fff0e8] text-xs font-black text-[#f15a24]">{index + 1}</span>
              <div>
                <h2 className="text-xl font-extrabold text-[#071c31]">{section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{section.content}</p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">Last updated: November 2026</p>
    </div>
  </main>
)