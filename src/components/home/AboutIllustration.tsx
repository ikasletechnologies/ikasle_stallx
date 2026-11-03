import React from 'react'

const ORANGE = '#f15a24'
const BLUE = '#5fb3e6'
const GOLD = '#ffd166'

type Point = [number, number]

/** Isometric projection: a runs right-down, b runs left-down, h is height. */
const iso = (ox: number, oy: number) => (a: number, b: number, h = 0): Point => [ox + (a - b) * 0.866, oy + (a + b) * 0.5 - h]

const poly = (...points: Point[]) => `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`

const SIZE = 90
const WALL = 64

const Person: React.FC<{ at: Point; shirt: string }> = ({ at: [x, y], shirt }) => (
  <g>
    <ellipse cx={x} cy={y} rx="9" ry="3" fill="#000" opacity=".25" />
    <rect x={x - 6} y={y - 16} width="5" height="16" rx="2" fill="#0b2236" />
    <rect x={x + 1} y={y - 16} width="5" height="16" rx="2" fill="#0b2236" />
    <rect x={x - 8} y={y - 38} width="16" height="25" rx="7" fill={shirt} />
    <circle cx={x} cy={y - 45} r="6.5" fill="#ffcfb3" />
    <path d={`M${x - 6.5} ${y - 46}a6.5 6.5 0 0 1 13 0q-3.5-3.5-6.5-2q-3-1.5-6.5 2z`} fill="#0b2236" />
  </g>
)

const BlueprintBooth: React.FC = () => {
  const p = iso(122, 112)
  const floorLines = [18, 36, 54, 72]
  return (
    <g stroke={BLUE} strokeLinejoin="round" fill="none">
      <path d={poly(p(0, 0), p(SIZE, 0), p(SIZE, SIZE), p(0, SIZE))} fill={BLUE} fillOpacity=".06" strokeWidth="1.4" />
      {floorLines.map((n) => (
        <g key={n} strokeWidth=".7" strokeDasharray="2 3" opacity=".45">
          <path d={`M${p(n, 0).join(' ')}L${p(n, SIZE).join(' ')}`} />
          <path d={`M${p(0, n).join(' ')}L${p(SIZE, n).join(' ')}`} />
        </g>
      ))}
      <path d={poly(p(0, 0), p(SIZE, 0), p(SIZE, 0, WALL), p(0, 0, WALL))} fill={BLUE} fillOpacity=".08" strokeWidth="1.4" />
      <path d={poly(p(0, 0), p(0, SIZE), p(0, SIZE, WALL), p(0, 0, WALL))} fill={BLUE} fillOpacity=".04" strokeWidth="1.4" />
      {/* planned counter */}
      <path d={poly(p(35, 50, 22), p(70, 50, 22), p(70, 65, 22), p(35, 65, 22))} strokeWidth="1.2" strokeDasharray="4 3" />
      <path d={`M${p(35, 65, 22).join(' ')}L${p(35, 65).join(' ')}M${p(70, 65, 22).join(' ')}L${p(70, 65).join(' ')}M${p(70, 50, 22).join(' ')}L${p(70, 50).join(' ')}`} strokeWidth="1.2" strokeDasharray="4 3" />
      {/* dimension */}
      <path d={`M${p(0, SIZE + 12).join(' ')}L${p(SIZE, SIZE + 12).join(' ')}`} strokeWidth="1" opacity=".8" />
      <text x={p(SIZE / 2, SIZE + 22)[0]} y={p(SIZE / 2, SIZE + 22)[1]} fill={BLUE} stroke="none" fontSize="9" fontWeight="700" textAnchor="middle" transform={`rotate(30 ${p(SIZE / 2, SIZE + 22).join(' ')})`}>
        6 m
      </text>
    </g>
  )
}

