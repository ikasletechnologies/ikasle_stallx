import React from 'react'
import { ArrowUpRight, Camera, Layers3, Video } from 'lucide-react'
import exhibitionCoverage from '@/assets/photography/exhibition-coverage.jpg'
import eventCoverage from '@/assets/photography/event-coverage.jpg'
import designShowcase from '@/assets/photography/design-showcase.jpg'
import brandContent from '@/assets/photography/brand-content.jpg'

type IconProps = { className?: string; strokeWidth?: number }

/** Lucide has no calendar-with-star icon, so this one is drawn to match its style. */
const CalendarStar: React.FC<IconProps> = ({ className, strokeWidth = 2 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
    <polygon points="12,12.3 12.82,14.57 15.23,14.65 13.33,16.13 14,18.45 12,17.1 10,18.45 10.67,16.13 8.77,14.65 11.18,14.57" fill="currentColor" stroke="none" />
  </svg>
)

interface ShootType {
  title: string
  description: string
  image: string
  imageAlt: string
  icon: React.ComponentType<IconProps>
}

const shootTypes: ShootType[] = [
  {
    title: 'Exhibition Coverage',
    description: 'Stall walkthroughs, displays & visitor moments',
    image: exhibitionCoverage,
    imageAlt: 'Photographer shooting a StallX exhibition stall',
    icon: Camera,
  },
  {
    title: 'Event Coverage',
    description: 'Corporate events, launches & stage highlights',
    image: eventCoverage,
    imageAlt: 'Photographer capturing a speaker on stage at a business summit',
    icon: CalendarStar,
  },
  {
    title: 'Design Showcase Shoots',
    description: 'Custom installations & branded interiors',
    image: designShowcase,
    imageAlt: 'Branded StallX interior with a slatted wood wall and lounge seating',
    icon: Layers3,
  },
  {
    title: 'Brand Content & Reels',
    description: 'Product demos & social media highlights',
    image: brandContent,
    imageAlt: 'Videographer filming a product demo at a brand stall',
    icon: Video,
  },
]

export const PhotographySection: React.FC = () => (
  <section id="photography" className="scroll-mt-24 bg-[#fef6ef] px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
    <div className="mx-auto max-w-[1380px]">
      <div className="text-center" data-reveal="fade-up">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#f85501] sm:text-base">Photography &amp; Videography</p>
        <h2 className="mt-3 text-[36px] font-black leading-[1.05] tracking-[-0.04em] text-[#071c31] sm:text-[52px] xl:text-[64px]">
          We create the experience.
          <span className="block text-[#f85501]">We capture it too.</span>
        </h2>
        <p className="mt-3 text-base font-medium text-[#405060] sm:text-lg">
          Professional shoots for every stall, event, space and brand experience.
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-5 xl:gap-x-6" data-reveal-stagger="fade-up">
        {shootTypes.map(({ title, description, image, imageAlt, icon: Icon }) => (
          <article key={title} className="flex flex-col rounded-[18px] border border-[#d3e0e4] bg-[#fef8f3] sm:flex-row">
            <div className="aspect-[295/182] shrink-0 overflow-hidden rounded-[18px] sm:w-[60.8%]">
              <img src={image} alt={imageAlt} width={590} height={364} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-5 sm:py-3 lg:pl-[18px] lg:pr-3 xl:px-7">
              <Icon className="h-8 w-8 text-[#f85501] xl:h-10 xl:w-10" strokeWidth={1.8} />
              <h3 className="mt-1.5 text-[22px] font-extrabold leading-[1.05] tracking-[-0.02em] text-[#071c31] lg:text-[21px] xl:mt-3 xl:text-[28px]">{title}</h3>
              <p className="mt-1.5 text-[15px] font-medium leading-snug text-[#405060] lg:text-sm xl:mt-3 xl:text-lg">{description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-7 flex justify-center" data-reveal="fade-up">
        <a href="/#contact" className="group inline-flex items-center gap-2 rounded-full bg-[#f85501] px-10 py-3.5 text-lg font-extrabold text-white shadow-[0_8px_20px_rgba(248,85,1,0.25)] transition hover:bg-[#dd4b00] sm:text-xl">
          Book Your Shoot
          <ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  </section>
)
