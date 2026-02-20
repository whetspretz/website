const NOT_ITEMS = [
  '"Your transaction has been successfully completed."',
  '"As an AI assistant..."',
  'Paragraphs of explanation.',
]

const ALSO_NOT_ITEMS = [
  'Meme-y crypto slang.',
  'Overhyped alpha tone.',
  'Corporate fintech stiffness.',
]

const TONE_SIGNAL = ['Competent.', 'Calm.', 'In control.']

const SVG_W = 800
const SVG_H = 460
const LEFT_X = 80
const ROW_GAP = 34

function XMark({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g>
      <line x1={x} y1={y - 4} x2={x + 8} y2={y + 4} stroke="rgba(255,100,100,0.7)" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={x + 8} y1={y - 4} x2={x} y2={y + 4} stroke="rgba(255,100,100,0.7)" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  )
}

export function VoiceToneGraphic(): React.JSX.Element {
  const notStartY = 100
  const alsoNotStartY = notStartY + NOT_ITEMS.length * ROW_GAP + 50
  const dividerY = alsoNotStartY + ALSO_NOT_ITEMS.length * ROW_GAP + 30
  const toneY = dividerY + 40

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
      <div className="flex-1 min-h-0 flex items-center justify-center px-4">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Header */}
          <text
            x={SVG_W / 2}
            y={36}
            textAnchor="middle"
            fill="#dfff00"
            fontSize="14"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.12em"
          >
            WHAT WE AVOIDED
          </text>
          <text
            x={SVG_W / 2}
            y={56}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
          >
            Voice & tone guardrails for Pigeon
          </text>

          {/* ── NOT section ── */}
          <text
            x={LEFT_X}
            y={notStartY - 16}
            fill="rgba(255,255,255,0.5)"
            fontSize="11"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            NOT:
          </text>

          {NOT_ITEMS.map((item, i) => {
            const y = notStartY + i * ROW_GAP
            return (
              <g
                key={`not-${i}`}
                className="process-item-enter"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <XMark x={LEFT_X} y={y} />
                <text
                  x={LEFT_X + 18}
                  y={y + 4}
                  fill="rgba(255,255,255,0.5)"
                  fontSize="12"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {item}
                </text>
                <line
                  x1={LEFT_X + 16}
                  y1={y + 1}
                  x2={LEFT_X + 18 + item.length * 7}
                  y2={y + 1}
                  stroke="rgba(255,100,100,0.3)"
                  strokeWidth={1}
                  className="voice-strikethrough"
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                />
              </g>
            )
          })}

          {/* ── ALSO NOT section ── */}
          <text
            x={LEFT_X}
            y={alsoNotStartY - 16}
            fill="rgba(255,255,255,0.5)"
            fontSize="11"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            ALSO NOT:
          </text>

          {ALSO_NOT_ITEMS.map((item, i) => {
            const y = alsoNotStartY + i * ROW_GAP
            return (
              <g
                key={`also-${i}`}
                className="process-item-enter"
                style={{ animationDelay: `${400 + i * 120}ms` }}
              >
                <XMark x={LEFT_X} y={y} />
                <text
                  x={LEFT_X + 18}
                  y={y + 4}
                  fill="rgba(255,255,255,0.5)"
                  fontSize="12"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {item}
                </text>
                <line
                  x1={LEFT_X + 16}
                  y1={y + 1}
                  x2={LEFT_X + 18 + item.length * 7}
                  y2={y + 1}
                  stroke="rgba(255,100,100,0.3)"
                  strokeWidth={1}
                  className="voice-strikethrough"
                  style={{ animationDelay: `${700 + i * 120}ms` }}
                />
              </g>
            )
          })}

          {/* Divider line */}
          <line
            x1={100}
            y1={dividerY}
            x2={700}
            y2={dividerY}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
            strokeDasharray="6 4"
          />

          {/* ── Tone Signal ── */}
          <text
            x={SVG_W / 2}
            y={toneY}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            TONE HAD TO SIGNAL:
          </text>

          {TONE_SIGNAL.map((word, i) => {
            const totalWidth = TONE_SIGNAL.length * 140
            const startX = (SVG_W - totalWidth) / 2 + 70
            const x = startX + i * 140
            return (
              <g
                key={`tone-${i}`}
                className="process-item-enter"
                style={{ animationDelay: `${1000 + i * 150}ms` }}
              >
                <text
                  x={x}
                  y={toneY + 36}
                  textAnchor="middle"
                  fill="#dfff00"
                  fontSize="18"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', monospace"
                  letterSpacing="0.04em"
                >
                  {word}
                </text>
                <circle
                  cx={x}
                  cy={toneY + 50}
                  r={2}
                  fill="#dfff00"
                  fillOpacity={0.4}
                  className="overwhelmed-pulse"
                  style={{ transformOrigin: `${x}px ${toneY + 50}px` }}
                />
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
