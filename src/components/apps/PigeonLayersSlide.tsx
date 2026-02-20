import { useState, useRef, useEffect } from 'react'

interface Layer {
  id: string
  label: string
  items: string[]
  color: string
}

const LAYERS: Layer[] = [
  {
    id: 'interface',
    label: 'Interface',
    items: ['Telegram constraints', 'Discord constraints', 'SMS constraints'],
    color: '#dfff00',
  },
  {
    id: 'conversation',
    label: 'Conversation',
    items: ['Turn-taking', 'Tone calibration', 'Compact "trader update" responses'],
    color: '#bef264',
  },
  {
    id: 'intent',
    label: 'Intent',
    items: ['Classification', 'Extraction', 'Normalization'],
    color: '#00ffd5',
  },
  {
    id: 'orchestration',
    label: 'Orchestration',
    items: ['Planning', 'Routing', 'Retries'],
    color: '#60a5fa',
  },
  {
    id: 'policy',
    label: 'Policy / Risk',
    items: ['Permissions', 'Guardrails', 'Limits'],
    color: '#818cf8',
  },
  {
    id: 'execution',
    label: 'Execution',
    items: ['Venue actions', 'Wallet actions'],
    color: '#c084fc',
  },
  {
    id: 'verification',
    label: 'Verification',
    items: ['Post-trade truth', 'Reconciliation'],
    color: '#e879f9',
  },
  {
    id: 'memory',
    label: 'Memory',
    items: ['Preferences', 'Persistent context'],
    color: '#fb7185',
  },
  {
    id: 'observability',
    label: 'Observability',
    items: ['Logs', 'Alerts', 'Failure recovery'],
    color: '#fbbf24',
  },
]

const DEPTH = 5
const BAR_H = 26
const BAR_GAP = 6
const CONTAINER_PAD = 20

