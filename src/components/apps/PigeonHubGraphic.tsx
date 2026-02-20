import { useState } from 'react'

interface Capability {
  label: string
  subtitle: string
}

const CAPABILITIES: Capability[] = [
  { label: 'TRADING', subtitle: 'Stocks, perps, spot, bridges, 20+ chains' },
  { label: 'PREDICTION MARKETS', subtitle: 'Trade anything from sports, crypto, to current events' },
  { label: 'BRIDGING', subtitle: 'It finds the best routes between chains' },
  { label: 'RESEARCH', subtitle: 'Stocks, tokens, people, events' },
  { label: 'AUTOMATE', subtitle: 'alerts, stops, research, or custom scripts' },
  { label: 'PORTFOLIO', subtitle: 'All your wallets, one view' },
]

// Layout constants
const SVG_W = 800
const SVG_H = 480
const BIRD_CX = 220
const BIRD_CY = 240
const BIRD_R = 60
const ORBIT_RX = 110
const ORBIT_RY = 200

// Label column
const LABEL_X = 520
const LABEL_START_Y = 95
const LABEL_GAP = 58

// Arrow marker size
const ARROW_SIZE = 6

export function PigeonHubGraphic(): React.JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="w-full h-full flex flex-col relative process-dot-grid">
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.04) 50%)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/15" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/15" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/15" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/15" />

      {/* Main SVG */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-4">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Arrow marker */}
            <marker
              id="hub-arrow"
              viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`}
              refX={ARROW_SIZE}
              refY={ARROW_SIZE / 2}
              markerWidth={ARROW_SIZE}
              markerHeight={ARROW_SIZE}
              orient="auto"
            >
              <path
                d={`M 0 0 L ${ARROW_SIZE} ${ARROW_SIZE / 2} L 0 ${ARROW_SIZE} Z`}
                fill="#dfff00"
              />
            </marker>
            <marker
              id="hub-arrow-dim"
              viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`}
              refX={ARROW_SIZE}
              refY={ARROW_SIZE / 2}
              markerWidth={ARROW_SIZE}
              markerHeight={ARROW_SIZE}
              orient="auto"
            >
              <path
                d={`M 0 0 L ${ARROW_SIZE} ${ARROW_SIZE / 2} L 0 ${ARROW_SIZE} Z`}
                fill="rgba(255,255,255,0.2)"
              />
            </marker>

            {/* Clip for bird image */}
            <clipPath id="bird-clip">
              <circle cx={BIRD_CX} cy={BIRD_CY} r={BIRD_R - 2} />
            </clipPath>
          </defs>

          {/* Elliptical orbit ring */}
          <ellipse
            cx={BIRD_CX}
            cy={BIRD_CY}
            rx={ORBIT_RX}
            ry={ORBIT_RY}
            fill="none"
            stroke="#dfff00"
            strokeWidth={1}
            strokeOpacity={0.35}
            className="pigeon-hub-orbit"
            style={{ transformOrigin: `${BIRD_CX}px ${BIRD_CY}px` }}
          />

          {/* Second faint orbit ring (offset rotation) */}
          <ellipse
            cx={BIRD_CX}
            cy={BIRD_CY}
            rx={ORBIT_RX + 8}
            ry={ORBIT_RY + 8}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.5}
            strokeDasharray="4 8"
            className="pigeon-hub-orbit"
            style={{ transformOrigin: `${BIRD_CX}px ${BIRD_CY}px`, animationDirection: 'reverse', animationDuration: '30s' }}
          />

          {/* Connection lines from orbit edge to labels */}
          {CAPABILITIES.map((_, i) => {
            const labelY = LABEL_START_Y + i * LABEL_GAP + 8
            const isActive = activeIndex === i
            const hasSomeActive = activeIndex !== null
            const isDim = hasSomeActive && !isActive

            // Line starts from the right edge of the orbit ellipse area
            const lineStartX = BIRD_CX + ORBIT_RX + 12
            const lineEndX = LABEL_X - 10

            return (
              <line
                key={`line-${i}`}
                x1={lineStartX}
                y1={labelY}
                x2={lineEndX}
                y2={labelY}
                stroke={isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.12)'}
                strokeWidth={isActive ? 1.2 : 0.8}
                strokeDasharray={isActive ? 'none' : '6 4'}
                markerEnd={isActive ? 'url(#hub-arrow)' : 'url(#hub-arrow-dim)'}
                opacity={isDim ? 0.4 : 1}
                className="transition-all duration-200"
              />
            )
          })}

          {/* Bird image circle */}
          <circle
            cx={BIRD_CX}
            cy={BIRD_CY}
            r={BIRD_R}
            fill="rgba(255,255,255,0.03)"
            stroke="#dfff00"
            strokeWidth={1.5}
            strokeOpacity={0.4}
            className="pigeon-hub-glow-circle"
          />
          <image
            href="/projects/pigeon/pigeon-logo.png"
            x={BIRD_CX - BIRD_R + 2}
            y={BIRD_CY - BIRD_R + 2}
            width={(BIRD_R - 2) * 2}
            height={(BIRD_R - 2) * 2}
            clipPath="url(#bird-clip)"
            preserveAspectRatio="xMidYMid slice"
          />

          {/* Glow ring around bird */}
          <circle
            cx={BIRD_CX}
            cy={BIRD_CY}
            r={BIRD_R + 4}
            fill="none"
            stroke="#dfff00"
            strokeWidth={0.5}
            strokeOpacity={0.15}
            strokeDasharray="3 5"
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${BIRD_CX}px ${BIRD_CY}px` }}
          />

          {/* Capability labels */}
          {CAPABILITIES.map((cap, i) => {
            const y = LABEL_START_Y + i * LABEL_GAP
            const isActive = activeIndex === i
            const hasSomeActive = activeIndex !== null
            const isDim = hasSomeActive && !isActive

            return (
              <g
                key={`cap-${i}`}
                className="cursor-pointer"
                onClick={() => setActiveIndex(isActive ? null : i)}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                opacity={isDim ? 0.4 : 1}
                style={{ transition: 'opacity 0.2s ease' }}
              >
                {/* Hit area */}
                <rect
                  x={LABEL_X - 8}
                  y={y - 4}
                  width={280}
                  height={LABEL_GAP - 8}
                  fill="transparent"
                />
                {/* Label */}
                <text
                  x={LABEL_X}
                  y={y + 10}
                  fill={isActive ? '#ffffff' : 'rgba(255,255,255,0.85)'}
                  fontSize="13"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', monospace"
                  letterSpacing="0.05em"
                >
                  {cap.label}
                </text>
                {/* Subtitle */}
                <text
                  x={LABEL_X + 4}
                  y={y + 28}
                  fill={isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)'}
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {cap.subtitle}
                </text>
              </g>
            )
          })}

          {/* Orbiting particles on the ellipse */}
          <g
            className="process-icon-spin"
            style={{ transformOrigin: `${BIRD_CX}px ${BIRD_CY}px` }}
          >
            <circle cx={BIRD_CX + ORBIT_RX} cy={BIRD_CY} r={2.5} fill="#dfff00" fillOpacity={0.4} />
            <circle cx={BIRD_CX - ORBIT_RX} cy={BIRD_CY} r={2} fill="#dfff00" fillOpacity={0.25} />
            <circle cx={BIRD_CX} cy={BIRD_CY - ORBIT_RY} r={2} fill="rgba(255,255,255,0.2)" />
            <circle cx={BIRD_CX} cy={BIRD_CY + ORBIT_RY} r={1.5} fill="rgba(255,255,255,0.15)" />
          </g>
        </svg>
      </div>

      {/* Caption */}
      <p
        className="text-white/40 text-center font-mono px-8 pb-3 shrink-0"
        style={{ fontSize: '0.6rem' }}
      >
        Pigeon solves an intent-to-execution layer that makes trading stupid easy: take natural language, ground it in reality, plan multi-step actions, execute, then prove it with receipts.
      </p>
    </div>
  )
}
