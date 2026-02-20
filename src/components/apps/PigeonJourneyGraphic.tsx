import { useState, useRef, useEffect } from 'react'

interface JourneyStep {
  id: string
  label: string
  items: string[]
}

const STEPS: JourneyStep[] = [
  {
    id: 'website',
    label: 'pigeon.trade',
    items: [
      'User discovers Pigeon online',
      'Landing page communicates value',
      'Clear call-to-action to get started',
      'Trust signals: team, backers, social proof',
    ],
  },
  {
    id: 'telegram',
    label: 'Telegram',
    items: [
      'User connects via Telegram',
      'Familiar chat interface — no new app to learn',
      'Bot greets and introduces capabilities',
      'Immediate sense of simplicity',
    ],
  },
  {
    id: 'onboard',
    label: 'Wallet + Onboarding',
    items: [
      'Instant wallet creation, no seed phrase hassle',
      'Guided onboarding in chat',
      'User sets preferences and risk tolerance',
      'Zero friction to get started',
    ],
  },
  {
    id: 'fund',
    label: 'Fund / Research',
    items: [
      'Deposit funds via simple instructions',
      'Research tokens, markets, and events',
      'AI-powered insights and summaries',
      'Portfolio visibility from day one',
    ],
  },
  {
    id: 'trade',
    label: 'Trade',
    items: [
      'Execute trades in natural language',
      'Multi-step actions handled automatically',
      'Cross-chain and multi-venue support',
      'Receipts and confirmations for every action',
    ],
  },
]

