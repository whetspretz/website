// Animated "Evolving Shapes" graphic for Lunchbreak case study
// Visual: 4 phone wireframes in 2×2 grid showing product evolution
// Portrait viewBox to match split-slide-image panel

const SVG_W = 340
const SVG_H = 540
const CX = SVG_W / 2

// Phone dimensions
const PH_W = 100
const PH_H = 140
const PH_R = 12
const GAP_X = 28
const GAP_Y = 24

// Grid positions (top-left corner of each phone)
const COL1_X = CX - PH_W - GAP_X / 2
const COL2_X = CX + GAP_X / 2
const ROW1_Y = 70
const ROW2_Y = ROW1_Y + PH_H + GAP_Y + 30 // extra space for labels

const PHONES = [
  { id: 'social', label: 'SOCIAL', x: COL1_X, y: ROW1_Y, num: '1', float: 'overwhelmed-float-1', delay: '0ms' },
  { id: 'expert', label: 'EXPERT', x: COL2_X, y: ROW1_Y, num: '2', float: 'overwhelmed-float-2', delay: '150ms' },
  { id: 'creator', label: 'CREATOR', x: COL1_X, y: ROW2_Y, num: '3', float: 'overwhelmed-float-3', delay: '350ms' },
  { id: 'graph', label: 'PRO GRAPH', x: COL2_X, y: ROW2_Y, num: '4', float: 'overwhelmed-float-1', delay: '500ms' },
] as const

// Floating particles
const PARTICLES = [
  { x: 30, y: 60, r: 2, o: 0.5, cls: 'overwhelmed-float-1' },
  { x: 310, y: 480, r: 1.8, o: 0.45, cls: 'overwhelmed-float-2' },
  { x: 50, y: 510, r: 2.2, o: 0.4, cls: 'overwhelmed-float-3' },
  { x: 290, y: 70, r: 1.5, o: 0.5, cls: 'overwhelmed-float-1' },
]

// Phone shell (rounded rect with notch)
function PhoneShell({ x, y }: { x: number; y: number }): React.JSX.Element {
  return (
    <g>
      <rect
        x={x} y={y}
        width={PH_W} height={PH_H}
        rx={PH_R}
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={1}
      />
      {/* Notch */}
      <rect
        x={x + PH_W / 2 - 14} y={y + 4}
        width={28} height={4}
        rx={2}
        fill="rgba(255,255,255,0.2)"
      />
      {/* Bottom bar */}
      <rect
        x={x + PH_W / 2 - 12} y={y + PH_H - 10}
        width={24} height={3}
        rx={1.5}
        fill="rgba(255,255,255,0.15)"
      />
    </g>
  )
}

// Wireframe: Social Network (feed with posts)
function WireSocial({ x, y }: { x: number; y: number }): React.JSX.Element {
  const cx = x + PH_W / 2
  const top = y + 16
  return (
    <g>
      {/* Header bar */}
      <rect x={x + 10} y={top} width={PH_W - 20} height={6} rx={2} fill="rgba(255,255,255,0.15)" />
      {/* Post 1: avatar + text lines */}
      <circle cx={x + 18} cy={top + 22} r={5} fill="rgba(223,255,0,0.5)" className="overwhelmed-pulse" style={{ transformOrigin: `${x + 18}px ${top + 22}px` }} />
      <rect x={x + 28} y={top + 18} width={52} height={4} rx={1.5} fill="rgba(255,255,255,0.2)" />
      <rect x={x + 28} y={top + 25} width={38} height={3} rx={1} fill="rgba(255,255,255,0.12)" />
      {/* Post 2: avatar + text lines */}
      <circle cx={x + 18} cy={top + 46} r={5} fill="rgba(255,255,255,0.2)" />
      <rect x={x + 28} y={top + 42} width={52} height={4} rx={1.5} fill="rgba(255,255,255,0.2)" />
      <rect x={x + 28} y={top + 49} width={44} height={3} rx={1} fill="rgba(255,255,255,0.12)" />
      {/* Post 3 (faded) */}
      <circle cx={x + 18} cy={top + 70} r={5} fill="rgba(255,255,255,0.1)" />
      <rect x={x + 28} y={top + 66} width={48} height={4} rx={1.5} fill="rgba(255,255,255,0.1)" />
      <rect x={x + 28} y={top + 73} width={34} height={3} rx={1} fill="rgba(255,255,255,0.07)" />
      {/* Floating action button */}
      <circle cx={cx + 28} cy={top + 88} r={8} fill="rgba(223,255,0,0.12)" stroke="rgba(223,255,0,0.45)" strokeWidth={0.8} />
      <text x={cx + 28} y={top + 92} textAnchor="middle" fill="rgba(223,255,0,0.7)" fontSize="12" fontFamily="'JetBrains Mono', monospace" fontWeight="700">+</text>
    </g>
  )
}

