// Animated "Design Principles" graphic — diamond/compass layout
// with 4 principle nodes at N/E/S/W around a center compass-rose.

const CX = 200
const CY = 195
const CARD_W = 110
const CARD_H = 64

const NODES = [
  {
    id: 'north',
    label: "SHOW, DON'T TELL",
    sub: 'Demonstrate value first.',
    num: '01',
    x: 200,
    y: 60,
    floatClass: 'overwhelmed-float-1',
    accent: true,
  },
  {
    id: 'east',
    label: 'DATA \u2192 DELIGHT',
    sub: 'Raw imports \u2192 personality.',
    num: '02',
    x: 332,
    y: 195,
    floatClass: 'overwhelmed-float-2',
    accent: false,
  },
  {
    id: 'south',
    label: 'LOW FRICTION',
    sub: 'Optional. Pre-filled. Easy.',
    num: '03',
    x: 200,
    y: 330,
    floatClass: 'overwhelmed-float-3',
    accent: false,
  },
  {
    id: 'west',
    label: 'VIBE-FORWARD',
    sub: 'Playful. Witty. Yours.',
    num: '04',
    x: 68,
    y: 195,
    floatClass: 'overwhelmed-float-1',
    accent: false,
  },
] as const

// Adjacent pairs for connecting lines
const EDGES: [number, number][] = [
  [0, 1], // N-E
  [1, 2], // E-S
  [2, 3], // S-W
  [3, 0], // W-N
]

// Floating accent particles in the empty diagonal corners
const PARTICLES = [
  { x: CX - 95, y: CY - 100, r: 1.8, o: 0.5, float: 'overwhelmed-float-1' },
  { x: CX + 95, y: CY - 100, r: 2.0, o: 0.45, float: 'overwhelmed-float-2' },
  { x: CX + 95, y: CY + 110, r: 1.6, o: 0.4, float: 'overwhelmed-float-3' },
  { x: CX - 95, y: CY + 110, r: 2.2, o: 0.55, float: 'overwhelmed-float-2' },
]

function trimmedLine(
  x1: number, y1: number,
  x2: number, y2: number,
  trim: number,
): { x1: number; y1: number; x2: number; y2: number } {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  return {
    x1: x1 + ux * trim,
    y1: y1 + uy * trim,
    x2: x2 - ux * trim,
    y2: y2 - uy * trim,
  }
}

// --- Icon components ---

function ShowIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx="0" cy="0" rx="8" ry="5" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <circle cx="0" cy="0" r="2" fill="rgba(255,255,255,0.3)" />
      <line x1="8" y1="-3" x2="12" y2="-5" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="9" y1="0" x2="13" y2="0" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="8" y1="3" x2="12" y2="5" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeLinecap="round" />
    </g>
  )
}

function SparkleIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1="0" y1="-8" x2="0" y2="8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="-8" y1="0" x2="8" y2="0" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="-4" y1="-4" x2="4" y2="4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeLinecap="round" />
      <line x1="4" y1="-4" x2="-4" y2="4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.4)" />
    </g>
  )
}

function FlowIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <circle cx="0" cy="0" r="7" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
      <circle cx="5" cy="-5" r="1.8" fill="rgba(255,255,255,0.3)" />
      <path d="M -7,0 A 7,7 0 0,1 0,-7" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7" strokeDasharray="2 2" />
    </g>
  )
}

