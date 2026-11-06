import { ArrowLeft, Home, SearchX } from 'lucide-react'

export const NotFoundPage = () => (
  <main className="relative isolate flex min-h-[calc(100vh-74px)] items-center overflow-hidden bg-[#061f3b] px-5 py-16 text-white sm:px-8 lg:px-12">
    <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:72px_72px]" />
    <div className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-[#0b5d9b]/45 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#f15a24]/25 blur-3xl" />

    <section className="relative mx-auto grid w-full max-w-[1240px] items-center gap-14 lg:grid-cols-[1.05fr_.95fr]" aria-labelledby="not-found-title">
      <div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-[#ff7138] backdrop-blur">
          <SearchX className="h-4 w-4" /> Page not found
        </p>
        <p className="mt-7 text-[clamp(7rem,18vw,13rem)] font-black leading-[0.72] tracking-[-0.08em] text-[#f15a24]" aria-hidden="true">404</p>
        <h1 id="not-found-title" className="mt-8 max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.045em] sm:text-6xl">
          This space hasn&apos;t been built yet.
        </h1>
        <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-white/75 sm:text-lg">
          The page may have moved, or the address may be incorrect. Let&apos;s get you back to a space that exists.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="/" className="inline-flex items-center gap-3 rounded-full bg-[#f15a24] px-7 py-3.5 text-sm font-extrabold shadow-[0_12px_30px_rgba(241,90,36,.3)] transition hover:bg-[#ff6b30]">
            <Home className="h-4 w-4" /> Back to home
          </a>
          <button type="button" onClick={() => window.history.back()} className="inline-flex items-center gap-3 rounded-full border border-white/60 bg-white/10 px-7 py-3.5 text-sm font-extrabold transition hover:bg-white hover:text-[#071c31]">
            <ArrowLeft className="h-4 w-4" /> Go back
          </button>
        </div>
      </div>

      <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center" aria-hidden="true">
        <div className="absolute inset-[8%] rounded-full border border-white/15 bg-white/[0.04]" />
        <div className="absolute inset-[18%] rounded-full border border-dashed border-[#f15a24]/60" />
        <div className="relative flex h-52 w-64 rotate-[-4deg] flex-col rounded-2xl border border-white/25 bg-[#092e50] p-5 shadow-2xl">
          <div className="flex gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#f15a24]" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /><span className="h-2.5 w-2.5 rounded-full bg-white/25" /></div>
          <div className="mt-8 h-3 w-2/3 rounded bg-white/15" />
          <div className="mt-3 h-3 w-full rounded bg-white/10" />
          <div className="mt-3 h-3 w-4/5 rounded bg-white/10" />
          <SearchX className="absolute -bottom-8 -right-7 h-24 w-24 rounded-full bg-[#f15a24] p-6 text-white shadow-xl" />
        </div>
      </div>
    </section>
  </main>
)

export default NotFoundPage