// Wireframe: Expert Marketplace (profile + rating + book button)
function WireExpert({ x, y }: { x: number; y: number }): React.JSX.Element {
  const cx = x + PH_W / 2
  const top = y + 16
  return (
    <g>
      {/* Profile avatar */}
      <circle cx={cx} cy={top + 18} r={14} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} />
      <circle cx={cx} cy={top + 14} r={5} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} />
      <path d={`M${cx - 8},${top + 26} Q${cx},${top + 20} ${cx + 8},${top + 26}`} fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} />
      {/* Name placeholder */}
      <rect x={cx - 24} y={top + 38} width={48} height={4} rx={2} fill="rgba(255,255,255,0.2)" />
      {/* Star rating */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={`star-${i}`}
          cx={cx - 16 + i * 8} cy={top + 52}
          r={2.5}
          fill={i < 4 ? 'rgba(223,255,0,0.55)' : 'rgba(255,255,255,0.12)'}
        />
      ))}
      {/* Price tag */}
      <text x={cx} y={top + 68} textAnchor="middle" fill="rgba(223,255,0,0.6)" fontSize="11" fontFamily="'JetBrains Mono', monospace" fontWeight="700">$50/hr</text>
      {/* Book button */}
      <rect x={cx - 28} y={top + 78} width={56} height={16} rx={8} fill="rgba(223,255,0,0.12)" stroke="rgba(223,255,0,0.45)" strokeWidth={0.8} />
      <text x={cx} y={top + 90} textAnchor="middle" fill="rgba(223,255,0,0.7)" fontSize="9" fontFamily="'JetBrains Mono', monospace" fontWeight="600">BOOK</text>
    </g>
  )
}

// Wireframe: Creator Monetization (tiers + earnings)
function WireCreator({ x, y }: { x: number; y: number }): React.JSX.Element {
  const cx = x + PH_W / 2
  const top = y + 16
  return (
    <g>
      {/* Earnings display */}
      <text x={cx} y={top + 14} textAnchor="middle" fill="rgba(223,255,0,0.6)" fontSize="14" fontFamily="'JetBrains Mono', monospace" fontWeight="700">$2.4k</text>
      <text x={cx} y={top + 24} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="7" fontFamily="'JetBrains Mono', monospace">EARNED</text>
      {/* Tier bars */}
      {[
        { w: 60, label: 'Free', accent: false },
        { w: 48, label: 'Pro', accent: true },
        { w: 32, label: 'VIP', accent: true },
      ].map((tier, i) => (
        <g key={`tier-${i}`}>
          <rect
            x={x + 12} y={top + 36 + i * 20}
            width={tier.w} height={10}
            rx={3}
            fill={tier.accent ? 'rgba(223,255,0,0.15)' : 'rgba(255,255,255,0.08)'}
            stroke={tier.accent ? 'rgba(223,255,0,0.35)' : 'rgba(255,255,255,0.2)'}
            strokeWidth={0.6}
          />
          <text
            x={x + 12 + tier.w + 6} y={top + 44 + i * 20}
            fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="'JetBrains Mono', monospace"
          >
            {tier.label}
          </text>
        </g>
      ))}
      {/* Stats line */}
      <rect x={x + 12} y={top + 100} width={PH_W - 24} height={3} rx={1.5} fill="rgba(255,255,255,0.1)" />
    </g>
  )
}