const BuiltBooth: React.FC = () => {
  const p = iso(358, 112)
  return (
    <g strokeLinejoin="round">
      <ellipse cx={p(SIZE / 2, SIZE / 2)[0]} cy={p(SIZE / 2, SIZE / 2)[1] + 6} rx="105" ry="52" fill="url(#ab-glow)" />

      {/* floor */}
      <path d={poly(p(0, 0), p(SIZE, 0), p(SIZE, SIZE), p(0, SIZE))} fill="#183b58" />
      <path d={poly(p(SIZE, 0), p(SIZE, SIZE), p(SIZE, SIZE, -6), p(SIZE, 0, -6))} fill="#0e2a41" />
      <path d={poly(p(0, SIZE), p(SIZE, SIZE), p(SIZE, SIZE, -6), p(0, SIZE, -6))} fill="#0b2236" />

      {/* walls */}
      <path d={poly(p(0, 0), p(SIZE, 0), p(SIZE, 0, WALL), p(0, 0, WALL))} fill="#ffffff" />
      <path d={poly(p(0, 0), p(0, SIZE), p(0, SIZE, WALL), p(0, 0, WALL))} fill="#e4ebf2" />

      {/* fascia */}
      <path d={poly(p(0, 0, WALL - 12), p(SIZE, 0, WALL - 12), p(SIZE, 0, WALL), p(0, 0, WALL))} fill="#071c31" />
      <path d={poly(p(0, 0, WALL - 12), p(0, SIZE, WALL - 12), p(0, SIZE, WALL), p(0, 0, WALL))} fill="#0e2a41" />
      <path d={poly(p(0, 0, WALL - 14), p(SIZE, 0, WALL - 14), p(SIZE, 0, WALL - 12), p(0, 0, WALL - 12))} fill={ORANGE} />
      <path d={poly(p(0, 0, WALL - 14), p(0, SIZE, WALL - 14), p(0, SIZE, WALL - 12), p(0, 0, WALL - 12))} fill={ORANGE} />

      {/* brand graphic + screen on right wall */}
      <path d={poly(p(12, 0, 16), p(46, 0, 16), p(46, 0, 44), p(12, 0, 44))} fill={ORANGE} />
      <path d={poly(p(18, 0, 34), p(38, 0, 34), p(38, 0, 38), p(18, 0, 38))} fill="#fff" opacity=".85" />
      <path d={poly(p(18, 0, 26), p(32, 0, 26), p(32, 0, 29), p(18, 0, 29))} fill="#fff" opacity=".6" />
      <path d={poly(p(56, 0, 18), p(82, 0, 18), p(82, 0, 42), p(56, 0, 42))} fill="#071c31" />
      <path d={poly(p(59, 0, 21), p(79, 0, 21), p(79, 0, 39), p(59, 0, 39))} fill="#1d5d8c" />
      <path d={poly(p(65, 0, 26), p(72, 0, 30), p(65, 0, 34))} fill="#fff" />

      {/* shelves on left wall */}
      {[20, 36].map((h) => (
        <g key={h}>
          <path d={poly(p(0, 20, h), p(0, 70, h), p(0, 70, h + 2), p(0, 20, h + 2))} fill="#9fb0c3" />
          {[26, 38, 50, 62].map((b, i) => (
            <path key={b} d={poly(p(0, b, h + 2), p(0, b + 6, h + 2), p(0, b + 6, h + 9 + (i % 2) * 3), p(0, b, h + 9 + (i % 2) * 3))} fill={i % 2 ? ORANGE : '#071c31'} />
          ))}
        </g>
      ))}

      {/* spotlights */}
      {[22, 66].map((a) => (
        <circle key={`a${a}`} cx={p(a, 0, WALL - 16)[0]} cy={p(a, 0, WALL - 16)[1]} r="16" fill="url(#ab-spot)" />
      ))}
      <circle cx={p(0, 45, WALL - 16)[0]} cy={p(0, 45, WALL - 16)[1]} r="16" fill="url(#ab-spot)" />

      {/* counter */}
      <path d={poly(p(35, 65), p(70, 65), p(70, 65, 22), p(35, 65, 22))} fill={ORANGE} />
      <path d={poly(p(70, 50), p(70, 65), p(70, 65, 22), p(70, 50, 22))} fill="#c94315" />
      <path d={poly(p(33, 48, 22), p(72, 48, 22), p(72, 67, 22), p(33, 67, 22))} fill="#071c31" />
      <circle cx={p(52, 65, 11)[0]} cy={p(52, 65, 11)[1]} r="5" fill="#fff" />

      {/* plant */}
      <path d={poly(p(8, 80), p(16, 80), p(16, 80, 10), p(8, 80, 10))} fill="#071c31" />
      <ellipse cx={p(12, 80, 18)[0]} cy={p(12, 80, 18)[1]} rx="6" ry="11" fill="#3fae7a" />

      {/* visitors */}
      <Person at={p(82, 40)} shirt="#5fb3e6" />
      <Person at={p(60, 84)} shirt={ORANGE} />
      <Person at={p(84, 78)} shirt="#e4ebf2" />
    </g>
  )
}

export const AboutIllustration: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 30 480 235" className={className} role="img" aria-label="An empty exhibition floor plan transformed into a lit, branded StallX booth with visitors">
    <defs>
      <radialGradient id="ab-glow">
        <stop offset="0" stopColor={ORANGE} stopOpacity=".28" />
        <stop offset="1" stopColor={ORANGE} stopOpacity="0" />
      </radialGradient>
      <radialGradient id="ab-spot">
        <stop offset="0" stopColor={GOLD} stopOpacity=".9" />
        <stop offset=".25" stopColor={GOLD} stopOpacity=".45" />
        <stop offset="1" stopColor={GOLD} stopOpacity="0" />
      </radialGradient>
    </defs>

    <BlueprintBooth />

    {/* transformation arrow */}
    <path d="M206 150Q240 112 270 146" fill="none" stroke={ORANGE} strokeWidth="2.2" strokeDasharray="5 5" strokeLinecap="round" />
    <path d="M262 148l9 0-3-9" fill="none" stroke={ORANGE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M238 104l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill={GOLD} />
    <path d="M256 92l1.5 3.5 3.5 1.5-3.5 1.5-1.5 3.5-1.5-3.5-3.5-1.5 3.5-1.5z" fill="#fff" opacity=".7" />

    <BuiltBooth />

    {/* captions */}
    <text x="122" y="248" textAnchor="middle" fill={BLUE} fontSize="10" fontWeight="800" letterSpacing="3">THE SPACE</text>
    <text x="358" y="248" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="800" letterSpacing="3">THE EXPERIENCE</text>
    <rect x="344" y="256" width="28" height="2.5" rx="1.25" fill={ORANGE} />
  </svg>
)
