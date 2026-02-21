import { useState } from 'react'

interface BrandPrinciple {
  id: string
  label: string
  shortLabel: string
  tagline: string
  details: string[]
}

const PRINCIPLES: BrandPrinciple[] = [
  {
    id: 'clarity',
    label: 'Clarity over hype',
    shortLabel: 'Clarity',
    tagline: 'Money is involved.',
    details: [
      'Users are spending real money',
      'Every UI element must be unambiguous',
      'No crypto jargon or hype language',
      'Trust through transparency',
    ],
  },
  {
    id: 'professional',
    label: 'Professional, not corporate',
    shortLabel: 'Professional',
    tagline: "Professional doesn't have to be LinkedIn.",
    details: [
      'Credible enough for financial transactions',
      'Modern enough for network effects',
      'Warm and human, not sterile',
      'Approachable expertise',
    ],
  },
  {
    id: 'financial',
    label: 'Financial, not speculative',
    shortLabel: 'Financial',
    tagline: 'Light on the crypto casino.',
    details: [
      'Value exchange over speculation',
      'Earnings through genuine engagement',
      'No gambling mechanics',
      'Sustainable economic model',
    ],
  },
  {
    id: 'intriguing',
    label: 'Intriguing, not boring',
    shortLabel: 'Intriguing',
    tagline: 'Have an edge.',
    details: [
      'Opinionated design choices',
      'Personality over polish',
      'Not corporate or forgettable',
      'Curiosity as a brand value',
    ],
  },
]

const CX = 150
const CY = 150

