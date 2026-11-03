import React from 'react'

const NAVY = '#071c31'
const NAVY_SOFT = '#1d3b57'
const ORANGE = '#f15a24'
const PEACH = '#ffd0bb'
const SLATE = '#9fb0c3'
const MIST = '#dbe3ec'
const GOLD = '#ffd166'

type ArtProps = { className?: string }

const ExhibitionStallArt: React.FC<ArtProps> = ({ className }) => (
  <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Exhibition stall illustration">
    <defs>
      <linearGradient id="es-light" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={GOLD} stopOpacity=".55" />
        <stop offset="1" stopColor={GOLD} stopOpacity="0" />
      </linearGradient>
    </defs>
    <circle cx="204" cy="34" r="40" fill={ORANGE} opacity=".07" />
    <ellipse cx="120" cy="210" rx="104" ry="9" fill={NAVY} opacity=".1" />

    {/* platform */}
    <path d="M24 192h192l8 10H16z" fill="#c9d4e0" />
    <rect x="16" y="202" width="208" height="6" rx="2" fill={SLATE} />

    {/* back wall + pillars + fascia */}
    <rect x="38" y="74" width="164" height="118" fill="#fff" stroke={MIST} />
    <rect x="30" y="56" width="10" height="136" rx="2" fill={NAVY} />
    <rect x="200" y="56" width="10" height="136" rx="2" fill={NAVY} />
    <rect x="26" y="48" width="188" height="26" rx="4" fill={NAVY} />
    <rect x="26" y="70" width="188" height="4" fill={ORANGE} />
    <text x="120" y="65" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800" letterSpacing="2.5">YOUR BRAND</text>

    {/* brand graphic panel */}
    <rect x="50" y="88" width="74" height="52" rx="4" fill={ORANGE} />
    <circle cx="70" cy="108" r="9" fill="#fff" opacity=".9" />
    <rect x="84" y="102" width="32" height="4" rx="2" fill="#fff" />
    <rect x="84" y="110" width="22" height="4" rx="2" fill="#fff" opacity=".7" />
    <rect x="58" y="124" width="58" height="6" rx="3" fill="#fff" opacity=".35" />

    {/* product shelves */}
    <rect x="142" y="82" width="8" height="12" rx="1" fill={ORANGE} />
    <rect x="154" y="85" width="8" height="9" rx="1" fill={NAVY} />
    <rect x="166" y="80" width="10" height="14" rx="1" fill="#ffb08a" />
    <rect x="180" y="86" width="6" height="8" rx="1" fill={NAVY} />
    <rect x="138" y="94" width="52" height="3" fill={SLATE} />
    <rect x="143" y="106" width="10" height="12" rx="1" fill={NAVY} />
    <rect x="158" y="109" width="8" height="9" rx="1" fill={ORANGE} />
    <rect x="170" y="104" width="12" height="14" rx="1" fill={MIST} stroke={SLATE} strokeWidth=".8" />
    <rect x="138" y="118" width="52" height="3" fill={SLATE} />

    {/* spotlight cones */}
    {[70, 120, 170].map((x) => (
      <g key={x}>
        <path d={`M${x - 4} 80h8l24 76h-56z`} fill="url(#es-light)" />
        <rect x={x - 5} y="74" width="10" height="7" rx="2" fill={NAVY_SOFT} />
      </g>
    ))}

    {/* reception counter */}
    <rect x="80" y="142" width="84" height="8" rx="2" fill={NAVY} />
    <rect x="84" y="150" width="76" height="42" fill={ORANGE} />
    <circle cx="122" cy="171" r="10" fill="#fff" />
    <circle cx="122" cy="171" r="4" fill={ORANGE} />

    {/* plant */}
    <ellipse cx="50" cy="164" rx="5" ry="13" fill="#3fae7a" transform="rotate(-20 50 164)" />
    <ellipse cx="60" cy="164" rx="5" ry="13" fill="#2f9566" transform="rotate(20 60 164)" />
    <ellipse cx="55" cy="160" rx="5" ry="14" fill="#48bf86" />
    <path d="M45 174h20l-2 18H47z" fill={NAVY} />
  </svg>
)