export function PigeonLayersSlide(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = LAYERS[activeIndex]
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      setIsCompact(width < 480)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const barW = isCompact ? 220 : 320
  const stackH = LAYERS.length * (BAR_H + BAR_GAP) - BAR_GAP
  const containerW = barW + DEPTH + CONTAINER_PAD * 2
  const containerH = stackH + DEPTH + CONTAINER_PAD * 2
  const svgW = containerW + DEPTH + 20
  const svgH = containerH + DEPTH + 20
  const originX = 10
  const originY = 10

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

      {/* Layer readout */}
      <div
        className="absolute top-4 right-5 font-mono text-white/30 z-10"
        style={{ fontSize: '0.55rem' }}
      >
        LAYER {activeIndex + 1}/9
      </div>

      {/* Main area */}
      <div ref={containerRef} className="flex-1 min-h-0 relative flex items-center justify-center px-4">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* 3D dashed container — back faces */}
          {/* Back face (offset) */}
          <rect
            x={originX + DEPTH}
            y={originY}
            width={containerW}
            height={containerH}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={1}
            strokeDasharray="6 4"
          />
          {/* Top depth edge */}
          <line
            x1={originX} y1={originY + DEPTH}
            x2={originX + DEPTH} y2={originY}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="4 4"
          />
          {/* Right depth edge */}
          <line
            x1={originX + containerW} y1={originY + DEPTH + containerH}
            x2={originX + DEPTH + containerW} y2={originY + containerH}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="4 4"
          />
          {/* Top-right depth edge */}
          <line
            x1={originX + containerW} y1={originY + DEPTH}
            x2={originX + DEPTH + containerW} y2={originY}
            stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="4 4"
          />
          {/* Front face */}
          <rect
            x={originX}
            y={originY + DEPTH}
            width={containerW}
            height={containerH}
            fill="none"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={1}
            strokeDasharray="6 4"
          />

          {/* Container label */}
          <text
            x={originX + containerW / 2}
            y={originY + DEPTH + containerH - 6}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            PIGEON ARCHITECTURE
          </text>

          {/* Layer bars */}
          {LAYERS.map((layer, i) => {
            const isActive = i === activeIndex
            const bx = originX + CONTAINER_PAD
            const by = originY + DEPTH + CONTAINER_PAD + i * (BAR_H + BAR_GAP)
            const fillOpacity = isActive ? 0.15 : 0.04
            const strokeColor = isActive ? layer.color : 'rgba(255,255,255,0.12)'
            const strokeW = isActive ? 1.5 : 0.8

            return (
              <g
                key={layer.id}
                onClick={() => setActiveIndex(i)}
                className="cursor-pointer"
                style={{ transition: 'all 0.2s ease' }}
              >
                {/* 3D depth — top face */}
                <path
                  d={`M${bx},${by} L${bx + DEPTH},${by - DEPTH} L${bx + DEPTH + barW},${by - DEPTH} L${bx + barW},${by} Z`}
                  fill={isActive ? layer.color : 'rgba(255,255,255,0.02)'}
                  fillOpacity={isActive ? 0.1 : 1}
                  stroke={strokeColor}
                  strokeWidth={strokeW * 0.6}
                />
                {/* 3D depth — right face */}
                <path
                  d={`M${bx + barW},${by} L${bx + DEPTH + barW},${by - DEPTH} L${bx + DEPTH + barW},${by - DEPTH + BAR_H} L${bx + barW},${by + BAR_H} Z`}
                  fill={isActive ? layer.color : 'rgba(255,255,255,0.02)'}
                  fillOpacity={isActive ? 0.08 : 1}
                  stroke={strokeColor}
                  strokeWidth={strokeW * 0.6}
                />
                {/* Front face */}
                <rect
                  x={bx}
                  y={by}
                  width={barW}
                  height={BAR_H}
                  fill={isActive ? layer.color : 'white'}
                  fillOpacity={fillOpacity}
                  stroke={strokeColor}
                  strokeWidth={strokeW}
                  className={isActive ? 'layers-active-bar' : ''}
                />
                {/* Layer number */}
                <text
                  x={bx + 10}
                  y={by + BAR_H / 2 + 4}
                  fill={isActive ? layer.color : 'rgba(255,255,255,0.25)'}
                  fontSize="9"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isActive ? '700' : '400'}
                  className="pointer-events-none"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
                {/* Layer label */}
                <text
                  x={bx + 30}
                  y={by + BAR_H / 2 + 4}
                  fill={isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.5)'}
                  fontSize="11"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight={isActive ? '700' : '400'}
                  letterSpacing="0.04em"
                  className="pointer-events-none"
                >
                  {layer.label}
                </text>
                {/* Active indicator dot */}
                {isActive && (
                  <circle
                    cx={bx + barW - 12}
                    cy={by + BAR_H / 2}
                    r={3}
                    fill={layer.color}
                    className="layers-active-bar"
                  />
                )}
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
            maxWidth: isCompact ? 180 : 240,
            minWidth: isCompact ? 140 : 170,
          }}
        >
          <div
            className="font-mono text-white font-bold mb-2 flex items-center gap-2"
            style={{ fontSize: isCompact ? '0.75rem' : '0.9rem' }}
          >
            <span
              className="inline-block rounded-full"
              style={{
                width: 8,
                height: 8,
                background: active.color,
                boxShadow: `0 0 6px ${active.color}`,
              }}
            />
            {active.label}
          </div>
          {active.items.map((item, i) => (
            <div
              key={item}
              className="font-mono text-white/60 process-item-enter"
              style={{
                fontSize: isCompact ? '0.7rem' : '0.8rem',
                lineHeight: 1.7,
                animationDelay: `${i * 60}ms`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom sequencer bar */}
      <div
        className="shrink-0 flex border-t border-white/10"
        style={{ height: isCompact ? 40 : 52 }}
      >
        {LAYERS.map((layer, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={layer.id}
              onClick={() => setActiveIndex(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < LAYERS.length - 1 ? 'border-r border-white/10' : ''
              } ${isActive ? 'text-[#050505]' : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
              style={{
                border: 'none',
                outline: 'none',
                background: isActive ? layer.color : undefined,
              }}
            >
              <span
                className="font-bold transition-opacity"
                style={{
                  fontSize: isCompact ? '0.7rem' : '0.9rem',
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {!isCompact && (
                <span
                  className="uppercase tracking-widest"
                  style={{ fontSize: '0.4rem' }}
                >
                  {layer.label.length > 8 ? layer.label.slice(0, 7) + '.' : layer.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