/* Icon for each principle rendered at (cx, cy) */
function PrincipleIcon({ id, cx, cy, isActive }: { id: string; cx: number; cy: number; isActive: boolean }): React.JSX.Element {
  const color = isActive ? '#050505' : 'rgba(255,255,255,0.5)'
  const origin = { transformOrigin: `${cx}px ${cy}px` }

  switch (id) {
    case 'clarity':
      // Shield icon
      return (
        <g className="flow-icon-pulse" style={origin}>
          <path
            d={`M${cx},${cy - 11} L${cx + 9},${cy - 5} L${cx + 9},${cy + 3} Q${cx + 9},${cy + 10} ${cx},${cy + 13} Q${cx - 9},${cy + 10} ${cx - 9},${cy + 3} L${cx - 9},${cy - 5}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
          <path
            d={`M${cx - 3},${cy} L${cx},${cy + 3} L${cx + 4},${cy - 3}`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )
    case 'professional':
      // Person with tie/collar
      return (
        <g className="flow-icon-pulse" style={origin}>
          <circle cx={cx} cy={cy - 6} r={4.5} fill="none" stroke={color} strokeWidth={1.2} />
          <path
            d={`M${cx - 8},${cy + 12} Q${cx - 8},${cy + 3} ${cx},${cy + 3} Q${cx + 8},${cy + 3} ${cx + 8},${cy + 12}`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          <line x1={cx} y1={cy + 3} x2={cx} y2={cy + 10} stroke={color} strokeWidth={1} />
        </g>
      )
    case 'financial':
      // Dollar / coin icon
      return (
        <g className="flow-icon-pulse" style={origin}>
          <circle cx={cx} cy={cy} r={10} fill="none" stroke={color} strokeWidth={1.2} />
          <text
            x={cx}
            y={cy + 4.5}
            textAnchor="middle"
            fill={color}
            fontSize="13"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
          >
            $
          </text>
        </g>
      )
    case 'intriguing':
    default:
      // Diamond / spark icon
      return (
        <g className="flow-icon-pulse" style={origin}>
          <path
            d={`M${cx},${cy - 11} L${cx + 8},${cy} L${cx},${cy + 11} L${cx - 8},${cy}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
          <circle cx={cx} cy={cy} r={2.5} fill={color} />
        </g>
      )
  }
}

export function LunchbreakPrinciplesGraphic(): React.JSX.Element {
  const [active, setActive] = useState(0)
  const principle = PRINCIPLES[active]

  /* 3 outer nodes in a triangle + center node */
  const positions = [
    { x: CX, y: 55 },       // top center
    { x: 55, y: 215 },      // bottom left
    { x: 245, y: 215 },     // bottom right
    { x: CX, y: CY + 10 }, // center (intriguing)
  ]

  /* Edges: outer triangle + spokes to center */
  const edges = [
    [0, 1],
    [1, 2],
    [2, 0],
    [0, 3],
    [1, 3],
    [2, 3],
  ] as const

  return (
    <div className="w-full h-full flex flex-col process-dot-grid">
      {/* Main area */}
      <div className="flex-1 min-h-0 relative">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/10" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/10" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/10" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/10" />

        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background decorative rings */}
          <circle cx={CX} cy={CY} r={120}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5}
            strokeDasharray="6 4"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          <circle cx={CX} cy={CY} r={80}
            fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={0.5}
            strokeDasharray="4 6"
            className="overwhelmed-spin-reverse"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Connecting edges */}
          {edges.map(([a, b], i) => {
            const pa = positions[a]
            const pb = positions[b]
            const isActive = a === active || b === active
            return (
              <line
                key={i}
                x1={pa.x} y1={pa.y}
                x2={pb.x} y2={pb.y}
                stroke={isActive ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={isActive ? 1.2 : 0.8}
                strokeDasharray={isActive ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
            )
          })}

          {/* Nodes */}
          {PRINCIPLES.map((p, i) => {
            const isActive = i === active
            const pos = positions[i]
            return (
              <g
                key={p.id}
                onClick={() => setActive(i)}
                className="cursor-pointer"
              >
                {/* Node circle — center node (index 3) gets accent treatment */}
                {i === 3 && (
                  <circle
                    cx={pos.x} cy={pos.y} r={32}
                    fill="none"
                    stroke={isActive ? 'rgba(223,255,0,0.5)' : 'rgba(223,255,0,0.15)'}
                    strokeWidth={0.8}
                    strokeDasharray="4 3"
                    className="transition-all duration-300"
                  />
                )}
                <circle
                  cx={pos.x} cy={pos.y} r={26}
                  fill={isActive ? (i === 3 ? '#dfff00' : '#fff') : '#111'}
                  stroke={isActive ? (i === 3 ? '#dfff00' : '#fff') : '#555'}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${isActive ? 'process-node-active' : ''}`}
                />
                {/* Icon */}
                <PrincipleIcon id={p.id} cx={pos.x} cy={pos.y} isActive={isActive} />
                {/* Label — above for top, below for bottom two, left for center */}
                <text
                  x={i === 3 ? pos.x - 38 : pos.x}
                  y={i === 0 ? pos.y - 36 : i === 3 ? pos.y - 32 : pos.y + 42}
                  textAnchor={i === 3 ? 'end' : 'middle'}
                  fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
                  fontSize="10"
                  fontWeight={isActive ? '700' : '400'}
                  fontFamily="'JetBrains Mono', monospace"
                  className="transition-all duration-300 pointer-events-none"
                >
                  {p.shortLabel}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Detail panel */}
        <div
          key={principle.id}
          className="absolute z-10"
          style={{
            top: 12,
            right: 12,
            background: 'rgba(5,5,5,0.95)',
            border: '1px solid #222',
            borderRadius: 8,
            padding: '1rem 1.25rem',
            maxWidth: 240,
            minWidth: 160,
          }}
        >
          <div
            className="font-mono text-white font-bold mb-1 flex items-center gap-2"
            style={{ fontSize: '0.85rem' }}
          >
            <span style={{ color: '#dfff00' }}>*</span>
            {principle.label}
          </div>
          <div
            className="font-mono text-white/50 mb-3 process-item-enter"
            style={{ fontSize: '0.7rem', fontStyle: 'italic' }}
          >
            {principle.tagline}
          </div>
          {principle.details.map((item, i) => (
            <div
              key={item}
              className="font-mono text-white/60 process-item-enter"
              style={{
                fontSize: '0.75rem',
                lineHeight: 1.7,
                animationDelay: `${(i + 1) * 60}ms`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Step sequencer bar */}
      <div className="shrink-0 flex border-t border-white/10" style={{ height: 56 }}>
        {PRINCIPLES.map((p, i) => {
          const isActive = i === active
          return (
            <button
              key={p.id}
              onClick={() => setActive(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < PRINCIPLES.length - 1 ? 'border-r border-white/10' : ''
              } ${isActive ? 'bg-white text-[#050505]' : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
              style={{ border: 'none', outline: 'none' }}
            >
              <span
                className="font-bold transition-opacity"
                style={{ fontSize: '1rem', opacity: isActive ? 1 : 0.4 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="uppercase tracking-widest"
                style={{ fontSize: '0.45rem' }}
              >
                {p.shortLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