const EventSetupArt: React.FC<ArtProps> = ({ className }) => (
  <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Event stage setup illustration">
    <defs>
      <linearGradient id="ev-beam" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={GOLD} stopOpacity=".6" />
        <stop offset="1" stopColor={GOLD} stopOpacity="0" />
      </linearGradient>
      <linearGradient id="ev-screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={ORANGE} />
        <stop offset="1" stopColor="#ff8f52" />
      </linearGradient>
      <pattern id="ev-truss" width="8" height="8" patternUnits="userSpaceOnUse">
        <path d="M0 8L8 0" stroke="#fff" strokeWidth="1.2" opacity=".55" />
      </pattern>
    </defs>

    {/* beams */}
    <path d="M58 56h8l30 104H28z" fill="url(#ev-beam)" />
    <path d="M174 56h8l30 104h-68z" fill="url(#ev-beam)" />

    {/* truss */}
    <rect x="22" y="36" width="196" height="12" fill={NAVY} />
    <rect x="22" y="36" width="196" height="12" fill="url(#ev-truss)" />
    <rect x="22" y="36" width="12" height="116" fill={NAVY} />
    <rect x="22" y="36" width="12" height="116" fill="url(#ev-truss)" />
    <rect x="206" y="36" width="12" height="116" fill={NAVY} />
    <rect x="206" y="36" width="12" height="116" fill="url(#ev-truss)" />
    <rect x="56" y="48" width="12" height="9" rx="2" fill={ORANGE} />
    <rect x="172" y="48" width="12" height="9" rx="2" fill={ORANGE} />

    {/* LED screen */}
    <rect x="92" y="130" width="4" height="20" fill={NAVY} />
    <rect x="144" y="130" width="4" height="20" fill={NAVY} />
    <rect x="62" y="62" width="116" height="70" rx="5" fill={NAVY} />
    <rect x="68" y="68" width="104" height="58" rx="3" fill="url(#ev-screen)" />
    <text x="120" y="96" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="900" letterSpacing="2">LAUNCH</text>
    <rect x="94" y="104" width="52" height="5" rx="2.5" fill="#fff" opacity=".6" />
    <rect x="104" y="113" width="32" height="4" rx="2" fill="#fff" opacity=".4" />

    {/* stage */}
    <rect x="18" y="150" width="204" height="10" rx="2" fill={NAVY} />
    <rect x="22" y="160" width="196" height="16" fill={NAVY_SOFT} />
    <rect x="22" y="160" width="196" height="3" fill={ORANGE} />

    {/* podium + mic */}
    <path d="M110 128h20l-3 22h-14z" fill={ORANGE} />
    <rect x="106" y="124" width="28" height="6" rx="2" fill={NAVY} />
    <path d="M120 124l4-10" stroke={NAVY} strokeWidth="2" strokeLinecap="round" />
    <circle cx="124.5" cy="112.5" r="3" fill={NAVY} />

    {/* audience */}
    {[34, 63, 92, 121, 150, 179, 208].map((cx, i) => (
      <g key={cx}>
        <circle cx={cx} cy={i % 2 ? 200 : 204} r="9" fill={i % 2 ? SLATE : NAVY} />
        <path d={`M${cx - 15} 240v-14a15 13 0 0 1 30 0v14z`} fill={i % 2 ? SLATE : NAVY} opacity=".9" />
      </g>
    ))}

    {/* confetti */}
    <rect x="44" y="76" width="5" height="9" rx="1" fill={ORANGE} transform="rotate(25 46 80)" />
    <rect x="190" y="82" width="5" height="9" rx="1" fill={GOLD} transform="rotate(-30 192 86)" />
    <rect x="48" y="118" width="4" height="7" rx="1" fill={GOLD} transform="rotate(-15 50 121)" />
    <rect x="188" y="120" width="4" height="7" rx="1" fill={ORANGE} transform="rotate(40 190 123)" />
  </svg>
)

