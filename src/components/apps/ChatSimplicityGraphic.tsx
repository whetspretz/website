const MESSAGES: { side: 'user' | 'pigeon'; text: string; subtext?: string }[] = [
  { side: 'user', text: 'Buy ETH' },
  { side: 'pigeon', text: 'Bought 0.5 ETH @ $3,241', subtext: 'Confirmed · 2 block finality' },
  { side: 'user', text: 'Put $100 on AOC for president in 2028' },
  { side: 'pigeon', text: 'Bridging $100 worth of eth to place your bet.', subtext: 'Polymarket · AOC 2028 · Yes' },
]

const SVG_W = 340
const SVG_H = 420
const BUBBLE_H = 44
const BUBBLE_H_WITH_SUB = 62
const BUBBLE_RX = 10
const GAP = 18
const MARGIN_X = 20

// Approximate monospace char width at fontSize 11
const CHAR_W = 6.6
const CHAR_W_SUB = 4.8 // fontSize 8
const USER_PAD = 28 // 14px left + 14px right
const PIGEON_PAD = 56 // 26px left (dot + gap) + 30px right (checkmark)

function estimateWidth(msg: { side: 'user' | 'pigeon'; text: string; subtext?: string }): number {
  const textW = msg.text.length * CHAR_W + (msg.side === 'user' ? USER_PAD : PIGEON_PAD)
  const subW = msg.subtext ? msg.subtext.length * CHAR_W_SUB + PIGEON_PAD : 0
  return Math.max(textW, subW)
}

export function ChatSimplicityGraphic(): React.JSX.Element {
  let y = 40

  const bubbles: {
    side: 'user' | 'pigeon'
    text: string
    subtext?: string
    x: number
    y: number
    w: number
    h: number
    index: number
  }[] = []

  MESSAGES.forEach((msg, i) => {
    const h = msg.subtext ? BUBBLE_H_WITH_SUB : BUBBLE_H
    const w = estimateWidth(msg)
    const x = msg.side === 'user' ? SVG_W - MARGIN_X - w : MARGIN_X
    bubbles.push({ ...msg, x, y, w, h, index: i })
    y += h + GAP
  })

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full h-full"
        style={{ maxWidth: SVG_W, maxHeight: SVG_H }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Center timeline dashed line */}
        <line
          x1={SVG_W / 2}
          y1={20}
          x2={SVG_W / 2}
          y2={SVG_H - 20}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
          strokeDasharray="4 6"
        />

        {bubbles.map((b) => {
          const isUser = b.side === 'user'
          const delay = b.index * 150

          return (
            <g
              key={b.index}
              className="process-item-enter"
              style={{ animationDelay: `${delay}ms` }}
            >
              {/* Bubble background */}
              <rect
                x={b.x}
                y={b.y}
                width={b.w}
                height={b.h}
                rx={BUBBLE_RX}
                fill={isUser ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'}
                stroke={isUser ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)'}
                strokeWidth={1}
              />

              {/* Pigeon indicator dot */}
              {!isUser && (
                <circle
                  cx={b.x + 14}
                  cy={b.y + 16}
                  r={4}
                  fill="rgba(223,255,0,0.15)"
                  stroke="#dfff00"
                  strokeWidth={0.8}
                  strokeOpacity={0.5}
                />
              )}

              {/* Main text */}
              <text
                x={isUser ? b.x + 14 : b.x + 26}
                y={b.y + 20}
                fill={isUser ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.7)'}
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
                fontWeight={isUser ? '500' : '400'}
              >
                {b.text}
              </text>

              {/* Subtext for pigeon responses */}
              {b.subtext && (
                <text
                  x={b.x + 26}
                  y={b.y + 38}
                  fill="rgba(255,255,255,0.3)"
                  fontSize="8"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {b.subtext}
                </text>
              )}

              {/* Green checkmark for pigeon responses */}
              {!isUser && (
                <g
                  className="overwhelmed-pulse"
                  style={{ transformOrigin: `${b.x + b.w - 16}px ${b.y + 16}px` }}
                >
                  <circle
                    cx={b.x + b.w - 16}
                    cy={b.y + 16}
                    r={6}
                    fill="rgba(223,255,0,0.08)"
                  />
                  <path
                    d={`M ${b.x + b.w - 20} ${b.y + 16} l 3 3 l 5 -5`}
                    fill="none"
                    stroke="#dfff00"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity={0.7}
                  />
                </g>
              )}

              {/* Connector line from bubble to center timeline */}
              <line
                x1={isUser ? b.x : b.x + b.w}
                y1={b.y + b.h / 2}
                x2={SVG_W / 2}
                y2={b.y + b.h / 2}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={0.8}
                strokeDasharray="3 4"
              />

              {/* Dot on timeline */}
              <circle
                cx={SVG_W / 2}
                cy={b.y + b.h / 2}
                r={2}
                fill={isUser ? 'rgba(255,255,255,0.2)' : '#dfff00'}
                fillOpacity={isUser ? 1 : 0.4}
              />
            </g>
          )
        })}

        {/* Typing indicator at bottom */}
        <g
          className="process-item-enter"
          style={{ animationDelay: `${MESSAGES.length * 150 + 100}ms` }}
        >
          <rect
            x={MARGIN_X}
            y={y}
            width={60}
            height={30}
            rx={BUBBLE_RX}
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.8}
          />
          {[0, 1, 2].map((dotI) => (
            <circle
              key={dotI}
              cx={MARGIN_X + 20 + dotI * 10}
              cy={y + 15}
              r={2}
              fill="rgba(255,255,255,0.25)"
              className="chat-typing-dot"
              style={{ animationDelay: `${dotI * 200}ms` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
