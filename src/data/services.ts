import { CalendarCheck2, PanelsTopLeft, Pencil, UsersRound, type LucideIcon } from 'lucide-react'

export interface ServiceTopic {
  title: string
  items: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  menuDescription: string
  icon: LucideIcon
  topics: ServiceTopic[]
}

export const services: Service[] = [
  {
    id: 'exhibition-stalls',
    title: 'Exhibition Stalls',
    description: 'Impactful, functional expo stalls that showcase your brand.',
    menuDescription: 'Custom booths, modular stalls and fabrication',
    icon: PanelsTopLeft,
    topics: [
      { title: 'Custom Exhibition Booths', items: ['Brand-Themed Booth Designs', 'Island & Corner Booths', 'Interactive Demo Zones', 'Meeting & Reception Areas'] },
      { title: 'Modular Stall Designs', items: ['Reusable Stall Structures', 'Flexible Panel Layouts', 'Portable Display Systems', 'Quick Assembly Setups'] },
      { title: 'Product Display Areas', items: ['Product Showcase Counters', 'Display Shelves & Pedestals', 'Demo & Sampling Stations', 'Illuminated Product Displays'] },
      { title: 'Stall Fabrication', items: ['Structural Framework', 'Carpentry & Panel Finishing', 'Branding & Graphics Installation', 'Lighting, Electrical & On-Site Assembly'] },
    ],
  },
  {
    id: 'event-setups',
    title: 'Event Setups',
    description: 'End-to-end event setups for brand showcases, launches and corporate events.',
    menuDescription: 'Corporate events, launches and promotional spaces',
    icon: CalendarCheck2,
    topics: [
      { title: 'Corporate Events', items: ['Conference & Seminar Setups', 'Annual Meet Arrangements', 'Award Ceremony Setups', 'Networking & Reception Areas'] },
      { title: 'Product Launches', items: ['Product Reveal Stages', 'Demo & Experience Zones', 'Branded Launch Displays', 'Media & Press Areas'] },
      { title: 'Stage & Backdrop Designs', items: ['Custom Stage Layouts', 'Branded Event Backdrops', 'LED Screen Integration', 'Stage Lighting & Décor'] },
      { title: 'Promotional Spaces', items: ['Mall Activation Booths', 'Pop-Up Brand Kiosks', 'Sampling & Demo Counters', 'Roadshow Setups'] },
    ],
  },
  {
    id: 'custom-designs',
    title: 'Custom Designs',
    description: 'Tailor-made stall designs that fit your brand, space and event goals.',
    menuDescription: '3D visualisation, layouts and display units',
    icon: Pencil,
    topics: [
      { title: '3D Stall Visualisation', items: ['Photorealistic Stall Renders', 'Multiple-Angle Views', 'Virtual Walkthroughs', 'Material & Colour Previews'] },
      { title: 'Space Planning & Layouts', items: ['Visitor Flow Planning', 'Product Zone Allocation', 'Meeting & Reception Layouts', 'Storage & Utility Planning'] },
      { title: 'Custom Display Units', items: ['Branded Display Counters', 'Product Shelves & Pedestals', 'Interactive Display Kiosks', 'Illuminated Showcase Units'] },
      { title: 'Brand-Themed Interiors', items: ['Brand Colour Integration', 'Custom Wall Graphics', 'Themed Furniture & Finishes', 'Lighting & Décor Concepts'] },
    ],
  },
  {
    id: 'brand-experiences',
    title: 'Brand Experiences',
    description: 'Immersive environments that drive interaction, engagement and recall.',
    menuDescription: 'Interactive zones, demos and visitor engagement',
    icon: UsersRound,
    topics: [
      { title: 'Interactive Brand Zones', items: ['Touchscreen Brand Displays', 'Interactive Games & Quizzes', 'Digital Brand Storytelling', 'Hands-On Experience Stations'] },
      { title: 'Product Demo Spaces', items: ['Live Demonstration Counters', 'Product Trial Stations', 'Guided Product Experiences', 'Demo Seating & Viewing Areas'] },
      { title: 'Visitor Engagement Areas', items: ['Welcome & Registration Counters', 'Contest & Giveaway Stations', 'Feedback & Survey Kiosks', 'Networking & Conversation Spaces'] },
      { title: 'Branded Photo Zones', items: ['Custom Photo Backdrops', 'Selfie Booths & Props', 'Themed Photo Installations', 'Social Media Photo Corners'] },
    ],
  },
]
