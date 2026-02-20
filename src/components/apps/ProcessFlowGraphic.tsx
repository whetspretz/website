import { useState, useRef, useEffect } from 'react'

interface FlowPhase {
  id: string
  label: string
  items: string[]
  tools: string[]
}

const PHASES: FlowPhase[] = [
  {
    id: 'understand',
    label: 'Understand',
    items: ['Research context', 'User needs & pain points', 'Technical constraints', 'Business goals'],
    tools: [],
  },
  {
    id: 'design',
    label: 'Design',
    items: ['Visual exploration', 'UI variations & iteration', 'Design system alignment', 'Component architecture'],
    tools: ['Figma MCP', 'Variant', 'Super Design', 'Cursor'],
  },
  {
    id: 'prototype',
    label: 'Prototype',
    items: ['Rapid interactive builds', 'Test interactions early', 'Validate assumptions', 'Ship-quality fidelity'],
    tools: ['Claude Code', 'Cursor'],
  },
  {
    id: 'build',
    label: 'Build',
    items: ['Production code', 'Automated quality checks', 'Design-to-code fidelity', 'Test-driven development'],
    tools: ['Superpowers', 'Beagle', 'Figma MCP', 'Cursor'],
  },
  {
    id: 'ship',
    label: 'Ship',
    items: ['Final review pass', 'Automated fixes', 'Documentation', 'Deploy with confidence'],
    tools: ['Beagle', 'Daydream'],
  },
]