const CustomDesignArt: React.FC<ArtProps> = ({ className }) => (
  <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Custom stall design blueprint illustration">
    {/* paper */}
    <rect x="38" y="38" width="140" height="150" rx="6" fill={NAVY} opacity=".08" />
    <rect x="32" y="32" width="140" height="150" rx="6" fill="#fff" stroke={MIST} />

    {/* isometric booth model */}
    <path d="M62 86l42 24v48l-42-24z" fill="#ffe7dc" stroke={ORANGE} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M104 110l42-24v48l-42 24z" fill={PEACH} stroke={ORANGE} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M104 62l42 24-42 24-42-24z" fill="#fff6f1" stroke={ORANGE} strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M104 62v48" stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" opacity=".6" />
    {/* counter on the right face */}
    <path d="M114 134l22-12.5v14L114 148z" fill={ORANGE} />
    {/* graphic on the left face */}
    <path d="M70 100l26 15v16l-26-15z" fill="#fff" stroke={ORANGE} strokeWidth="1" />
    <circle cx="80" cy="112" r="3.5" fill={ORANGE} />

    {/* dimension lines */}
    <path d="M58 142l42 24M106 166l42-24M52 86v48" stroke={NAVY} strokeWidth="1" />
    <path d="M58 138v8M100 162v8M106 162v8M148 138v8M48 86h8M48 134h8" stroke={NAVY} strokeWidth="1" />
    <text x="73" y="166" fontSize="9" fontWeight="700" fill={NAVY} transform="rotate(30 73 166)">3 m</text>
    <text x="124" y="170" fontSize="9" fontWeight="700" fill={NAVY} transform="rotate(-30 124 170)">4 m</text>
    <text x="46" y="118" fontSize="9" fontWeight="700" fill={NAVY} transform="rotate(-90 46 118)">2.5 m</text>

    {/* pencil */}
    <g transform="translate(212 88) rotate(135)">
      <rect x="0" y="-5" width="56" height="10" fill={ORANGE} />
      <rect x="0" y="-5" width="10" height="10" fill={NAVY} />
      <path d="M56-5l12 5-12 5z" fill="#ffe2cf" />
      <path d="M64.5-1.5L68 0l-3.5 1.5z" fill={NAVY} />
    </g>

    {/* colour swatches */}
    <circle cx="200" cy="146" r="9" fill={NAVY} />
    <circle cx="200" cy="170" r="9" fill={ORANGE} />
    <circle cx="200" cy="194" r="9" fill={PEACH} stroke={ORANGE} strokeWidth="1" />

    {/* ruler */}
    <rect x="32" y="196" width="140" height="14" rx="2" fill={NAVY} />
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={i} x={40 + i * 8} y="196" width="1.2" height={i % 4 === 0 ? 7 : 4} fill="#fff" />
    ))}
  </svg>
)