function WaveIcon({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y})`}>
      <path d="M-8,-4 Q-4,-8 0,-4 Q4,0 8,-4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M-8,0 Q-4,-6 0,0 Q4,6 8,0" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M-8,4 Q-4,8 0,4 Q4,0 8,4" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" strokeLinecap="round" />
    </g>
  )
}

const ICONS = [ShowIcon, SparkleIcon, FlowIcon, WaveIcon]

export function DesignPrinciplesGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ maxWidth: 700, maxHeight: 700 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background spinning rings */}
        <circle
          cx={CX} cy={CY} r={170}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={0.8}
          strokeDasharray="6 4"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle
          cx={CX} cy={CY} r={118}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={0.6}
          strokeDasharray="4 6"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Corner brackets */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} fill="none">
          <polyline points="18,30 18,18 30,18" />
          <polyline points="370,18 382,18 382,30" />
          <polyline points="382,370 382,382 370,382" />
          <polyline points="30,382 18,382 18,370" />
        </g>

        {/* Connecting lines between adjacent nodes */}
        {EDGES.map(([a, b], i) => {
          const t = trimmedLine(NODES[a].x, NODES[a].y, NODES[b].x, NODES[b].y, 55)
          return (
            <line
              key={`edge-${i}`}
              x1={t.x1} y1={t.y1}
              x2={t.x2} y2={t.y2}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={0.8}
              strokeDasharray="5 4"
            />
          )
        })}

        {/* Center compass-rose */}
        <circle
          cx={CX} cy={CY} r={30}
          fill="none"
          stroke="rgba(223,255,0,0.25)"
          strokeWidth={0.8}
          strokeDasharray="3 5"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle
          cx={CX} cy={CY} r={18}
          fill="rgba(223,255,0,0.08)"
          stroke="rgba(223,255,0,0.5)"
          strokeWidth={1.2}
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        {/* Cardinal arms */}
        <line x1={CX} y1={CY - 10} x2={CX} y2={CY + 10} stroke="rgba(223,255,0,0.45)" strokeWidth={1} strokeLinecap="round" />
        <line x1={CX - 10} y1={CY} x2={CX + 10} y2={CY} stroke="rgba(223,255,0,0.45)" strokeWidth={1} strokeLinecap="round" />
        {/* Diagonal arms */}
        <line x1={CX - 7} y1={CY - 7} x2={CX + 7} y2={CY + 7} stroke="rgba(223,255,0,0.25)" strokeWidth={0.7} strokeLinecap="round" />
        <line x1={CX + 7} y1={CY - 7} x2={CX - 7} y2={CY + 7} stroke="rgba(223,255,0,0.25)" strokeWidth={0.7} strokeLinecap="round" />

        {/* Orbiting accent particle */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX + 148} cy={CY} r={2.5} fill="rgba(223,255,0,0.6)" />
          <circle cx={CX + 148} cy={CY} r={5} fill="none" stroke="rgba(223,255,0,0.2)" strokeWidth={0.5} />
        </g>

        {/* Floating accent particles */}
        {PARTICLES.map((p, i) => (
          <circle
            key={`particle-${i}`}
            cx={p.x} cy={p.y} r={p.r}
            fill={`rgba(223,255,0,${p.o})`}
            className={p.float}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}

        {/* Node cards */}
        {NODES.map((node, i) => {
          const Icon = ICONS[i]
          const rx = node.x - CARD_W / 2
          const ry = node.y - CARD_H / 2
          return (
            <g
              key={node.id}
              className={node.floatClass}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {/* Card background */}
              <rect
                x={rx} y={ry}
                width={CARD_W} height={CARD_H}
                rx={6}
                fill={node.accent ? 'rgba(223,255,0,0.08)' : 'rgba(255,255,255,0.06)'}
                stroke={node.accent ? 'rgba(223,255,0,0.45)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={node.accent ? 1.2 : 0.8}
              />

              {/* Top accent bar */}
              <rect
                x={rx + 8} y={ry + 3}
                width={node.accent ? 40 : 28}
                height={3}
                rx={1.5}
                fill={node.accent ? 'rgba(223,255,0,0.5)' : 'rgba(255,255,255,0.2)'}
              />

              {/* Number */}
              <text
                x={rx + 10} y={ry + 20}
                fontFamily="JetBrains Mono, monospace"
                fontSize="7"
                fill={node.accent ? 'rgba(223,255,0,0.6)' : 'rgba(223,255,0,0.4)'}
                textAnchor="start"
                letterSpacing="0.05em"
              >
                {node.num}
              </text>

              {/* Label */}
              <text
                x={rx + 10} y={ry + 33}
                fontFamily="JetBrains Mono, monospace"
                fontSize="7"
                fill="rgba(255,255,255,0.55)"
                textAnchor="start"
                letterSpacing="0.06em"
              >
                {node.label}
              </text>

              {/* Subtitle */}
              <text
                x={rx + 10} y={ry + CARD_H - 10}
                fontFamily="JetBrains Mono, monospace"
                fontSize="6"
                fill="rgba(255,255,255,0.3)"
                textAnchor="start"
              >
                {node.sub}
              </text>

              {/* Icon */}
              <Icon x={rx + CARD_W - 16} y={ry + 18} />
            </g>
          )
        })}

        {/* Bottom label */}
        <text
          x={CX} y={385}
          textAnchor="middle"
          fill="rgba(255,255,255,0.2)"
          style={{ fontSize: '7px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}
        >
          DESIGN PRINCIPLES
        </text>
      </svg>
    </div>
  )
}
