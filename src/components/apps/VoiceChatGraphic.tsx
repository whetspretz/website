const MESSAGES: { sender: 'user' | 'pigeon'; lines: string[] }[] = [
  { sender: 'user', lines: ['Swap .5 ETH to USDC'] },
  { sender: 'pigeon', lines: ['Done. 1,247 USDC.', 'Tx: 0x8f2a...4e1b'] },
  { sender: 'user', lines: ['Slippage?'] },
  { sender: 'pigeon', lines: ['0.12%.'] },
  { sender: 'user', lines: ['Set a limit order too?'] },
  { sender: 'pigeon', lines: ['Already on it.', 'ETH at $2,800.'] },
]

const SVG_W = 400
const SVG_H = 480
const PAD = 24
const BUBBLE_W = 230
const LINE_H = 18
const BUBBLE_PAD_X = 12
const BUBBLE_PAD_Y = 10
const MSG_GAP = 14
const CHAT_TOP = 72

export function VoiceChatGraphic(): React.JSX.Element {
  // Pre-calculate Y positions for each message
  const positions: number[] = []
  let y = CHAT_TOP
  for (let i = 0; i < MESSAGES.length; i++) {
    positions.push(y)
    const bubbleH = BUBBLE_PAD_Y * 2 + MESSAGES[i].lines.length * LINE_H
    y += bubbleH + MSG_GAP
  }

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
          {/* Header */}
          <circle cx={PAD + 4} cy={36} r={4} fill="#dfff00" fillOpacity={0.8} />
          <circle
            cx={PAD + 4}
            cy={36}
            r={7}
            fill="none"
            stroke="#dfff00"
            strokeWidth={0.6}
            strokeOpacity={0.3}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${PAD + 4}px 36px` }}
          />
          <text
            x={PAD + 16}
            y={40}
            fill="rgba(255,255,255,0.8)"
            fontSize="12"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            PIGEON
          </text>
          <line
            x1={PAD}
            y1={54}
            x2={SVG_W - PAD}
            y2={54}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />

          {/* Chat messages */}
          {MESSAGES.map((msg, i) => {
            const msgY = positions[i]
            const bubbleH = BUBBLE_PAD_Y * 2 + msg.lines.length * LINE_H
            const isPigeon = msg.sender === 'pigeon'

            const bubbleX = isPigeon ? PAD : SVG_W - PAD - BUBBLE_W

            return (
              <g
                key={i}
                className="process-item-enter"
                style={{ animationDelay: `${200 + i * 200}ms` }}
              >
                {/* Bubble background */}
                <rect
                  x={bubbleX}
                  y={msgY}
                  width={BUBBLE_W}
                  height={bubbleH}
                  rx={8}
                  fill={isPigeon ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.05)'}
                  stroke={isPigeon ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.08)'}
                  strokeWidth={1}
                />

                {/* Accent left border for Pigeon */}
                {isPigeon && (
                  <rect
                    x={bubbleX}
                    y={msgY}
                    width={3}
                    height={bubbleH}
                    rx={1.5}
                    fill="#dfff00"
                    fillOpacity={0.4}
                  />
                )}

                {/* Text lines */}
                {msg.lines.map((line, li) => (
                  <text
                    key={li}
                    x={bubbleX + BUBBLE_PAD_X + (isPigeon ? 4 : 0)}
                    y={msgY + BUBBLE_PAD_Y + 13 + li * LINE_H}
                    fill={isPigeon ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)'}
                    fontSize={isPigeon ? '12' : '11'}
                    fontWeight={isPigeon && li === 0 ? '600' : '400'}
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {line}
                  </text>
                ))}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
