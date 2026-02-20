// Orbit center — shifted right to make room for competitor app on left
const CX = 310
const CY = 200

// Competitor app position (left side)
const COMP_X = 62
const COMP_Y = 200

// Book data for 3 orbital rings
const INNER_COUNT = 6
const INNER_RADIUS = 70
const INNER_BOOKS = Array.from({ length: INNER_COUNT }, (_, i) => {
  const angle = (i / INNER_COUNT) * Math.PI * 2 - Math.PI / 2
  const heights = [32, 28, 36, 30, 34, 26]
  return { angle, w: 10, h: heights[i], highlighted: i === 1 }
})

const MID_COUNT = 10
const MID_RADIUS = 120
const MID_BOOKS = Array.from({ length: MID_COUNT }, (_, i) => {
  const angle = (i / MID_COUNT) * Math.PI * 2 - Math.PI / 2
  const heights = [38, 30, 42, 34, 40, 28, 36, 44, 32, 38]
  return { angle, w: 12, h: heights[i], highlighted: i === 4 }
})

const OUTER_COUNT = 14
const OUTER_RADIUS = 170
const OUTER_BOOKS = Array.from({ length: OUTER_COUNT }, (_, i) => {
  const angle = (i / OUTER_COUNT) * Math.PI * 2 - Math.PI / 2
  const heights = [36, 44, 32, 40, 28, 46, 34, 42, 30, 38, 48, 36, 40, 32]
  return { angle, w: 13, h: heights[i], highlighted: i === 7 || i === 12 }
})

function BookRect({ cx, cy, angle, w, h, highlighted }: {
  cx: number; cy: number; angle: number; w: number; h: number; highlighted: boolean
}): React.JSX.Element {
  const angleDeg = (angle * 180) / Math.PI
  return (
    <g transform={`translate(${cx}, ${cy}) rotate(${angleDeg})`}>
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={1.5}
        fill={highlighted ? 'rgba(223,255,0,0.12)' : 'rgba(255,255,255,0.1)'}
        stroke={highlighted ? 'rgba(223,255,0,0.55)' : 'rgba(255,255,255,0.35)'}
        strokeWidth={highlighted ? 1.2 : 0.8}
      />
      {/* Spine line */}
      <line
        x1={-w / 2 + 3}
        y1={-h / 2 + 4}
        x2={-w / 2 + 3}
        y2={h / 2 - 4}
        stroke={highlighted ? 'rgba(223,255,0,0.35)' : 'rgba(255,255,255,0.2)'}
        strokeWidth={0.5}
      />
    </g>
  )
}