const BrandExperienceArt: React.FC<ArtProps> = ({ className }) => (
  <svg viewBox="0 0 240 240" className={className} role="img" aria-label="Interactive brand experience illustration">
    <defs>
      <linearGradient id="be-screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor={ORANGE} />
        <stop offset="1" stopColor="#ff9a62" />
      </linearGradient>
    </defs>
    <ellipse cx="128" cy="208" rx="92" ry="9" fill={NAVY} opacity=".1" />

    {/* kiosk */}
    <ellipse cx="100" cy="204" rx="26" ry="6" fill={NAVY} />
    <rect x="94" y="150" width="12" height="54" fill={NAVY_SOFT} />
    <rect x="64" y="48" width="72" height="106" rx="8" fill={NAVY} />
    <rect x="70" y="56" width="60" height="86" rx="4" fill="url(#be-screen)" />
    <circle cx="100" cy="84" r="14" fill="#fff" opacity=".95" />
    <path d="M96 77l10 7-10 7z" fill={ORANGE} />
    <rect x="80" y="106" width="40" height="5" rx="2.5" fill="#fff" opacity=".85" />
    <rect x="86" y="116" width="28" height="4" rx="2" fill="#fff" opacity=".55" />
    <rect x="84" y="126" width="32" height="9" rx="4.5" fill={NAVY} />

    {/* touch ripple */}
    <circle cx="126" cy="116" r="6" fill="none" stroke="#fff" strokeWidth="1.5" opacity=".9" />
    <circle cx="126" cy="116" r="11" fill="none" stroke="#fff" strokeWidth="1.2" opacity=".5" />

    {/* visitor */}
    <rect x="162" y="172" width="11" height="34" rx="4" fill={NAVY} />
    <rect x="179" y="172" width="11" height="34" rx="4" fill={NAVY} />
    <rect x="158" y="110" width="36" height="70" rx="16" fill={NAVY_SOFT} />
    <path d="M164 126L132 117" stroke={NAVY_SOFT} strokeWidth="9" strokeLinecap="round" />
    <circle cx="129" cy="116.5" r="5" fill="#ffcfb3" />
    <circle cx="176" cy="94" r="12" fill="#ffcfb3" />
    <path d="M164 93a12 12 0 0 1 24 0q-6-7-12-4q-6-3-12 4z" fill={NAVY} />

    {/* engagement bubbles */}
    <rect x="20" y="42" width="40" height="28" rx="8" fill="#fff" stroke={MIST} />
    <path d="M30 70l-4 8 10-8z" fill="#fff" stroke={MIST} />
    <path d="M40 64l-7-7a4.2 4.2 0 0 1 7-5 4.2 4.2 0 0 1 7 5z" fill={ORANGE} />

    <circle cx="196" cy="46" r="15" fill={NAVY} />
    <path d="M196 38l2 5.25 5.61.28-4.38 3.52 1.47 5.42L196 49.4l-4.7 3.07 1.47-5.42-4.38-3.52 5.61-.28z" fill={GOLD} />

    <circle cx="38" cy="132" r="14" fill={ORANGE} />
    <text x="38" y="136.5" textAnchor="middle" fontSize="12" fontWeight="900" fill="#fff">+1</text>

    <circle cx="214" cy="96" r="3" fill={ORANGE} opacity=".6" />
    <circle cx="150" cy="40" r="2.5" fill={NAVY} opacity=".3" />
    <circle cx="44" cy="96" r="2.5" fill={NAVY} opacity=".3" />
  </svg>
)

const illustrations: Record<string, { Art: React.FC<ArtProps>; background: string }> = {
  'exhibition-stalls': { Art: ExhibitionStallArt, background: 'bg-gradient-to-b from-[#fff4ec] to-[#f4f7fb]' },
  'event-setups': { Art: EventSetupArt, background: 'bg-gradient-to-b from-[#eef3f9] to-[#fff4ec]' },
  'custom-designs': {
    Art: CustomDesignArt,
    background: 'bg-[#f3f7fb] bg-[linear-gradient(to_right,#dbe5ef_1px,transparent_1px),linear-gradient(to_bottom,#dbe5ef_1px,transparent_1px)] bg-[size:16px_16px]',
  },
  'brand-experiences': { Art: BrandExperienceArt, background: 'bg-gradient-to-b from-[#fff4ec] to-[#eef3f9]' },
}

export const ServiceIllustration: React.FC<{ serviceId: string; className?: string }> = ({ serviceId, className = '' }) => {
  const illustration = illustrations[serviceId] ?? illustrations['exhibition-stalls']
  const { Art } = illustration
  return (
    <div className={`flex items-center justify-center ${illustration.background} ${className}`}>
      <Art className="h-full max-h-[260px] w-full max-w-[260px] p-3 transition duration-500 group-hover/service:scale-105" />
    </div>
  )
}