// Wireframe: Professional Graph (network nodes)
function WireGraph({ x, y }: { x: number; y: number }): React.JSX.Element {
  const cx = x + PH_W / 2
  const top = y + 16
  // Node positions
  const nodes = [
    { nx: cx, ny: top + 45, r: 10, main: true },       // center (you)
    { nx: cx - 26, ny: top + 20, r: 6, main: false },   // top-left
    { nx: cx + 28, ny: top + 24, r: 7, main: false },   // top-right
    { nx: cx - 30, ny: top + 68, r: 5, main: false },   // bottom-left
    { nx: cx + 24, ny: top + 72, r: 6, main: false },   // bottom-right
    { nx: cx + 6, ny: top + 90, r: 4, main: false },    // far bottom
  ]
  return (
    <g>
      {/* Edges */}
      {nodes.slice(1).map((n, i) => (
        <line
          key={`edge-${i}`}
          x1={nodes[0].nx} y1={nodes[0].ny}
          x2={n.nx} y2={n.ny}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={0.6}
          strokeDasharray="3 3"
          className="core-connection-line"
        />
      ))}
      {/* Cross edges */}
      <line x1={nodes[1].nx} y1={nodes[1].ny} x2={nodes[2].nx} y2={nodes[2].ny} stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} strokeDasharray="2 3" />
      <line x1={nodes[3].nx} y1={nodes[3].ny} x2={nodes[4].nx} y2={nodes[4].ny} stroke="rgba(255,255,255,0.1)" strokeWidth={0.5} strokeDasharray="2 3" />
      {/* Nodes */}
      {nodes.map((n, i) => (
        <circle
          key={`node-${i}`}
          cx={n.nx} cy={n.ny} r={n.r}
          fill={n.main ? 'rgba(223,255,0,0.15)' : 'rgba(255,255,255,0.08)'}
          stroke={n.main ? 'rgba(223,255,0,0.5)' : 'rgba(255,255,255,0.3)'}
          strokeWidth={n.main ? 1.2 : 0.8}
          className={n.main ? 'process-icon-pulse' : undefined}
          style={n.main ? { transformOrigin: `${n.nx}px ${n.ny}px` } : undefined}
        />
      ))}
      {/* "YOU" label on center node */}
      <text x={cx} y={top + 49} textAnchor="middle" fill="rgba(223,255,0,0.7)" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="700">YOU</text>
    </g>
  )
}

// Arrow between two points
function Arrow({ x1, y1, x2, y2, delay }: { x1: number; y1: number; x2: number; y2: number; delay: string }): React.JSX.Element {
  const headSize = 4
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len
  const uy = dy / len
  // Arrow tip
  const tipX = x2
  const tipY = y2
  const baseX1 = tipX - ux * headSize - uy * headSize * 0.6
  const baseY1 = tipY - uy * headSize + ux * headSize * 0.6
  const baseX2 = tipX - ux * headSize + uy * headSize * 0.6
  const baseY2 = tipY - uy * headSize - ux * headSize * 0.6
  return (
    <g className="process-item-enter" style={{ animationDelay: delay }}>
      <line
        x1={x1} y1={y1} x2={x2 - ux * headSize} y2={y2 - uy * headSize}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
        strokeDasharray="4 4"
        className="core-connection-line"
      />
      <polygon
        points={`${tipX},${tipY} ${baseX1},${baseY1} ${baseX2},${baseY2}`}
        fill="rgba(255,255,255,0.3)"
      />
    </g>
  )
}

