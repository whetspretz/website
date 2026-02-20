// Animated "Intent → Interface" graphic
// Visual story: messy human intent (top) → AI processing diamond (middle) → clean generated UI (bottom)

const SVG_W = 400
const SVG_H = 480
const CX = SVG_W / 2

// Intent bubbles — scattered, slightly rotated for organic feel
const INTENTS = [
  { text: '"track elections"', x: 28, y: 34, w: 155, rotation: -2 },
  { text: '"show my P&L"', x: 205, y: 70, w: 142, rotation: 1.5 },
  { text: '"alert when ETH dips"', x: 55, y: 112, w: 185, rotation: -1 },
] as const

const BUBBLE_H = 34

// AI processing center
const AI_CX = CX
const AI_CY = 210

// Dashboard
const DASH_X = 32
const DASH_Y = 288
const DASH_W = SVG_W - DASH_X * 2
const DASH_H = 170
const INNER_PAD = 12
const GAP = 8

const COL1_W = (DASH_W - INNER_PAD * 2 - GAP) * 0.48
const COL2_W = (DASH_W - INNER_PAD * 2 - GAP) * 0.52

const WIDGETS = [
  { label: 'CHART', x: DASH_X + INNER_PAD, y: DASH_Y + 30, w: COL1_W, h: 62, hasSparkline: true },
  { label: 'LIVE FEED', x: DASH_X + INNER_PAD + COL1_W + GAP, y: DASH_Y + 30, w: COL2_W, h: 62, hasSparkline: false },
  { label: 'ALERTS', x: DASH_X + INNER_PAD, y: DASH_Y + 30 + 62 + GAP, w: DASH_W - INNER_PAD * 2, h: 52, hasSparkline: false },
] as const

