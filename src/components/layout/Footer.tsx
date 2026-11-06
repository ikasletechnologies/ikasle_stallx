import React from 'react'
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react'
import logoImg from '@/assets/stallX.png'

const footerLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Contact', href: '/#contact' },
]

const serviceLinks = [
  { label: 'Exhibition Stalls', href: '/#exhibition-stalls' },
  { label: 'Event Setups', href: '/#event-setups' },
  { label: 'Custom Designs', href: '/#custom-designs' },
  { label: 'Brand Experiences', href: '/#brand-experiences' },
]

type BrandIconProps = { className?: string }

const InstagramIcon: React.FC<BrandIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
    <circle cx="12" cy="12" r="4.3" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
)

const LinkedInIcon: React.FC<BrandIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
)

const YouTubeIcon: React.FC<BrandIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
  </svg>
)

const FacebookIcon: React.FC<BrandIconProps> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
  </svg>
)

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: LinkedInIcon },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: YouTubeIcon },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: FacebookIcon },
]

export const Footer: React.FC = () => (
  <footer className="relative overflow-hidden border-t border-[#174564] bg-[radial-gradient(circle_at_50%_45%,#083a5b_0%,#052a45_45%,#031d32_100%)] text-white">
    <div className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:80px_80px]" />

    <div className="pointer-events-none absolute bottom-20 left-7 hidden h-56 w-[37%] opacity-25 lg:block">
      <div className="absolute bottom-0 left-0 h-px w-full -rotate-[4deg] bg-[#56b7ee]" />
      <div className="absolute bottom-5 left-16 h-px w-[88%] -rotate-[12deg] bg-[#56b7ee]" />
      <div className="absolute bottom-10 left-36 h-px w-[72%] -rotate-[22deg] bg-[#56b7ee]" />
    </div>

    <div className="relative mx-auto max-w-[1440px] px-6 pb-8 pt-12 sm:px-10 lg:px-14 lg:pt-14">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_.62fr_1fr_1fr] lg:gap-0" data-reveal-stagger="fade-up">
        <section className="relative lg:border-r lg:border-white/20 lg:pr-12">
          <a href="/#home" aria-label="Ikaslé StallX home" className="inline-flex rounded-xl bg-white p-2 shadow-lg">
            <img src={logoImg} alt="Ikaslé StallX" className="h-[68px] w-[220px] rounded-lg object-contain" />
          </a>
          <p className="mt-5 max-w-[330px] text-lg font-medium leading-relaxed text-[#b8d1e3] sm:text-xl">
            Exhibition stalls. Memorable<br className="hidden sm:block" /> brand experiences.
          </p>
          <div className="mt-6 flex items-center gap-5">
            {socialLinks.map(({ label, href, icon: SocialIcon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="text-[#ff7a00] transition hover:-translate-y-1 hover:text-white">
                <SocialIcon className="h-7 w-7" />
              </a>
            ))}
          </div>
        </section>

        <section className="lg:border-r lg:border-white/20 lg:px-10">
          <h2 className="text-2xl font-black sm:text-3xl">Links</h2>
          <ul className="mt-6 space-y-4 text-base font-semibold sm:text-lg">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition hover:text-[#ff7a00]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:border-r lg:border-white/20 lg:px-10">
          <h2 className="text-2xl font-black sm:text-3xl">Services</h2>
          <ul className="mt-6 space-y-4 text-base text-white/90 sm:text-lg">
            {serviceLinks.map((service) => (
              <li key={service.label}>
                <a href={service.href} className="group flex items-center gap-2 transition hover:text-[#ff7a00]">
                  <ChevronRight className="h-5 w-5 shrink-0 text-[#ff7a00] transition group-hover:translate-x-1" strokeWidth={2.5} />
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg:pl-10">
          <h2 className="text-2xl font-black sm:text-3xl">Get in touch</h2>
          <div className="mt-6 space-y-4 text-base text-white/90 sm:text-lg">
            <a href="mailto:businessgroupikasle@gmail.com" className="flex min-w-0 items-center gap-4 [overflow-wrap:anywhere] transition hover:text-[#ff7a00]">
              <Mail className="h-7 w-7 shrink-0 text-[#ff7a00]" strokeWidth={2.2} />
              businessgroupikasle@gmail.com
            </a>
            <a href="tel:+917845132962" className="flex items-center gap-4 transition hover:text-[#ff7a00]">
              <Phone className="h-7 w-7 shrink-0 text-[#ff7a00]" strokeWidth={2.2} />
              +91 78451 32962
            </a>
            <div className="flex items-start gap-4">
              <MapPin className="mt-0.5 h-7 w-7 shrink-0 text-[#ff7a00]" strokeWidth={2.2} />
              <address className="not-italic leading-7 text-white/85">
                1639/A, 2nd Floor, Hopes,<br />
                Coimbatore, India – 641004
              </address>
            </div>
          </div>
        </section>
      </div>

      <div className="relative mt-12 border-t border-white/40 pt-5 lg:mt-14">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-[#b8d1e3] lg:flex-row sm:text-base">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Ikaslé StallX. All rights reserved.</p>
            <span className="hidden sm:inline text-white/30">•</span>
            <p className="text-xs sm:text-sm text-[#b8d1e3]">
              Crafted by{' '}
              <a
                href="https://ikasleinnovations.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white transition hover:text-[#ff7a00]"
              >
                Ikasle Technologies
              </a>
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm sm:text-base" aria-label="Legal navigation">
            <a href="/privacy-policy" className="transition hover:text-[#ff7a00]">Privacy Policy</a>
            <a href="/faq" className="transition hover:text-[#ff7a00]">FAQ</a>
            <a href="/terms-and-conditions" className="transition hover:text-[#ff7a00]">Terms &amp; Conditions</a>
          </nav>
        </div>
      </div>
    </div>
  </footer>
)