function StepIcon({ stepId, cx, cy, isActive }: { stepId: string; cx: number; cy: number; isActive: boolean }): React.JSX.Element {
  const color = isActive ? '#050505' : 'rgba(255,255,255,0.5)'
  const origin = { transformOrigin: `${cx}px ${cy}px` }

  switch (stepId) {
    case 'website':
      // Globe icon
      return (
        <g className="flow-icon-pulse" style={origin}>
          <circle cx={cx} cy={cy} r={10} fill="none" stroke={color} strokeWidth={1} />
          <ellipse cx={cx} cy={cy} rx={5} ry={10} fill="none" stroke={color} strokeWidth={0.8} />
          <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke={color} strokeWidth={0.8} />
          <line x1={cx - 8} y1={cy - 5} x2={cx + 8} y2={cy - 5} stroke={color} strokeWidth={0.6} />
          <line x1={cx - 8} y1={cy + 5} x2={cx + 8} y2={cy + 5} stroke={color} strokeWidth={0.6} />
        </g>
      )
    case 'telegram':
      // Paper plane icon
      return (
        <g className="flow-icon-spin" style={origin}>
          <path
            d={`M${cx - 10},${cy} L${cx + 10},${cy - 8} L${cx + 2},${cy + 2} Z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <path
            d={`M${cx + 2},${cy + 2} L${cx + 10},${cy - 8}`}
            stroke={color}
            strokeWidth={0.8}
          />
          <path
            d={`M${cx + 2},${cy + 2} L${cx - 2},${cy + 8} L${cx + 2},${cy + 5}`}
            fill="none"
            stroke={color}
            strokeWidth={0.8}
            strokeLinejoin="round"
          />
        </g>
      )
    case 'onboard':
      // Key icon
      return (
        <g className="flow-icon-pulse" style={origin}>
          <circle cx={cx} cy={cy - 4} r={5} fill="none" stroke={color} strokeWidth={1} />
          <line x1={cx} y1={cy + 1} x2={cx} y2={cy + 10} stroke={color} strokeWidth={1} />
          <line x1={cx} y1={cy + 7} x2={cx + 4} y2={cy + 7} stroke={color} strokeWidth={1} />
          <line x1={cx} y1={cy + 10} x2={cx + 3} y2={cy + 10} stroke={color} strokeWidth={1} />
        </g>
      )
    case 'fund':
      // Dollar sign icon
      return (
        <g className="flow-icon-blink" style={origin}>
          <path
            d={`M${cx + 5},${cy - 6} Q${cx + 5},${cy - 10} ${cx},${cy - 10} Q${cx - 6},${cy - 10} ${cx - 6},${cy - 6} Q${cx - 6},${cy - 2} ${cx},${cy} Q${cx + 6},${cy + 2} ${cx + 6},${cy + 6} Q${cx + 6},${cy + 10} ${cx},${cy + 10} Q${cx - 5},${cy + 10} ${cx - 5},${cy + 6}`}
            fill="none"
            stroke={color}
            strokeWidth={1}
            strokeLinecap="round"
          />
          <line x1={cx} y1={cy - 12} x2={cx} y2={cy + 12} stroke={color} strokeWidth={0.8} />
        </g>
      )
    case 'trade': {
      // Arrow up-right (same as ProcessFlowGraphic ship icon)
      return (
        <g className="flow-icon-spin" style={origin}>
          <path
            d={`M${cx - 8},${cy + 8} L${cx + 8},${cy - 8}`}
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          <path
            d={`M${cx + 1},${cy - 8} L${cx + 8},${cy - 8} L${cx + 8},${cy - 1}`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx={cx - 8} cy={cy + 8} r={2} fill={color} />
        </g>
      )
    }
    default:
      return <></>
  }
}

export function PigeonJourneyGraphic(): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0)
  const active = STEPS[activeStep]
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVertical, setIsVertical] = useState(false)

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

  const positions = STEPS.map((_step, i) => {
    if (isVertical) {
      return { x: 150, y: 60 + i * 130 }
    }
    return { x: 100 + i * 200, y: 140 }
  })

  const viewBox = isVertical ? '0 0 300 720' : '0 0 1000 280'

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
          {/* Grid lines */}
          {isVertical ? (
            <>
              {[0, 1, 2, 3, 4, 5].map((n) => (
                <line key={n} x1="20" y1={20 + n * 130} x2="280" y2={20 + n * 130} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 8" />
              ))}
            </>
          ) : (
            <>
              <line x1="40" y1="60" x2="960" y2="60" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 8" />
              <line x1="40" y1="140" x2="960" y2="140" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 8" />
              <line x1="40" y1="220" x2="960" y2="220" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 8" />
            </>
          )}

          {/* Label */}
          <text
            x={isVertical ? 150 : 500}
            y={isVertical ? 16 : 26}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="14"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            PIGEON USER JOURNEY
          </text>

          {/* Arrow markers */}
          <defs>
            <marker
              id="journey-arrow"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker
              id="journey-arrow-active"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.7)" />
            </marker>
          </defs>

          {/* Connecting arrows */}
          {STEPS.map((_step, i) => {
            if (i >= STEPS.length - 1) return null
            const cur = positions[i]
            const next = positions[i + 1]
            const isActive = i === activeStep || i + 1 === activeStep

            const dx = next.x - cur.x
            const dy = next.y - cur.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const nx = dx / dist
            const ny = dy / dist
            const r = 28

            return (
              <line
                key={`arrow-${i}`}
                x1={cur.x + nx * r}
                y1={cur.y + ny * r}
                x2={next.x - nx * r}
                y2={next.y - ny * r}
                stroke={isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray={isActive ? 'none' : '4 4'}
                markerEnd={isActive ? 'url(#journey-arrow-active)' : 'url(#journey-arrow)'}
                className="transition-all duration-300"
              />
            )
          })}

          {/* Yellow dotted highlight circles around steps 3 & 4 */}
          {[2, 3].map((idx) => {
            const pos = positions[idx]
            return (
              <circle
                key={`highlight-${idx}`}
                cx={pos.x}
                cy={pos.y}
                r={36}
                fill="none"
                stroke="#dfff00"
                strokeWidth={1.2}
                strokeDasharray="4 4"
                strokeOpacity={0.6}
              />
            )
          })}

          {/* Nodes */}
          {STEPS.map((step, i) => {
            const isActive = i === activeStep
            const pos = positions[i]
            const hasHighlight = i === 2 || i === 3
            const labelY = pos.y - (hasHighlight ? 46 : 36)

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
                <StepIcon stepId={step.id} cx={pos.x} cy={pos.y} isActive={isActive} />
                {/* Label */}
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
                  {step.label.length > 12 ? step.label.slice(0, 11) + '.' : step.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