export function IntentToInterfaceGraphic(): React.JSX.Element {
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

      {/* Main SVG */}
      <div className="flex-1 min-h-0 flex items-center justify-center p-4">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ── Section label: USER INTENT ── */}
          <text
            x={CX}
            y={22}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            USER INTENT
          </text>

          {/* ── Intent Bubbles ── */}
          {INTENTS.map((intent, i) => {
            const bcx = intent.x + intent.w / 2
            const bcy = intent.y + BUBBLE_H / 2
            return (
              <g
                key={`intent-${i}`}
                className={`process-item-enter overwhelmed-float-${(i % 3) + 1}`}
                style={{
                  animationDelay: `${i * 120}ms`,
                  transformOrigin: `${bcx}px ${bcy}px`,
                }}
              >
                <g transform={`rotate(${intent.rotation}, ${bcx}, ${bcy})`}>
                  {/* Bubble background */}
                  <rect
                    x={intent.x}
                    y={intent.y}
                    width={intent.w}
                    height={BUBBLE_H}
                    rx={6}
                    fill="rgba(255,255,255,0.08)"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={1}
                  />
                  {/* Quote mark accent */}
                  <text
                    x={intent.x + 10}
                    y={intent.y + 22}
                    fill="rgba(255,255,255,0.75)"
                    fontSize="11"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {intent.text}
                  </text>
                </g>
              </g>
            )
          })}

          {/* Small person icon */}
          <g className="overwhelmed-float-2" style={{ transformOrigin: '355px 44px' }}>
            <circle cx={355} cy={38} r={4} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth={1} />
            <path
              d="M347,54 Q347,46 355,45 Q363,46 363,54"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1}
            />
          </g>

          {/* ── Connection Lines: Bubbles → Diamond ── */}
          {INTENTS.map((intent, i) => {
            const fromX = intent.x + intent.w / 2
            const fromY = intent.y + BUBBLE_H
            return (
              <g key={`conn-${i}`}>
                <line
                  x1={fromX}
                  y1={fromY + 4}
                  x2={AI_CX}
                  y2={AI_CY - 28}
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  className="core-connection-line"
                  style={{ animationDelay: `${0.2 + i * 0.2}s` }}
                />
                {/* Midpoint accent dot */}
                <circle
                  cx={(fromX + AI_CX) / 2}
                  cy={(fromY + 4 + AI_CY - 28) / 2}
                  r={2}
                  fill="#dfff00"
                  fillOpacity={0.5}
                  className="overwhelmed-pulse"
                  style={{
                    transformOrigin: `${(fromX + AI_CX) / 2}px ${(fromY + 4 + AI_CY - 28) / 2}px`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              </g>
            )
          })}

          {/* ── AI Processing Zone ── */}

          {/* Outer pulsing ring */}
          <circle
            cx={AI_CX}
            cy={AI_CY}
            r={36}
            fill="none"
            stroke="#dfff00"
            strokeWidth={0.8}
            strokeOpacity={0.3}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${AI_CX}px ${AI_CY}px` }}
          />

          {/* Middle spinning ring */}
          <circle
            cx={AI_CX}
            cy={AI_CY}
            r={26}
            fill="none"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={0.8}
            strokeDasharray="4 3"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${AI_CX}px ${AI_CY}px` }}
          />

          {/* Inner counter-spinning ring */}
          <circle
            cx={AI_CX}
            cy={AI_CY}
            r={18}
            fill="none"
            stroke="#dfff00"
            strokeWidth={0.5}
            strokeOpacity={0.4}
            strokeDasharray="3 5"
            className="overwhelmed-spin-reverse"
            style={{ transformOrigin: `${AI_CX}px ${AI_CY}px` }}
          />

          {/* Center diamond */}
          <g
            style={{ transformOrigin: `${AI_CX}px ${AI_CY}px` }}
            className="process-icon-pulse"
          >
            <path
              d={`M${AI_CX},${AI_CY - 12} L${AI_CX + 12},${AI_CY} L${AI_CX},${AI_CY + 12} L${AI_CX - 12},${AI_CY} Z`}
              fill="rgba(223,255,0,0.12)"
              stroke="#dfff00"
              strokeWidth={1.2}
              strokeOpacity={0.7}
            />
          </g>

          {/* Label */}
          <text
            x={AI_CX + 44}
            y={AI_CY + 4}
            fill="rgba(223,255,0,0.55)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            PIGEON AI
          </text>

          {/* Orbiting particles */}
          <g
            className="process-icon-spin"
            style={{ transformOrigin: `${AI_CX}px ${AI_CY}px` }}
          >
            <circle cx={AI_CX + 36} cy={AI_CY} r={2} fill="#dfff00" fillOpacity={0.5} />
            <circle cx={AI_CX - 36} cy={AI_CY} r={1.5} fill="#dfff00" fillOpacity={0.35} />
            <circle cx={AI_CX} cy={AI_CY - 36} r={1.5} fill="rgba(255,255,255,0.35)" />
          </g>

          {/* ── Connector: Processing → Dashboard ── */}
          <g className="process-item-enter" style={{ animationDelay: '500ms' }}>
            <line
              x1={CX}
              y1={AI_CY + 38}
              x2={CX}
              y2={DASH_Y - 8}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            {/* Flowing dots */}
            {[0, 1, 2].map(i => (
              <circle
                key={`flow-${i}`}
                cx={CX}
                cy={AI_CY + 42}
                r={2.5}
                fill="#dfff00"
                fillOpacity={0.6}
                className="chat-to-interface-dot"
                style={{ animationDelay: `${700 + i * 400}ms` }}
              />
            ))}
            {/* Arrow tip */}
            <path
              d={`M${CX - 5},${DASH_Y - 14} L${CX},${DASH_Y - 8} L${CX + 5},${DASH_Y - 14}`}
              fill="none"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Side label */}
            <text
              x={CX + 16}
              y={(AI_CY + 38 + DASH_Y - 8) / 2 + 3}
              fill="rgba(255,255,255,0.35)"
              fontSize="7"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.08em"
            >
              INTENT → UI
            </text>
          </g>

          {/* ── Dashboard Frame ── */}
          <g className="process-item-enter" style={{ animationDelay: '600ms' }}>
            <rect
              x={DASH_X}
              y={DASH_Y}
              width={DASH_W}
              height={DASH_H}
              rx={8}
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={1}
            />
            {/* Accent top border */}
            <rect
              x={DASH_X}
              y={DASH_Y}
              width={DASH_W}
              height={3}
              rx={1.5}
              fill="#dfff00"
              fillOpacity={0.35}
            />
            {/* Title bar */}
            <circle
              cx={DASH_X + INNER_PAD + 4}
              cy={DASH_Y + 14}
              r={3}
              fill="#dfff00"
              fillOpacity={0.7}
            />
            <text
              x={DASH_X + INNER_PAD + 14}
              y={DASH_Y + 17}
              fill="rgba(255,255,255,0.65)"
              fontSize="9"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.08em"
            >
              YOUR TERMINAL
            </text>
          </g>

          {/* ── Widget Blocks ── */}
          {WIDGETS.map((w, i) => (
            <g
              key={w.label}
              className={`process-item-enter overwhelmed-float-${(i % 3) + 1}`}
              style={{
                animationDelay: `${800 + i * 120}ms`,
                transformOrigin: `${w.x + w.w / 2}px ${w.y + w.h / 2}px`,
              }}
            >
              {/* Widget background */}
              <rect
                x={w.x}
                y={w.y}
                width={w.w}
                height={w.h}
                rx={4}
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={0.8}
              />
              {/* Accent left border */}
              <rect
                x={w.x}
                y={w.y}
                width={2}
                height={w.h}
                rx={1}
                fill="#dfff00"
                fillOpacity={0.4}
              />
              {/* Widget label */}
              <text
                x={w.x + 10}
                y={w.y + 14}
                fill="rgba(255,255,255,0.5)"
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.06em"
              >
                {w.label}
              </text>

              {/* Sparkline for chart widget */}
              {w.hasSparkline && (
                <>
                  {/* Subtle grid lines */}
                  {[0, 1, 2].map(li => (
                    <line
                      key={`grid-${li}`}
                      x1={w.x + 10}
                      y1={w.y + 24 + li * 12}
                      x2={w.x + w.w - 10}
                      y2={w.y + 24 + li * 12}
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth={0.5}
                    />
                  ))}
                  {/* Sparkline path */}
                  <path
                    d={`M${w.x + 10},${w.y + 44} L${w.x + 30},${w.y + 36} L${w.x + 50},${w.y + 40} L${w.x + 70},${w.y + 30} L${w.x + 90},${w.y + 34} L${w.x + 110},${w.y + 24} L${w.x + 130},${w.y + 28}`}
                    fill="none"
                    stroke="#dfff00"
                    strokeWidth={1.2}
                    strokeOpacity={0.55}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </>
              )}

              {/* Skeleton content lines for non-chart widgets */}
              {!w.hasSparkline && (
                <>
                  {(w.h >= 60 ? [0.7, 0.5, 0.85] : [0.6, 0.4]).map((pct, li) => (
                    <line
                      key={`skel-${li}`}
                      x1={w.x + 10}
                      y1={w.y + 26 + li * 12}
                      x2={w.x + 10 + (w.w - 20) * pct}
                      y2={w.y + 26 + li * 12}
                      stroke="rgba(255,255,255,0.12)"
                      strokeWidth={5}
                      strokeLinecap="round"
                    />
                  ))}
                </>
              )}
            </g>
          ))}

          {/* ── Bottom label ── */}
          <text
            x={CX}
            y={SVG_H - 6}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize="7"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            INTENT → STRUCTURE → INTERFACE
          </text>
        </svg>
      </div>
    </div>
  )
}