function PhaseIcon({ phaseId, cx, cy, isActive }: { phaseId: string; cx: number; cy: number; isActive: boolean }): React.JSX.Element {
  const color = isActive ? '#050505' : 'rgba(255,255,255,0.5)'
  const origin = { transformOrigin: `${cx}px ${cy}px` }

  switch (phaseId) {
    case 'understand':
      // Radar / concentric circles
      return (
        <g className="flow-icon-pulse" style={origin}>
          <circle cx={cx} cy={cy} r={4} fill="none" stroke={color} strokeWidth={1.2} />
          <circle cx={cx} cy={cy} r={8} fill="none" stroke={color} strokeWidth={0.8} opacity={0.6} />
          <circle cx={cx} cy={cy} r={12} fill="none" stroke={color} strokeWidth={0.5} opacity={0.3} />
        </g>
      )
    case 'design':
      // Diamond / pen nib
      return (
        <g className="flow-icon-spin" style={origin}>
          <path
            d={`M${cx},${cy - 12} L${cx + 8},${cy} L${cx},${cy + 12} L${cx - 8},${cy}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
          <circle cx={cx} cy={cy} r={2.5} fill={color} />
        </g>
      )
    case 'prototype':
      // Lightning bolt
      return (
        <g className="flow-icon-pulse" style={origin}>
          <path
            d={`M${cx + 2},${cy - 12} L${cx - 4},${cy + 1} L${cx + 1},${cy + 1} L${cx - 2},${cy + 12} L${cx + 4},${cy - 1} L${cx - 1},${cy - 1}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1}
          />
        </g>
      )
    case 'build':
      // Code brackets < >
      return (
        <g className="flow-icon-blink" style={origin}>
          <path
            d={`M${cx - 4},${cy - 10} L${cx - 10},${cy} L${cx - 4},${cy + 10}`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
          />
          <path
            d={`M${cx + 4},${cy - 10} L${cx + 10},${cy} L${cx + 4},${cy + 10}`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </g>
      )
    case 'ship': {
      // Arrow pointing up-right
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

export function ProcessFlowGraphic(): React.JSX.Element {
  const [activePhase, setActivePhase] = useState(0)
  const active = PHASES[activePhase]
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

  // Node positions
  const positions = PHASES.map((_phase, i) => {
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

      {/* Phase readout */}
      <div
        className="absolute top-4 right-5 font-mono text-white/30 z-10"
        style={{ fontSize: '0.55rem' }}
      >
        PHASE {activePhase + 1}/5
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
            fill="rgba(255,255,255,0.25)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            DESIGN ENGINEERING WORKFLOW
          </text>

          {/* Connecting arrows */}
          <defs>
            <marker
              id="flow-arrow"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker
              id="flow-arrow-active"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.7)" />
            </marker>
            {/* Curved loop arrow markers */}
            <marker
              id="flow-loop-arrow"
              markerWidth="5"
              markerHeight="4"
              refX="4"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 5 2, 0 4" fill="rgba(223,255,0,0.45)" />
            </marker>
          </defs>

          {/* Curved back-and-forth arrows between Design and Prototype */}
          {(() => {
            const designPos = positions[1]
            const protoPos = positions[2]
            if (!designPos || !protoPos) return null
            const isActive = activePhase === 1 || activePhase === 2
            const opacity = isActive ? 0.5 : 0.25

            if (isVertical) {
              // Vertical: curves go left and right
              const midY = (designPos.y + protoPos.y) / 2
              return (
                <>
                  {/* Forward curve (right side) */}
                  <path
                    d={`M${designPos.x + 28},${designPos.y + 4} Q${designPos.x + 55},${midY} ${protoPos.x + 28},${protoPos.y - 4}`}
                    fill="none"
                    stroke={`rgba(223,255,0,${opacity})`}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    markerEnd="url(#flow-loop-arrow)"
                    className="flow-loop-line transition-all duration-300"
                  />
                  {/* Backward curve (left side) */}
                  <path
                    d={`M${protoPos.x - 28},${protoPos.y - 4} Q${protoPos.x - 55},${midY} ${designPos.x - 28},${designPos.y + 4}`}
                    fill="none"
                    stroke={`rgba(223,255,0,${opacity})`}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    markerEnd="url(#flow-loop-arrow)"
                    className="flow-loop-line transition-all duration-300"
                  />
                </>
              )
            }

            // Horizontal: curves go above and below
            const midX = (designPos.x + protoPos.x) / 2
            return (
              <>
                {/* Forward curve (above) — Design → Prototype */}
                <path
                  d={`M${designPos.x + 4},${designPos.y - 28} Q${midX},${designPos.y - 62} ${protoPos.x - 4},${protoPos.y - 28}`}
                  fill="none"
                  stroke={`rgba(223,255,0,${opacity})`}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  markerEnd="url(#flow-loop-arrow)"
                  className="flow-loop-line transition-all duration-300"
                />
                {/* Backward curve (below) — Prototype → Design */}
                <path
                  d={`M${protoPos.x - 4},${protoPos.y + 28} Q${midX},${protoPos.y + 62} ${designPos.x + 4},${designPos.y + 28}`}
                  fill="none"
                  stroke={`rgba(223,255,0,${opacity})`}
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  markerEnd="url(#flow-loop-arrow)"
                  className="flow-loop-line transition-all duration-300"
                />
              </>
            )
          })()}

          {/* Curved back-and-forth arrows between Understand and Prototype (wide, arcs over Design) */}
          {(() => {
            const understandPos = positions[0]
            const protoPos = positions[2]
            if (!understandPos || !protoPos) return null
            const isActive = activePhase === 0 || activePhase === 2
            const opacity = isActive ? 0.4 : 0.15

            if (isVertical) {
              const midY = (understandPos.y + protoPos.y) / 2
              return (
                <>
                  {/* Forward curve (far right) */}
                  <path
                    d={`M${understandPos.x + 28},${understandPos.y + 8} Q${understandPos.x + 80},${midY} ${protoPos.x + 28},${protoPos.y - 8}`}
                    fill="none"
                    stroke={`rgba(223,255,0,${opacity})`}
                    strokeWidth={0.8}
                    strokeDasharray="3 5"
                    markerEnd="url(#flow-loop-arrow)"
                    className="flow-loop-line transition-all duration-300"
                  />
                  {/* Backward curve (far left) */}
                  <path
                    d={`M${protoPos.x - 28},${protoPos.y - 8} Q${protoPos.x - 80},${midY} ${understandPos.x - 28},${understandPos.y + 8}`}
                    fill="none"
                    stroke={`rgba(223,255,0,${opacity})`}
                    strokeWidth={0.8}
                    strokeDasharray="3 5"
                    markerEnd="url(#flow-loop-arrow)"
                    className="flow-loop-line transition-all duration-300"
                  />
                </>
              )
            }

            // Horizontal: wider arcs that clear the Design node
            const midX = (understandPos.x + protoPos.x) / 2
            return (
              <>
                {/* Forward curve (above, wide) — Understand → Prototype */}
                <path
                  d={`M${understandPos.x + 8},${understandPos.y - 28} Q${midX},${understandPos.y - 90} ${protoPos.x - 8},${protoPos.y - 28}`}
                  fill="none"
                  stroke={`rgba(223,255,0,${opacity})`}
                  strokeWidth={0.8}
                  strokeDasharray="3 5"
                  markerEnd="url(#flow-loop-arrow)"
                  className="flow-loop-line transition-all duration-300"
                />
                {/* Backward curve (below, wide) — Prototype → Understand */}
                <path
                  d={`M${protoPos.x - 8},${protoPos.y + 28} Q${midX},${protoPos.y + 90} ${understandPos.x + 8},${understandPos.y + 28}`}
                  fill="none"
                  stroke={`rgba(223,255,0,${opacity})`}
                  strokeWidth={0.8}
                  strokeDasharray="3 5"
                  markerEnd="url(#flow-loop-arrow)"
                  className="flow-loop-line transition-all duration-300"
                />
              </>
            )
          })()}

          {PHASES.map((_phase, i) => {
            if (i >= PHASES.length - 1) return null
            const cur = positions[i]
            const next = positions[i + 1]
            const isActive = i === activePhase || i + 1 === activePhase

            // Offset start/end to avoid overlapping circle
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
                markerEnd={isActive ? 'url(#flow-arrow-active)' : 'url(#flow-arrow)'}
                className="transition-all duration-300"
              />
            )
          })}

          {/* Tool dots below nodes */}
          {PHASES.map((phase, i) => {
            if (phase.tools.length === 0) return null
            const pos = positions[i]
            const isActive = i === activePhase
            const dotSpacing = 8
            const startX = pos.x - ((phase.tools.length - 1) * dotSpacing) / 2
            const dotY = isVertical ? pos.y + 38 : pos.y + 42

            return (
              <g key={`dots-${phase.id}`}>
                {phase.tools.map((_, ti) => (
                  <circle
                    key={ti}
                    cx={startX + ti * dotSpacing}
                    cy={dotY}
                    r={2.5}
                    fill={isActive ? '#dfff00' : 'rgba(255,255,255,0.2)'}
                    className="transition-all duration-300"
                  />
                ))}
                {isActive && (
                  <text
                    x={pos.x}
                    y={dotY + 14}
                    textAnchor="middle"
                    fill="rgba(223,255,0,0.5)"
                    fontSize="7"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {phase.tools.length} tool{phase.tools.length > 1 ? 's' : ''}
                  </text>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {PHASES.map((phase, i) => {
            const isActive = i === activePhase
            const pos = positions[i]
            const labelY = isVertical ? pos.y - 36 : pos.y - 36

            return (
              <g
                key={phase.id}
                onClick={() => setActivePhase(i)}
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
                <PhaseIcon phaseId={phase.id} cx={pos.x} cy={pos.y} isActive={isActive} />
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
                  {phase.label}
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
          {active.tools.length > 0 && (
            <>
              <div
                className="font-mono mt-3 mb-1"
                style={{ fontSize: '0.65rem', color: 'rgba(223,255,0,0.6)', letterSpacing: '0.1em' }}
              >
                ACTIVE TOOLS
              </div>
              {active.tools.map((tool, i) => (
                <div
                  key={tool}
                  className="font-mono process-item-enter flex items-center gap-1.5"
                  style={{
                    fontSize: '0.75rem',
                    lineHeight: 1.7,
                    color: 'rgba(223,255,0,0.8)',
                    animationDelay: `${(active.items.length + i) * 60}ms`,
                  }}
                >
                  <span style={{ fontSize: '0.5rem' }}>&#9670;</span>
                  {tool}
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Step sequencer bar */}
      <div
        className="shrink-0 flex border-t border-white/10"
        style={{ height: isVertical ? 48 : 64 }}
      >
        {PHASES.map((phase, i) => {
          const isActive = i === activePhase
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < PHASES.length - 1 ? 'border-r border-white/10' : ''
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
                  {phase.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
