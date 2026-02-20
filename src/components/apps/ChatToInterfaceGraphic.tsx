const SVG_W = 400
const SVG_H = 480
const CX = SVG_W / 2

// Chat bubble
const BUBBLE_W = 200
const BUBBLE_H = 44
const BUBBLE_X = CX - BUBBLE_W / 2
const BUBBLE_Y = 36

// Connector
const CONN_TOP = BUBBLE_Y + BUBBLE_H + 12
const CONN_BOT = 190

// Dashboard
const DASH_PAD = 32
const DASH_X = DASH_PAD
const DASH_Y = CONN_BOT + 16
const DASH_W = SVG_W - DASH_PAD * 2
const DASH_H = SVG_H - DASH_Y - 24
const INNER_PAD = 12
const GAP = 10

// Widget dimensions
const COL1_W = (DASH_W - INNER_PAD * 2 - GAP) * 0.45
const COL2_W = (DASH_W - INNER_PAD * 2 - GAP) * 0.55
const ROW1_H = 100
const ROW2_H = 60

const WIDGETS = [
  { label: 'CHART', x: DASH_X + INNER_PAD, y: DASH_Y + INNER_PAD + 20, w: COL1_W, h: ROW1_H },
  { label: 'LIVE FEED', x: DASH_X + INNER_PAD + COL1_W + GAP, y: DASH_Y + INNER_PAD + 20, w: COL2_W, h: ROW1_H },
  { label: 'LEADERBOARD', x: DASH_X + INNER_PAD, y: DASH_Y + INNER_PAD + 20 + ROW1_H + GAP, w: DASH_W - INNER_PAD * 2, h: ROW2_H },
  { label: 'POSITIONS', x: DASH_X + INNER_PAD, y: DASH_Y + INNER_PAD + 20 + ROW1_H + GAP + ROW2_H + GAP, w: COL1_W, h: ROW2_H },
  { label: 'ALERTS', x: DASH_X + INNER_PAD + COL1_W + GAP, y: DASH_Y + INNER_PAD + 20 + ROW1_H + GAP + ROW2_H + GAP, w: COL2_W, h: ROW2_H },
]

export function ChatToInterfaceGraphic(): React.JSX.Element {
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
          {/* ── Chat Bubble (top) ── */}
          <g className="process-item-enter" style={{ animationDelay: '0ms' }}>
            <rect
              x={BUBBLE_X}
              y={BUBBLE_Y}
              width={BUBBLE_W}
              height={BUBBLE_H}
              rx={8}
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
            />
            <text
              x={BUBBLE_X + 14}
              y={BUBBLE_Y + 18}
              fill="rgba(255,255,255,0.55)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              "Track ETH on
            </text>
            <text
              x={BUBBLE_X + 14}
              y={BUBBLE_Y + 34}
              fill="rgba(255,255,255,0.55)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              Polymarket elections"
            </text>
            {/* Small user icon */}
            <circle
              cx={BUBBLE_X + BUBBLE_W + 12}
              cy={BUBBLE_Y + BUBBLE_H / 2}
              r={8}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.8}
            />
            <text
              x={BUBBLE_X + BUBBLE_W + 12}
              y={BUBBLE_Y + BUBBLE_H / 2 + 3}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="8"
              fontFamily="'JetBrains Mono', monospace"
            >
              U
            </text>
          </g>

          {/* ── Flow Connector ── */}
          <g className="process-item-enter" style={{ animationDelay: '300ms' }}>
            {/* Dashed center line */}
            <line
              x1={CX}
              y1={CONN_TOP}
              x2={CX}
              y2={CONN_BOT}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />

            {/* Flowing accent dots */}
            {[0, 1, 2].map((i) => (
              <circle
                key={`dot-${i}`}
                cx={CX}
                cy={CONN_TOP + 10}
                r={2.5}
                fill="#dfff00"
                fillOpacity={0.6}
                className="chat-to-interface-dot"
                style={{
                  animationDelay: `${600 + i * 400}ms`,
                }}
              />
            ))}

            {/* Arrow tip */}
            <path
              d={`M${CX - 5},${CONN_BOT - 6} L${CX},${CONN_BOT} L${CX + 5},${CONN_BOT - 6}`}
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Label */}
            <text
              x={CX + 16}
              y={(CONN_TOP + CONN_BOT) / 2 + 3}
              fill="rgba(255,255,255,0.25)"
              fontSize="8"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.08em"
            >
              INTENT → UI
            </text>
          </g>

          {/* ── Dashboard Frame ── */}
          <g className="process-item-enter" style={{ animationDelay: '500ms' }}>
            <rect
              x={DASH_X}
              y={DASH_Y}
              width={DASH_W}
              height={DASH_H}
              rx={8}
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.1)"
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
              fillOpacity={0.25}
            />

            {/* Title bar inside dashboard */}
            <circle
              cx={DASH_X + INNER_PAD + 4}
              cy={DASH_Y + 12}
              r={3}
              fill="#dfff00"
              fillOpacity={0.6}
            />
            <text
              x={DASH_X + INNER_PAD + 14}
              y={DASH_Y + 15}
              fill="rgba(255,255,255,0.5)"
              fontSize="9"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.08em"
            >
              PIGEON TERMINAL
            </text>
          </g>

          {/* ── Widget Blocks ── */}
          {WIDGETS.map((w, i) => (
            <g
              key={w.label}
              className="process-item-enter"
              style={{ animationDelay: `${700 + i * 120}ms` }}
            >
              <rect
                x={w.x}
                y={w.y}
                width={w.w}
                height={w.h}
                rx={4}
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.08)"
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
                fillOpacity={0.3}
              />
              {/* Widget label */}
              <text
                x={w.x + 10}
                y={w.y + 14}
                fill="rgba(255,255,255,0.35)"
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.06em"
              >
                {w.label}
              </text>

              {/* Decorative content lines inside widgets */}
              {w.h >= 80 && (
                <>
                  {[0.7, 0.5, 0.85].map((pct, li) => (
                    <line
                      key={li}
                      x1={w.x + 10}
                      y1={w.y + 28 + li * 16}
                      x2={w.x + 10 + (w.w - 20) * pct}
                      y2={w.y + 28 + li * 16}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth={6}
                      strokeLinecap="round"
                    />
                  ))}
                </>
              )}
              {w.h < 80 && (
                <>
                  {[0.6, 0.45].map((pct, li) => (
                    <line
                      key={li}
                      x1={w.x + 10}
                      y1={w.y + 28 + li * 14}
                      x2={w.x + 10 + (w.w - 20) * pct}
                      y2={w.y + 28 + li * 14}
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth={6}
                      strokeLinecap="round"
                    />
                  ))}
                </>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
