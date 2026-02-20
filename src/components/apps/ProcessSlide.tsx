import { useState, useRef, useEffect } from 'react'

interface ProcessStep {
  id: string
  label: string
  layer: 'strategic' | 'design'
  x: number
  y: number
  items: string[]
}

const STEPS: ProcessStep[] = [
  {
    id: 'context',
    label: 'Context',
    layer: 'strategic',
    x: 140,
    y: 70,
    items: ['Business metrics', 'Product data', 'Known user behaviors', 'Tech capabilities'],
  },
  {
    id: 'observe',
    label: 'Observe',
    layer: 'design',
    x: 300,
    y: 220,
    items: ['Build empathy with user', 'Understand motivations', 'Frame problems', 'Observe users'],
  },
  {
    id: 'imagine',
    label: 'Imagine',
    layer: 'design',
    x: 460,
    y: 220,
    items: ['Generate ideas / concepts', 'Frame hypothesis', 'Vision'],
  },
  {
    id: 'strategize',
    label: 'Strategize',
    layer: 'strategic',
    x: 620,
    y: 70,
    items: ['Concept validation', 'Define metrics / goals', 'Scope and priority', 'Feasibility'],
  },
  {
    id: 'create',
    label: 'Create',
    layer: 'design',
    x: 780,
    y: 220,
    items: [
      'Experience mapping / IA',
      'Visual design',
      'Design system',
      'Interaction design',
      'Usability',
      'Validate',
      'Build (front end / prototype)',
    ],
  },
]

function NodeIcon({ stepId, cx, cy, isActive }: { stepId: string; cx: number; cy: number; isActive: boolean }): React.JSX.Element {
  const color = isActive ? '#050505' : 'rgba(255,255,255,0.5)'
  const origin = { transformOrigin: `${cx}px ${cy}px` }

  switch (stepId) {
    case 'context':
      return (
        <g className="process-icon-pulse" style={origin}>
          <circle cx={cx} cy={cy} r={5} fill="none" stroke={color} strokeWidth={1.2} />
          <circle cx={cx} cy={cy} r={9} fill="none" stroke={color} strokeWidth={0.8} opacity={0.6} />
          <circle cx={cx} cy={cy} r={13} fill="none" stroke={color} strokeWidth={0.5} opacity={0.3} />
        </g>
      )
    case 'observe': {
      const ey = 7
      return (
        <g className="process-icon-blink" style={origin}>
          <path
            d={`M${cx - 12},${cy} Q${cx},${cy - ey} ${cx + 12},${cy} Q${cx},${cy + ey} ${cx - 12},${cy}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <circle cx={cx} cy={cy} r={3.5} fill={color} />
        </g>
      )
    }
    case 'imagine':
      return (
        <g className="process-icon-spin" style={origin}>
          <path
            d={`M${cx},${cy - 13} L${cx + 3},${cy - 3} L${cx + 13},${cy} L${cx + 3},${cy + 3} L${cx},${cy + 13} L${cx - 3},${cy + 3} L${cx - 13},${cy} L${cx - 3},${cy - 3}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
        </g>
      )
    case 'strategize':
      return (
        <g className="process-icon-spin-reverse" style={origin}>
          <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke={color} strokeWidth={1} />
          <line x1={cx - 12} y1={cy} x2={cx + 12} y2={cy} stroke={color} strokeWidth={1} />
          <circle cx={cx} cy={cy} r={7} fill="none" stroke={color} strokeWidth={0.8} />
        </g>
      )
    case 'create': {
      const hexPoints = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2
        return `${cx + 11 * Math.cos(angle)},${cy + 11 * Math.sin(angle)}`
      }).join(' ')
      return (
        <g className="process-icon-spin" style={origin}>
          <polygon points={hexPoints} fill="none" stroke={color} strokeWidth={1} />
          <circle cx={cx} cy={cy} r={3} fill={color} />
        </g>
      )
    }
    default:
      return <></>
  }
}

function StarburstPath({ cx, cy, r }: { cx: number; cy: number; r: number }): React.JSX.Element {
  const points = 10
  const innerR = r * 0.55
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * i) / points - Math.PI / 2
    const radius = i % 2 === 0 ? r : innerR
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    d += i === 0 ? `M${x},${y}` : `L${x},${y}`
  }
  d += 'Z'
  return <path d={d} />
}

