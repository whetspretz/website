const CX = 200
const CARD_W = 260
const CARD_H = 55
const CARD_X = CX - CARD_W / 2
const GAP = 18
const START_Y = 55

const LAYERS = [
  {
    label: 'RECOGNITION',
    question: 'What is this?',
    fill: 'rgba(223,255,0,0.08)',
    stroke: 'rgba(255,255,255,0.15)',
    accentOpacity: 0.6,
    floatClass: 'overwhelmed-float-1',
  },
  {
    label: 'PERSONAL FIT',
    question: 'Is this for me?',
    fill: 'rgba(255,255,255,0.06)',
    stroke: 'rgba(255,255,255,0.15)',
    accentOpacity: 0.45,
    floatClass: 'overwhelmed-float-2',
  },
  {
    label: 'SOCIAL PROOF',
    question: 'Who else liked this?',
    fill: 'rgba(255,255,255,0.05)',
    stroke: 'rgba(255,255,255,0.15)',
    accentOpacity: 0.3,
    floatClass: 'overwhelmed-float-3',
  },
  {
    label: 'ACTION',
    question: 'What do I do with it?',
    fill: 'rgba(255,255,255,0.04)',
    stroke: 'rgba(255,255,255,0.15)',
    accentOpacity: 0.2,
    floatClass: 'overwhelmed-float-1',
  },
]

// Simple icons for each layer
function EyeIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx="0" cy="0" rx="8" ry="5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <circle cx="0" cy="0" r="2.5" fill="rgba(255,255,255,0.35)" />
    </g>
  )
}

function UserIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="-3" r="3" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <path d="M-5 6 Q-5 1 0 1 Q5 1 5 6" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
    </g>
  )
}

function PeopleIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="-4" cy="-3" r="2.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <circle cx="4" cy="-3" r="2.5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <path d="M-8 5 Q-8 1 -4 1 Q0 1 0 5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <path d="M0 5 Q0 1 4 1 Q8 1 8 5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
    </g>
  )
}

function HandIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="-3" y="-2" width="6" height="8" rx="2" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <line x1="-1" y1="-2" x2="-1" y2="-5" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="1.5" y1="-2" x2="1.5" y2="-6" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="4" y1="-2" x2="4" y2="-4" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  )
}

const ICONS = [EyeIcon, UserIcon, PeopleIcon, HandIcon]

export function FourLayersGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: 400, maxHeight: 400, width: '100%', height: '100%' }}
      >
        {/* Background spinning circle */}
        <circle
          cx={CX}
          cy={CX}
          r={180}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
          strokeDasharray="6 8"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CX}px` }}
        />

        {/* Corner brackets */}
        <path d="M20 30 L20 20 L30 20" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M370 20 L380 20 L380 30" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M20 370 L20 380 L30 380" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        <path d="M370 380 L380 380 L380 370" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />

        {/* Connecting vertical dashed line */}
        <line
          x1={CARD_X + 14}
          y1={START_Y + CARD_H}
          x2={CARD_X + 14}
          y2={START_Y + (CARD_H + GAP) * 3 + 2}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        {/* Downward arrows between layers */}
        {[0, 1, 2].map(i => {
          const arrowY = START_Y + CARD_H * (i + 1) + GAP * i + GAP / 2
          return (
            <g key={`arrow-${i}`}>
              <path
                d={`M${CARD_X + 10} ${arrowY} L${CARD_X + 14} ${arrowY + 5} L${CARD_X + 18} ${arrowY}`}
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
            </g>
          )
        })}

        {/* Layer cards */}
        {LAYERS.map((layer, i) => {
          const y = START_Y + (CARD_H + GAP) * i
          const Icon = ICONS[i]
          return (
            <g key={layer.label} className={layer.floatClass}>
              {/* Card background */}
              <rect
                x={CARD_X}
                y={y}
                width={CARD_W}
                height={CARD_H}
                rx={6}
                fill={layer.fill}
                stroke={layer.stroke}
                strokeWidth="1"
              />

              {/* Left accent bar */}
              <rect
                x={CARD_X + 3}
                y={y + 8}
                width={4}
                height={CARD_H - 16}
                rx={2}
                fill={`rgba(223,255,0,${layer.accentOpacity})`}
              />

              {/* Layer number */}
              <text
                x={CARD_X + 28}
                y={y + 22}
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fill="rgba(223,255,0,0.6)"
                textAnchor="start"
              >
                {i + 1}
              </text>

              {/* Label */}
              <text
                x={CARD_X + 44}
                y={y + 22}
                fontFamily="JetBrains Mono, monospace"
                fontSize="12"
                fill="rgba(255,255,255,0.6)"
                textAnchor="start"
                letterSpacing="0.08em"
              >
                {layer.label}
              </text>

              {/* Question subtitle */}
              <text
                x={CARD_X + 28}
                y={y + 42}
                fontFamily="JetBrains Mono, monospace"
                fontSize="12"
                fill="rgba(255,255,255,0.45)"
                textAnchor="start"
              >
                {layer.question}
              </text>

              {/* Icon */}
              <Icon x={CARD_X + CARD_W - 25} y={y + CARD_H / 2} />
            </g>
          )
        })}

        {/* Bottom label */}
        <text
          x={CX}
          y={START_Y + (CARD_H + GAP) * 4 + 8}
          fontFamily="JetBrains Mono, monospace"
          fontSize="11"
          fill="rgba(255,255,255,0.45)"
          textAnchor="middle"
          letterSpacing="0.05em"
        >
          {'Confidence \u2192 Context \u2192 Commitment'}
        </text>
      </svg>
    </div>
  )
}
