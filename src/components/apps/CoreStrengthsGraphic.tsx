import { useState } from 'react'

interface CoreStrength {
  id: string
  label: string
  shortLabel: string
  tagline: string
  details: string[]
}

const STRENGTHS: CoreStrength[] = [
  {
    id: 'taste',
    label: 'Specifying good taste to AI',
    shortLabel: 'Taste',
    tagline: '15 years of UX & Visual design.',
    details: [
      'Trained eye for typography, spacing, color',
      'Can art-direct generative output',
      'Bridges design intuition with code',
      'Quality bar from shipping real products',
    ],
  },
  {
    id: 'empathy',
    label: 'Knowing what to build',
    shortLabel: 'Empathy',
    tagline: '15 years of UX Research & testing.',
    details: [
      'Deep user research background',
      'Translates user needs into features',
      'Data-informed design decisions',
      'Validates before committing to build',
    ],
  },
  {
    id: 'adapt',
    label: 'Adapting to team processes',
    shortLabel: 'Adapt',
    tagline: 'Flexible by nature.',
    details: [
      'Works within any team structure',
      'Agile, waterfall, or chaos — all good',
      'Picks up new tools and stacks fast',
      'Ships in whatever way the team needs',
    ],
  },
]

const CX = 150
const CY = 150

function StrengthIcon({ id, cx, cy, isActive }: { id: string; cx: number; cy: number; isActive: boolean }): React.JSX.Element {
  const color = isActive ? '#050505' : 'rgba(255,255,255,0.5)'
  const origin = { transformOrigin: `${cx}px ${cy}px` }

  switch (id) {
    case 'taste':
      // Eye icon
      return (
        <g className="flow-icon-pulse" style={origin}>
          <path
            d={`M${cx - 12},${cy} Q${cx},${cy - 7} ${cx + 12},${cy} Q${cx},${cy + 7} ${cx - 12},${cy}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
          />
          <circle cx={cx} cy={cy} r={3.5} fill={color} />
        </g>
      )
    case 'empathy':
      // Person silhouette
      return (
        <g className="flow-icon-pulse" style={origin}>
          <circle cx={cx} cy={cy - 6} r={4.5} fill="none" stroke={color} strokeWidth={1.2} />
          <path
            d={`M${cx - 9},${cy + 12} Q${cx - 9},${cy + 3} ${cx},${cy + 3} Q${cx + 9},${cy + 3} ${cx + 9},${cy + 12}`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </g>
      )
    case 'adapt':
    default:
      // Puzzle piece — two interlocking shapes
      return (
        <g className="flow-icon-pulse" style={origin}>
          {/* Left puzzle half */}
          <path
            d={`M${cx - 2},${cy - 9} L${cx - 9},${cy - 9} L${cx - 9},${cy + 9} L${cx - 2},${cy + 9} L${cx - 2},${cy + 4} Q${cx + 2},${cy + 2} ${cx - 2},${cy} L${cx - 2},${cy - 4} Q${cx + 2},${cy - 6} ${cx - 2},${cy - 9}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
          {/* Right puzzle half */}
          <path
            d={`M${cx + 1},${cy - 9} L${cx + 9},${cy - 9} L${cx + 9},${cy + 9} L${cx + 1},${cy + 9} L${cx + 1},${cy + 4} Q${cx - 3},${cy + 2} ${cx + 1},${cy} L${cx + 1},${cy - 4} Q${cx - 3},${cy - 6} ${cx + 1},${cy - 9}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1.1}
            strokeLinejoin="round"
          />
        </g>
      )
  }
}

export function CoreStrengthsGraphic(): React.JSX.Element {
  const [active, setActive] = useState(0)
  const strength = STRENGTHS[active]

  const orbitR = 75
  const positions = [
    { x: CX, y: CY - orbitR },                                              // top (taste)
    { x: CX + orbitR * Math.cos(Math.PI / 6), y: CY + orbitR * Math.sin(Math.PI / 6) },  // bottom right (empathy)
    { x: CX - orbitR * Math.cos(Math.PI / 6), y: CY + orbitR * Math.sin(Math.PI / 6) },  // bottom left (adapt)
  ]

  const edges = [
    [0, 1],
    [1, 2],
    [2, 0],
  ] as const

  return (
    <div className="w-full h-full flex flex-col process-dot-grid">
      {/* Main area */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/25" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/25" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/25" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/25" />

        <svg
          viewBox="0 0 300 300"
          style={{ maxWidth: 400, maxHeight: 400, width: '100%', height: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Orbit ring */}
          <circle cx={CX} cy={CY} r={orbitR}
            fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={0.8}
            strokeDasharray="4 6"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Outer decorative ring */}
          <circle cx={CX} cy={CY} r={orbitR + 30}
            fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5}
            strokeDasharray="6 4"
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

          {/* Spokes from center to nodes */}
          {positions.map((pos, i) => (
            <line
              key={`spoke-${i}`}
              x1={CX} y1={CY}
              x2={pos.x} y2={pos.y}
              stroke={i === active ? 'rgba(223,255,0,0.3)' : 'rgba(255,255,255,0.08)'}
              strokeWidth={0.8}
              strokeDasharray="3 5"
              className="transition-all duration-300"
            />
          ))}

          {/* Center diamond */}
          <g style={{ transformOrigin: `${CX}px ${CY}px` }} className="core-center-spin">
            <rect
              x={CX - 10} y={CY - 10}
              width={20} height={20} rx={2}
              fill="rgba(223,255,0,0.08)"
              stroke="rgba(223,255,0,0.45)"
              strokeWidth={1}
              transform={`rotate(45 ${CX} ${CY})`}
            />
          </g>
          <circle cx={CX} cy={CY} r={3} fill="rgba(223,255,0,0.6)" />

          {/* Nodes */}
          {STRENGTHS.map((s, i) => {
            const isActive = i === active
            const pos = positions[i]
            return (
              <g
                key={s.id}
                onClick={() => setActive(i)}
                className="cursor-pointer"
              >
                {/* Node circle */}
                <circle
                  cx={pos.x} cy={pos.y} r={26}
                  fill={isActive ? '#fff' : '#111'}
                  stroke={isActive ? '#fff' : '#555'}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${isActive ? 'process-node-active' : ''}`}
                />
                {/* Icon */}
                <StrengthIcon id={s.id} cx={pos.x} cy={pos.y} isActive={isActive} />
                {/* Label */}
                <text
                  x={pos.x}
                  y={i === 0 ? pos.y - 36 : pos.y + 42}
                  textAnchor="middle"
                  fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
                  fontSize="10"
                  fontWeight={isActive ? '700' : '400'}
                  fontFamily="'JetBrains Mono', monospace"
                  className="transition-all duration-300 pointer-events-none"
                >
                  {s.shortLabel}
                </text>
              </g>
            )
          })}

          {/* Accent orbit particles */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180
            const px = CX + Math.cos(rad) * (orbitR + 2)
            const py = CY + Math.sin(rad) * (orbitR + 2)
            return (
              <circle
                key={`dot-${i}`}
                cx={px} cy={py} r={1.5}
                fill="#dfff00"
                opacity={0.5}
                className="core-orbit-dot"
                style={{ animationDelay: `${i * 0.5}s`, transformOrigin: `${px}px ${py}px` }}
              />
            )
          })}
        </svg>

        {/* Detail panel */}
        <div
          key={strength.id}
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
            {strength.label}
          </div>
          <div
            className="font-mono text-white/50 mb-3 process-item-enter"
            style={{ fontSize: '0.7rem', fontStyle: 'italic' }}
          >
            {strength.tagline}
          </div>
          {strength.details.map((item, i) => (
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
        {STRENGTHS.map((s, i) => {
          const isActive = i === active
          return (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < STRENGTHS.length - 1 ? 'border-r border-white/10' : ''
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
                {s.shortLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