export function EvolvingShapesGraphic(): React.JSX.Element {
  // Arrow endpoints
  const arrowRight1Y = ROW1_Y + PH_H / 2
  const arrowRight2Y = ROW2_Y + PH_H / 2
  const arrowDown1X = COL1_X + PH_W / 2
  const arrowDown2X = COL2_X + PH_W / 2
  const labelGap = 30 // space between phones rows for labels

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
      <div className="flex-1 min-h-0 flex items-center justify-center p-2">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ── Background orbit ring ── */}
          <circle
            cx={CX} cy={SVG_H / 2 + 10}
            r={180}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.6}
            strokeDasharray="6 8"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${SVG_H / 2 + 10}px` }}
          />

          {/* ── Header ── */}
          <text
            x={CX} y={38}
            textAnchor="middle"
            fill="rgba(255,255,255,0.65)"
            fontSize="16"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.18em"
          >
            EVOLVING SHAPES
          </text>
          <line
            x1={CX - 65} y1={50} x2={CX + 65} y2={50}
            stroke="rgba(255,255,255,0.15)" strokeWidth={1}
          />

          {/* ── Phones ── */}
          {PHONES.map((phone) => {
            const pcx = phone.x + PH_W / 2
            return (
              <g
                key={phone.id}
                className={`process-item-enter ${phone.float}`}
                style={{ animationDelay: phone.delay, transformOrigin: `${pcx}px ${phone.y + PH_H / 2}px` }}
              >
                <PhoneShell x={phone.x} y={phone.y} />

                {/* Wireframe interior */}
                {phone.id === 'social' && <WireSocial x={phone.x} y={phone.y} />}
                {phone.id === 'expert' && <WireExpert x={phone.x} y={phone.y} />}
                {phone.id === 'creator' && <WireCreator x={phone.x} y={phone.y} />}
                {phone.id === 'graph' && <WireGraph x={phone.x} y={phone.y} />}

                {/* Number badge */}
                <circle
                  cx={phone.x + 12} cy={phone.y + PH_H + 14}
                  r={8}
                  fill="rgba(223,255,0,0.12)"
                  stroke="rgba(223,255,0,0.45)"
                  strokeWidth={0.8}
                />
                <text
                  x={phone.x + 12} y={phone.y + PH_H + 18}
                  textAnchor="middle"
                  fill="rgba(223,255,0,0.7)"
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="700"
                >
                  {phone.num}
                </text>

                {/* Label */}
                <text
                  x={phone.x + 24} y={phone.y + PH_H + 18}
                  fill="rgba(255,255,255,0.45)"
                  fontSize="10"
                  fontFamily="'JetBrains Mono', monospace"
                  letterSpacing="0.08em"
                >
                  {phone.label}
                </text>
              </g>
            )
          })}

          {/* ── Arrows ── */}
          {/* Horizontal: phone 1 → 2 */}
          <Arrow
            x1={COL1_X + PH_W + 4} y1={arrowRight1Y}
            x2={COL2_X - 4} y2={arrowRight1Y}
            delay="200ms"
          />
          {/* Horizontal: phone 3 → 4 */}
          <Arrow
            x1={COL1_X + PH_W + 4} y1={arrowRight2Y}
            x2={COL2_X - 4} y2={arrowRight2Y}
            delay="600ms"
          />
          {/* Vertical: phone 1 → 3 */}
          <Arrow
            x1={arrowDown1X} y1={ROW1_Y + PH_H + labelGap}
            x2={arrowDown1X} y2={ROW2_Y - 4}
            delay="400ms"
          />
          {/* Vertical: phone 2 → 4 */}
          <Arrow
            x1={arrowDown2X} y1={ROW1_Y + PH_H + labelGap}
            x2={arrowDown2X} y2={ROW2_Y - 4}
            delay="500ms"
          />

          {/* ── Bottom caption ── */}
          <text
            x={CX} y={ROW2_Y + PH_H + 42}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
            fontStyle="italic"
          >
            each pivot sharpened the vision
          </text>

          {/* ── Floating accent particles ── */}
          {PARTICLES.map((p, i) => (
            <circle
              key={`particle-${i}`}
              cx={p.x} cy={p.y} r={p.r}
              fill={`rgba(223,255,0,${p.o})`}
              className={p.cls}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}