export function ProcessSlide(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0)
  const active = STEPS[activeStep]
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVertical, setIsVertical] = useState(false)
  const [confetti, setConfetti] = useState<{ key: number; x: number; y: number } | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      setIsVertical(width < 500)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Compute positions based on layout mode
  const positions = STEPS.map((step, i) => {
    if (isVertical) {
      return {
        x: step.layer === 'strategic' ? 80 : 220,
        y: 70 + i * 130,
      }
    }
    return { x: step.x, y: step.y }
  })

  const valuePos = isVertical
    ? { x: 150, y: 70 + STEPS.length * 130 }
    : { x: 920, y: 145 }

  const viewBox = isVertical ? '0 0 300 750' : '0 0 1000 290'

  return (
    <div className="flex flex-col h-full relative process-dot-grid">
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.04) 50%)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/15" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/15" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/15" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/15" />

      {/* Step readout */}
      <div
        className="absolute top-4 right-5 font-mono text-white/30 z-10"
        style={{ fontSize: '0.55rem' }}
      >
        STEP {activeStep + 1}/5
      </div>

      {/* Main SVG area */}
      <div ref={containerRef} className="flex-1 min-h-0 relative flex items-center justify-center px-4">
        <svg
          viewBox={viewBox}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Divider lines */}
          {isVertical ? (
            <>
              <line x1="150" y1="30" x2="150" y2="720" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <line key={n} x1="20" y1={30 + n * 130} x2="280" y2={30 + n * 130} stroke="rgba(255,255,255,0.12)" strokeDasharray="3 8" />
              ))}
            </>
          ) : (
            <>
              <line x1="40" y1="145" x2="890" y2="145" stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6" />
              <line x1="40" y1="35" x2="890" y2="35" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 8" />
              <line x1="40" y1="105" x2="890" y2="105" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 8" />
              <line x1="40" y1="185" x2="890" y2="185" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 8" />
              <line x1="40" y1="255" x2="890" y2="255" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 8" />
            </>
          )}

          {/* Layer labels */}
          {isVertical ? (
            <>
              <text
                x="20"
                y="28"
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
              >
                <tspan x="20" dy="0">Strategic</tspan>
                <tspan x="20" dy="12">Thinking</tspan>
              </text>
              <text
                x="280"
                y="28"
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                textAnchor="end"
              >
                <tspan x="280" dy="0">Design</tspan>
                <tspan x="280" dy="12">Thinking</tspan>
              </text>
            </>
          ) : (
            <>
              <text
                x="45"
                y="44"
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
              >
                <tspan x="45" dy="0">Strategic</tspan>
                <tspan x="45" dy="12">Thinking</tspan>
              </text>
              <text
                x="45"
                y="258"
                fill="rgba(255,255,255,0.4)"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
              >
                <tspan x="45" dy="0">Design</tspan>
                <tspan x="45" dy="12">Thinking</tspan>
              </text>
            </>
          )}

          {/* Connecting arrows */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.7)" />
            </marker>
          </defs>

          {STEPS.map((_step, i) => {
            if (i >= STEPS.length - 1) return null
            const cur = positions[i]
            const next = positions[i + 1]
            const isActive = i === activeStep || i + 1 === activeStep
            return (
              <line
                key={`arrow-${i}`}
                x1={cur.x}
                y1={cur.y}
                x2={next.x}
                y2={next.y}
                stroke={isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive ? 'none' : '4 4'}
                markerEnd={isActive ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                className="transition-all duration-300"
              />
            )
          })}

          {/* Arrow from Create to Value */}
          <line
            x1={positions[4].x}
            y1={positions[4].y}
            x2={valuePos.x}
            y2={valuePos.y}
            stroke={activeStep === 4 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.08)'}
            strokeWidth={activeStep === 4 ? 1.5 : 1}
            strokeDasharray={activeStep === 4 ? 'none' : '4 4'}
            markerEnd={activeStep === 4 ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
            className="transition-all duration-300"
          />

          {/* Value starburst */}
          <g
            className="process-value-starburst cursor-pointer"
            onClick={(e: React.MouseEvent) => {
              const rect = containerRef.current?.getBoundingClientRect()
              if (!rect) return
              setConfetti({ key: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top })
            }}
          >
            <g style={{ transformOrigin: `${valuePos.x}px ${valuePos.y}px` }} className="process-value-spin">
              <StarburstPath cx={valuePos.x} cy={valuePos.y} r={36} />
            </g>
            <text
              x={valuePos.x}
              y={valuePos.y + 4}
              textAnchor="middle"
              fill="#050505"
              fontSize="12"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              className="pointer-events-none"
            >
              Value
            </text>
          </g>

          {/* Nodes */}
          {STEPS.map((step, i) => {
            const isActive = i === activeStep
            const pos = positions[i]
            const labelY = isVertical
              ? pos.y + 40
              : step.layer === 'strategic' ? pos.y - 34 : pos.y + 40
            return (
              <g
                key={step.id}
                onClick={() => setActiveStep(i)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={26}
                  fill={isActive ? '#fff' : '#111'}
                  stroke={isActive ? '#fff' : '#555'}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${isActive ? 'process-node-active' : ''}`}
                />
                <NodeIcon stepId={step.id} cx={pos.x} cy={pos.y} isActive={isActive} />
                {/* Full label below node */}
                <text
                  x={pos.x}
                  y={labelY}
                  textAnchor="middle"
                  fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}
                  fontSize="12"
                  fontWeight={isActive ? '700' : '400'}
                  fontFamily="'JetBrains Mono', monospace"
                  className="transition-all duration-300 pointer-events-none"
                >
                  {step.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Confetti */}
        {confetti && (
          <div key={confetti.key} className="absolute inset-0 pointer-events-none overflow-hidden z-10">
            {Array.from({ length: 35 }, (_, i) => {
              const hash = (n: number): number => (((n * 2654435761) >>> 0) / 4294967296)
              const seed = confetti.key
              const angle = hash(i * 17 + seed) * Math.PI * 2
              const dist = 60 + hash(i * 13 + seed) * 120
              const dx = Math.cos(angle) * dist
              const dy = Math.sin(angle) * dist - 30
              const colors = ['#dfff00', '#00ffd5', '#60a5fa', '#c084fc', '#fb7185', '#fbbf24']
              const size = 3 + hash(i * 11 + seed) * 5
              const delay = hash(i * 23 + seed) * 100
              const rot = (hash(i * 7 + seed) - 0.5) * 720
              return (
                <div
                  key={i}
                  className="process-confetti"
                  style={{
                    position: 'absolute',
                    left: confetti.x,
                    top: confetti.y,
                    width: size,
                    height: size * 0.6,
                    borderRadius: 1,
                    background: colors[i % colors.length],
                    '--confetti-dx': `${dx}px`,
                    '--confetti-dy': `${dy}px`,
                    '--confetti-rot': `${rot}deg`,
                    animationDelay: `${delay}ms`,
                  } as React.CSSProperties}
                />
              )
            })}
          </div>
        )}

        {/* Detail panel */}
        <div
          key={active.id}
          className="absolute z-10"
          style={{
            top: 12,
            right: 12,
            background: 'rgba(5,5,5,0.95)',
            border: '1px solid #222',
            borderRadius: 8,
            padding: '1rem 1.25rem',
            maxWidth: 260,
            minWidth: 180,
          }}
        >
          <div
            className="font-mono text-white font-bold mb-2 flex items-center gap-2"
            style={{ fontSize: '0.9rem' }}
          >
            <span style={{ color: '#60a5fa' }}>*</span>
            {active.label}
          </div>
          {active.items.map((item, i) => (
            <div
              key={item}
              className="font-mono text-white/60 process-item-enter"
              style={{
                fontSize: '0.8rem',
                lineHeight: 1.7,
                animationDelay: `${i * 60}ms`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Step sequencer bar */}
      <div
        className="shrink-0 flex border-t border-white/10"
        style={{ height: isVertical ? 48 : 64 }}
      >
        {STEPS.map((step, i) => {
          const isActive = i === activeStep
          return (
            <button
              key={step.id}
              onClick={() => setActiveStep(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < STEPS.length - 1 ? 'border-r border-white/10' : ''
              } ${isActive ? 'bg-white text-[#050505]' : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
              style={{ border: 'none', outline: 'none' }}
            >
              <span
                className="font-bold transition-opacity"
                style={{
                  fontSize: isVertical ? '0.9rem' : '1.1rem',
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {!isVertical && (
                <span
                  className="uppercase tracking-widest"
                  style={{ fontSize: '0.5rem' }}
                >
                  {step.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