export function BookOrbitGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 520 400"
        className="w-full h-full"
        style={{ maxWidth: 700, maxHeight: 540 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ====== Background dashed rings ====== */}
        <circle
          cx={CX} cy={CY} r={185}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={0.8}
          strokeDasharray="6 4"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle
          cx={CX} cy={CY} r={95}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={0.6}
          strokeDasharray="4 6"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Orbital path hints */}
        <circle cx={CX} cy={CY} r={INNER_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} strokeDasharray="3 5" />
        <circle cx={CX} cy={CY} r={MID_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} strokeDasharray="3 5" />
        <circle cx={CX} cy={CY} r={OUTER_RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.5} strokeDasharray="3 5" />

        {/* ====== COMPETITOR APP + MAGNET (left side) ====== */}
        <g
          className="overwhelmed-float-2"
          style={{ transformOrigin: `${COMP_X}px ${COMP_Y}px` }}
        >
          {/* Phone outline — dimmer, no accent */}
          <rect
            x={COMP_X - 10} y={COMP_Y - 16}
            width={20} height={32}
            rx={3}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={0.8}
          />
          {/* Screen lines */}
          <line x1={COMP_X - 6} y1={COMP_Y - 6} x2={COMP_X + 6} y2={COMP_Y - 6} stroke="rgba(255,255,255,0.15)" strokeWidth={0.5} />
          <line x1={COMP_X - 6} y1={COMP_Y - 1} x2={COMP_X + 4} y2={COMP_Y - 1} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />
          <line x1={COMP_X - 6} y1={COMP_Y + 4} x2={COMP_X + 5} y2={COMP_Y + 4} stroke="rgba(255,255,255,0.12)" strokeWidth={0.5} />

          {/* Horseshoe magnet above phone */}
          <path
            d={`M ${COMP_X - 8} ${COMP_Y - 36} L ${COMP_X - 8} ${COMP_Y - 48} Q ${COMP_X} ${COMP_Y - 58} ${COMP_X + 8} ${COMP_Y - 48} L ${COMP_X + 8} ${COMP_Y - 36}`}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          {/* Magnet tips (red-ish tint) */}
          <line x1={COMP_X - 8} y1={COMP_Y - 36} x2={COMP_X - 8} y2={COMP_Y - 30} stroke="rgba(220,80,80,0.5)" strokeWidth={3} strokeLinecap="round" />
          <line x1={COMP_X + 8} y1={COMP_Y - 36} x2={COMP_X + 8} y2={COMP_Y - 30} stroke="rgba(220,80,80,0.5)" strokeWidth={3} strokeLinecap="round" />
        </g>

        {/* Pull lines — reaching toward books but fading/breaking */}
        {/* Line 1 — upper */}
        <line
          x1={COMP_X + 14} y1={COMP_Y - 40}
          x2={COMP_X + 55} y2={COMP_Y - 50}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={0.8}
          strokeDasharray="3 4"
        />
        {/* Line 2 — middle */}
        <line
          x1={COMP_X + 14} y1={COMP_Y - 5}
          x2={COMP_X + 60} y2={COMP_Y - 5}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={0.7}
          strokeDasharray="3 5"
        />
        {/* Line 3 — lower */}
        <line
          x1={COMP_X + 14} y1={COMP_Y + 30}
          x2={COMP_X + 50} y2={COMP_Y + 45}
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={0.6}
          strokeDasharray="2 5"
        />

        {/* Break marks — small X's where pull lines fade */}
        <g stroke="rgba(220,80,80,0.35)" strokeWidth={0.8} strokeLinecap="round">
          <line x1={COMP_X + 52} y1={COMP_Y - 53} x2={COMP_X + 58} y2={COMP_Y - 47} />
          <line x1={COMP_X + 58} y1={COMP_Y - 53} x2={COMP_X + 52} y2={COMP_Y - 47} />

          <line x1={COMP_X + 57} y1={COMP_Y - 8} x2={COMP_X + 63} y2={COMP_Y - 2} />
          <line x1={COMP_X + 63} y1={COMP_Y - 8} x2={COMP_X + 57} y2={COMP_Y - 2} />

          <line x1={COMP_X + 47} y1={COMP_Y + 42} x2={COMP_X + 53} y2={COMP_Y + 48} />
          <line x1={COMP_X + 53} y1={COMP_Y + 42} x2={COMP_X + 47} y2={COMP_Y + 48} />
        </g>

        {/* ====== Outer ring — clockwise (process-icon-spin) ====== */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {OUTER_BOOKS.map((book, i) => (
            <BookRect
              key={`outer-${i}`}
              cx={CX + OUTER_RADIUS * Math.cos(book.angle)}
              cy={CY + OUTER_RADIUS * Math.sin(book.angle)}
              angle={book.angle}
              w={book.w}
              h={book.h}
              highlighted={book.highlighted}
            />
          ))}
        </g>

        {/* ====== Middle ring — counter-clockwise ====== */}
        <g
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {MID_BOOKS.map((book, i) => (
            <BookRect
              key={`mid-${i}`}
              cx={CX + MID_RADIUS * Math.cos(book.angle)}
              cy={CY + MID_RADIUS * Math.sin(book.angle)}
              angle={book.angle}
              w={book.w}
              h={book.h}
              highlighted={book.highlighted}
            />
          ))}
        </g>

        {/* ====== Inner ring — slow clockwise ====== */}
        <g
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {INNER_BOOKS.map((book, i) => (
            <BookRect
              key={`inner-${i}`}
              cx={CX + INNER_RADIUS * Math.cos(book.angle)}
              cy={CY + INNER_RADIUS * Math.sin(book.angle)}
              angle={book.angle}
              w={book.w}
              h={book.h}
              highlighted={book.highlighted}
            />
          ))}
        </g>

        {/* ====== Center: Person + Phone ====== */}
        {/* Head */}
        <circle
          cx={CX} cy={CY - 18}
          r={8}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.2}
        />
        {/* Shoulders/body arc */}
        <path
          d={`M ${CX - 14} ${CY + 8} Q ${CX - 14} ${CY - 6} ${CX} ${CY - 8} Q ${CX + 14} ${CY - 6} ${CX + 14} ${CY + 8}`}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.2}
        />

        {/* Phone/app rectangle */}
        <rect
          x={CX - 7} y={CY + 6}
          width={14} height={22}
          rx={2}
          fill="rgba(223,255,0,0.08)"
          stroke="rgba(223,255,0,0.5)"
          strokeWidth={1}
        />
        {/* Phone screen lines */}
        <line x1={CX - 4} y1={CY + 12} x2={CX + 4} y2={CY + 12} stroke="rgba(223,255,0,0.3)" strokeWidth={0.6} />
        <line x1={CX - 4} y1={CY + 16} x2={CX + 2} y2={CY + 16} stroke="rgba(223,255,0,0.25)" strokeWidth={0.5} />
        <line x1={CX - 4} y1={CY + 20} x2={CX + 3} y2={CY + 20} stroke="rgba(223,255,0,0.2)" strokeWidth={0.5} />

        {/* Phone glow pulse */}
        <rect
          x={CX - 10} y={CY + 3}
          width={20} height={28}
          rx={4}
          fill="none"
          stroke="rgba(223,255,0,0.2)"
          strokeWidth={0.8}
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${CY + 17}px` }}
        />

        {/* ====== Orbiting accent particles ====== */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX + 185} cy={CY} r={2} fill="rgba(223,255,0,0.5)" />
          <circle cx={CX + 185} cy={CY} r={4} fill="none" stroke="rgba(223,255,0,0.2)" strokeWidth={0.5} />
          <circle cx={CX - 150} cy={CY + 50} r={1.5} fill="rgba(255,255,255,0.35)" />
          <circle cx={CX + 30} cy={CY - 175} r={1.5} fill="rgba(255,255,255,0.3)" />
        </g>

        {/* ====== Label ====== */}
        <text
          x={CX} y={390}
          textAnchor="middle"
          fill="rgba(255,255,255,0.55)"
          style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
        >
          YOUR HISTORY
        </text>

        {/* ====== Corner brackets ====== */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} fill="none">
          <polyline points="18,30 18,18 30,18" />
          <polyline points="490,18 502,18 502,30" />
          <polyline points="502,370 502,382 490,382" />
          <polyline points="30,382 18,382 18,370" />
        </g>
      </svg>
    </div>
  )
}
