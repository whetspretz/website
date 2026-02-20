import { useState } from 'react'

interface BrandLayer {
  id: string
  label: string
  subtitle: string
  tagline: string
  items: string[]
  radius: number
}

const LAYERS: BrandLayer[] = [
  {
    id: 'intrigue',
    label: 'Intrigue',
    subtitle: 'Entry',
    tagline: 'Creates pull: What is this?',
    items: ['Abstract mark', 'Atmospheric gradients', 'Restrained copy', 'Insider energy'],
    radius: 140,
  },
  {
    id: 'orientation',
    label: 'Orientation',
    subtitle: 'Early product',
    tagline: 'Builds confidence: Okay, this is real.',
    items: ['Clear typography', 'Verified badges', 'Role labels (Founder, etc.)', 'Structured feed'],
    radius: 92,
  },
  {
    id: 'proof',
    label: 'Proof',
    subtitle: 'Core experience',
    tagline: 'Earns trust: I belong here.',
    items: ['zk-backed verification', 'Consistent identity signals', 'High-signal conversations', 'Credible participant graph'],
    radius: 46,
  },
]

const CX = 200
const CY = 200

export function BrandLayersGraphic(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = LAYERS[activeIndex]

  return (
    <div className="flex flex-col h-full relative process-dot-grid">
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.04) 50%)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/25" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/25" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/25" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/25" />

      {/* Layer readout */}
      <div
        className="absolute top-4 right-5 font-mono text-white/40 z-10"
        style={{ fontSize: '0.6rem' }}
      >
        LAYER {activeIndex + 1}/3
      </div>

      {/* Main content area */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center px-4">
        <svg
          viewBox="0 0 600 400"
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Subtle grid lines */}
          <line x1={CX} y1={40} x2={CX} y2={360} stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} strokeDasharray="4 6" />
          <line x1={40} y1={CY} x2={360} y2={CY} stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} strokeDasharray="4 6" />

          {/* Concentric rings — outermost first so innermost is on top for click priority */}
          {LAYERS.map((layer, i) => {
            const isActive = i === activeIndex
            const r = layer.radius

            // Ring colors — outer is most mysterious, inner is most solid
            const ringColors = [
              { stroke: 'rgba(255,255,255,0.5)', fill: 'rgba(255,255,255,0.04)', activeStroke: '#dfff00', activeFill: 'rgba(223,255,0,0.08)' },
              { stroke: 'rgba(255,255,255,0.45)', fill: 'rgba(255,255,255,0.05)', activeStroke: '#dfff00', activeFill: 'rgba(223,255,0,0.1)' },
              { stroke: 'rgba(255,255,255,0.4)', fill: 'rgba(255,255,255,0.06)', activeStroke: '#dfff00', activeFill: 'rgba(223,255,0,0.15)' },
            ]
            const colors = ringColors[i]

            return (
              <g
                key={layer.id}
                onClick={() => setActiveIndex(i)}
                className="cursor-pointer"
              >
                {/* Clickable ring */}
                <circle
                  cx={CX}
                  cy={CY}
                  r={r}
                  fill={isActive ? colors.activeFill : colors.fill}
                  stroke={isActive ? colors.activeStroke : colors.stroke}
                  strokeWidth={isActive ? 2.5 : 1.2}
                  strokeDasharray={isActive ? 'none' : '6 4'}
                  className={`transition-all duration-300 ${isActive ? 'process-node-active' : ''}`}
                />

                {/* Ring label — inside the ring, positioned along the top arc */}
                {i === 0 && (
                  <text
                    x={CX}
                    y={CY - 113}
                    textAnchor="middle"
                    fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="0.12em"
                    className="transition-all duration-300 pointer-events-none"
                  >
                    INTRIGUE
                  </text>
                )}
                {i === 1 && (
                  <text
                    x={CX}
                    y={CY - 66}
                    textAnchor="middle"
                    fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="0.12em"
                    className="transition-all duration-300 pointer-events-none"
                  >
                    ORIENTATION
                  </text>
                )}
                {i === 2 && (
                  <>
                    <text
                      x={CX}
                      y={CY + 4}
                      textAnchor="middle"
                      fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)'}
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="'JetBrains Mono', monospace"
                      letterSpacing="0.12em"
                      className="transition-all duration-300 pointer-events-none"
                    >
                      PROOF
                    </text>
                  </>
                )}
              </g>
            )
          })}

          {/* Decorative elements */}

          {/* Spinning dashed ring */}
          <circle
            cx={CX}
            cy={CY}
            r={165}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={0.6}
            strokeDasharray="4 6"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />

          {/* Small indicator dots on the active ring */}
          {[0, 90, 180, 270].map((angle, i) => {
            const r = LAYERS[activeIndex].radius
            const rad = (angle * Math.PI) / 180
            const dotX = CX + r * Math.cos(rad)
            const dotY = CY + r * Math.sin(rad)
            return (
              <circle
                key={`dot-${i}`}
                cx={dotX}
                cy={dotY}
                r={3}
                fill="#dfff00"
                fillOpacity={0.6}
                className="overwhelmed-pulse"
                style={{
                  transformOrigin: `${dotX}px ${dotY}px`,
                  animationDelay: `${i * 0.3}s`,
                  transition: 'cx 0.3s ease, cy 0.3s ease',
                }}
              />
            )
          })}

          {/* Arrow labels showing direction: outside → inside */}
          <g>
            <text
              x={CX}
              y={CY + LAYERS[0].radius + 28}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="10"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.12em"
            >
              OUTSIDE → INSIDE
            </text>
          </g>

          {/* Detail panel background — right side of SVG */}
          <rect
            x={390}
            y={60}
            width={190}
            height={280}
            rx={6}
            fill="rgba(5,5,5,0.9)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={0.8}
          />

          {/* Detail panel accent bar */}
          <rect
            x={390}
            y={60}
            width={2}
            height={280}
            rx={1}
            fill="#dfff00"
            fillOpacity={0.5}
          />

          {/* Detail panel content */}
          <g key={active.id}>
            {/* Layer number */}
            <text
              x={402}
              y={80}
              fill="rgba(223,255,0,0.7)"
              fontSize="7"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.1em"
            >
              LAYER {activeIndex + 1}
            </text>

            {/* Layer name */}
            <text
              x={402}
              y={94}
              fill="rgba(255,255,255,0.95)"
              fontSize="10"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
            >
              {active.label}
            </text>

            {/* Subtitle */}
            <text
              x={402}
              y={107}
              fill="rgba(255,255,255,0.5)"
              fontSize="7"
              fontFamily="'JetBrains Mono', monospace"
            >
              {active.subtitle}
            </text>

            {/* Divider line */}
            <line
              x1={402}
              y1={114}
              x2={570}
              y2={114}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={0.5}
            />

            {/* Items */}
            {active.items.map((item, i) => (
              <g
                key={`${active.id}-${i}`}
                className="process-item-enter"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <circle
                  cx={407}
                  cy={127 + i * 18}
                  r={1.5}
                  fill="rgba(223,255,0,0.5)"
                />
                <text
                  x={414}
                  y={130 + i * 18}
                  fill="rgba(255,255,255,0.8)"
                  fontSize="7"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {item}
                </text>
              </g>
            ))}

            {/* Tagline */}
            <line
              x1={402}
              y1={127 + active.items.length * 18 + 6}
              x2={570}
              y2={127 + active.items.length * 18 + 6}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={0.5}
            />
            <text
              x={402}
              y={127 + active.items.length * 18 + 20}
              fill="rgba(255,255,255,0.55)"
              fontSize="6.5"
              fontFamily="'JetBrains Mono', monospace"
              fontStyle="italic"
              className="process-item-enter"
              style={{ animationDelay: `${active.items.length * 60 + 100}ms` }}
            >
              {active.tagline}
            </text>
          </g>

          {/* Floating accent particles */}
          {[
            { x: 30, y: 50, r: 2.5, cls: 'overwhelmed-float-1' },
            { x: 370, y: 380, r: 2, cls: 'overwhelmed-float-2' },
            { x: 580, y: 30, r: 2, cls: 'overwhelmed-float-3' },
          ].map((p, i) => (
            <circle
              key={`particle-${i}`}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="rgba(223,255,0,0.5)"
              className={p.cls}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          ))}
        </svg>
      </div>

      {/* Step sequencer bar */}
      <div
        className="shrink-0 flex border-t border-white/10"
        style={{ height: 56 }}
      >
        {LAYERS.map((layer, i) => {
          const isActive = i === activeIndex
          return (
            <button
              key={layer.id}
              onClick={() => setActiveIndex(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < LAYERS.length - 1 ? 'border-r border-white/10' : ''
              } ${isActive ? 'bg-white text-[#050505]' : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
              style={{ border: 'none', outline: 'none' }}
            >
              <span
                className="font-bold transition-opacity"
                style={{
                  fontSize: '1.1rem',
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="uppercase tracking-widest"
                style={{ fontSize: '0.5rem' }}
              >
                {layer.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
