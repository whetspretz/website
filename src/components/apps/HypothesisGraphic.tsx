const ACTIONS = [
  'Show users what\'s possible immediately',
  'Give them a structured first win',
  'Follow up contextually after drop-off',
]

const METRICS = [
  'First trade completion',
  '24h return rate',
  'Retention beyond week 1',
]

// Layout constants
const SVG_W = 800
const SVG_H = 400
const LEFT_X = 50
const CARD_W = 290
const CARD_H = 44
const CARD_GAP = 16
const CARD_START_Y = 80

const CENTER_X = 400
const CENTER_Y = 160

const RIGHT_X = 480
const METRIC_GAP = 60
const METRIC_START_Y = 100

export function HypothesisGraphic(): React.JSX.Element {
  const cardPositions = ACTIONS.map((_, i) => ({
    x: LEFT_X,
    y: CARD_START_Y + i * (CARD_H + CARD_GAP),
    cy: CARD_START_Y + i * (CARD_H + CARD_GAP) + CARD_H / 2,
  }))

  const metricPositions = METRICS.map((_, i) => ({
    x: RIGHT_X,
    y: METRIC_START_Y + i * METRIC_GAP,
  }))

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
            y={24}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            HYPOTHESIS
          </text>

          {/* "If we:" label */}
          <text
            x={LEFT_X}
            y={CARD_START_Y - 16}
            fill="rgba(255,255,255,0.5)"
            fontSize="13"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.08em"
          >
            IF WE:
          </text>

          {/* "We can increase:" label */}
          <text
            x={RIGHT_X}
            y={METRIC_START_Y - 26}
            fill="rgba(255,255,255,0.5)"
            fontSize="13"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.08em"
          >
            WE CAN INCREASE:
          </text>

          {/* Connection lines: cards → center */}
          {cardPositions.map((card, i) => (
            <line
              key={`left-line-${i}`}
              x1={card.x + CARD_W}
              y1={card.cy}
              x2={CENTER_X}
              y2={CENTER_Y}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1}
              strokeDasharray="4 4"
              className="core-connection-line"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}

          {/* Connection lines: center → metrics */}
          {metricPositions.map((metric, i) => (
            <line
              key={`right-line-${i}`}
              x1={CENTER_X}
              y1={CENTER_Y}
              x2={metric.x - 12}
              y2={metric.y}
              stroke="#dfff00"
              strokeWidth={1}
              strokeOpacity={0.45}
              strokeDasharray="4 4"
              className="core-connection-line"
              style={{ animationDelay: `${0.9 + i * 0.3}s` }}
            />
          ))}

          {/* Center convergence node */}
          <g>
            {/* Outer pulse ring */}
            <circle
              cx={CENTER_X}
              cy={CENTER_Y}
              r={16}
              fill="none"
              stroke="#dfff00"
              strokeWidth={0.8}
              strokeOpacity={0.3}
              className="overwhelmed-pulse"
              style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
            />
            {/* Inner diamond */}
            <g
              style={{ transformOrigin: `${CENTER_X}px ${CENTER_Y}px` }}
              className="process-icon-pulse"
            >
              <path
                d={`M${CENTER_X},${CENTER_Y - 8} L${CENTER_X + 8},${CENTER_Y} L${CENTER_X},${CENTER_Y + 8} L${CENTER_X - 8},${CENTER_Y} Z`}
                fill="rgba(223,255,0,0.1)"
                stroke="#dfff00"
                strokeWidth={1.2}
                strokeOpacity={0.6}
              />
            </g>
          </g>

          {/* Action cards (left) */}
          {ACTIONS.map((action, i) => {
            const pos = cardPositions[i]
            return (
              <g
                key={`action-${i}`}
                className="process-item-enter"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Card background */}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={CARD_W}
                  height={CARD_H}
                  rx={4}
                  fill="rgba(255,255,255,0.04)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1}
                />
                {/* Yellow left accent */}
                <rect
                  x={pos.x}
                  y={pos.y}
                  width={3}
                  height={CARD_H}
                  rx={1.5}
                  fill="#dfff00"
                  fillOpacity={0.5}
                />
                {/* Text */}
                <text
                  x={pos.x + 16}
                  y={pos.cy + 5}
                  fill="rgba(255,255,255,0.8)"
                  fontSize="11"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {action}
                </text>
              </g>
            )
          })}

          {/* Metric items (right) */}
          {METRICS.map((metric, i) => {
            const pos = metricPositions[i]
            return (
              <g
                key={`metric-${i}`}
                className={`overwhelmed-float-${(i % 3) + 1}`}
                style={{ transformOrigin: `${pos.x + 60}px ${pos.y}px` }}
              >
                {/* Upward arrow indicator */}
                <g>
                  <path
                    d={`M${pos.x - 4},${pos.y + 4} L${pos.x},${pos.y - 6} L${pos.x + 4},${pos.y + 4}`}
                    fill="none"
                    stroke="#dfff00"
                    strokeWidth={1.5}
                    strokeOpacity={0.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                {/* Metric text */}
                <text
                  x={pos.x + 14}
                  y={pos.y + 4}
                  fill="rgba(255,255,255,0.8)"
                  fontSize="13"
                  fontWeight="600"
                  fontFamily="'JetBrains Mono', monospace"
                >
                  {metric}
                </text>
              </g>
            )
          })}

          {/* Tagline */}
          <text
            x={SVG_W / 2}
            y={330}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
            fontStyle="italic"
          >
            Ideal action:
          </text>
          <text
            x={SVG_W / 2}
            y={352}
            textAnchor="middle"
            fill="rgba(255,255,255,0.7)"
            fontSize="14"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
          >
            User creates their first automation.
          </text>
        </svg>
      </div>
    </div>
  )
}
