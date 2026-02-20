const CX = 200
const CY = 200

// Books: x, width, height — sitting on shelves
const TOP_SHELF_Y = 145
const BOTTOM_SHELF_Y = 255
const TOP_BOOKS = [
  { x: 95, w: 14, h: 55 },
  { x: 113, w: 12, h: 48 },
  { x: 129, w: 16, h: 60 },
  { x: 150, w: 11, h: 42 },  // highlighted book
  { x: 165, w: 15, h: 52 },
  { x: 184, w: 13, h: 46 },
  { x: 201, w: 17, h: 58 },
  { x: 222, w: 12, h: 44 },
  { x: 238, w: 14, h: 50 },
  { x: 258, w: 11, h: 40 },
  { x: 273, w: 15, h: 54 },
  { x: 292, w: 13, h: 47 },
]
const BOTTOM_BOOKS = [
  { x: 105, w: 15, h: 52 },
  { x: 124, w: 12, h: 44 },
  { x: 140, w: 16, h: 56 },
  { x: 160, w: 13, h: 48 },
  { x: 177, w: 14, h: 42 },
  { x: 195, w: 11, h: 50 },
  { x: 210, w: 16, h: 55 },
  { x: 230, w: 13, h: 46 },
  { x: 247, w: 15, h: 51 },
  { x: 266, w: 12, h: 43 },
  { x: 282, w: 14, h: 49 },
]

// Connection pairs (indices into TOP_BOOKS / BOTTOM_BOOKS) for relationship lines
const CONNECTIONS: { from: { shelf: 'top' | 'bottom'; idx: number }; to: { shelf: 'top' | 'bottom'; idx: number } }[] = [
  { from: { shelf: 'top', idx: 3 }, to: { shelf: 'bottom', idx: 2 } },
  { from: { shelf: 'top', idx: 6 }, to: { shelf: 'bottom', idx: 6 } },
  { from: { shelf: 'top', idx: 1 }, to: { shelf: 'top', idx: 5 } },
  { from: { shelf: 'bottom', idx: 0 }, to: { shelf: 'bottom', idx: 4 } },
]

function getBookCenter(shelf: 'top' | 'bottom', idx: number): { x: number; y: number } {
  const books = shelf === 'top' ? TOP_BOOKS : BOTTOM_BOOKS
  const shelfY = shelf === 'top' ? TOP_SHELF_Y : BOTTOM_SHELF_Y
  const book = books[idx]
  return { x: book.x + book.w / 2, y: shelfY - book.h / 2 }
}

export function ShelfspaceGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ maxWidth: 400, maxHeight: 400 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background rings */}
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
          cx={CX} cy={CY} r={120}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={0.6}
          strokeDasharray="4 6"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Shelf lines */}
        <line
          x1={80} y1={TOP_SHELF_Y} x2={320} y2={TOP_SHELF_Y}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1}
        />
        <line
          x1={90} y1={BOTTOM_SHELF_Y} x2={310} y2={BOTTOM_SHELF_Y}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1}
        />
        {/* Shelf bracket ticks */}
        <line x1={80} y1={TOP_SHELF_Y} x2={80} y2={TOP_SHELF_Y + 6} stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />
        <line x1={320} y1={TOP_SHELF_Y} x2={320} y2={TOP_SHELF_Y + 6} stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />
        <line x1={90} y1={BOTTOM_SHELF_Y} x2={90} y2={BOTTOM_SHELF_Y + 6} stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />
        <line x1={310} y1={BOTTOM_SHELF_Y} x2={310} y2={BOTTOM_SHELF_Y + 6} stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />

        {/* Connection lines between related books */}
        {CONNECTIONS.map((conn, i) => {
          const from = getBookCenter(conn.from.shelf, conn.from.idx)
          const to = getBookCenter(conn.to.shelf, conn.to.idx)
          return (
            <line
              key={`conn-${i}`}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.8}
              strokeDasharray="3 4"
            />
          )
        })}

        {/* Top shelf books */}
        {TOP_BOOKS.map((book, i) => {
          const isHighlighted = i === 3
          return (
            <g
              key={`top-${i}`}
              className={`overwhelmed-float-${(i % 3) + 1}`}
              style={{ transformOrigin: `${book.x + book.w / 2}px ${TOP_SHELF_Y - book.h / 2}px` }}
            >
              <rect
                x={book.x}
                y={TOP_SHELF_Y - book.h}
                width={book.w}
                height={book.h}
                rx={1}
                fill={isHighlighted ? 'rgba(223, 255, 0, 0.12)' : 'rgba(255,255,255,0.1)'}
                stroke={isHighlighted ? 'rgba(223, 255, 0, 0.55)' : 'rgba(255,255,255,0.35)'}
                strokeWidth={isHighlighted ? 1.2 : 0.8}
              />
              {/* Spine detail line */}
              <line
                x1={book.x + 3} y1={TOP_SHELF_Y - book.h + 6}
                x2={book.x + 3} y2={TOP_SHELF_Y - 4}
                stroke={isHighlighted ? 'rgba(223, 255, 0, 0.35)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={0.5}
              />
            </g>
          )
        })}

        {/* Bottom shelf books */}
        {BOTTOM_BOOKS.map((book, i) => (
          <g
            key={`bot-${i}`}
            className={`overwhelmed-float-${((i + 1) % 3) + 1}`}
            style={{ transformOrigin: `${book.x + book.w / 2}px ${BOTTOM_SHELF_Y - book.h / 2}px` }}
          >
            <rect
              x={book.x}
              y={BOTTOM_SHELF_Y - book.h}
              width={book.w}
              height={book.h}
              rx={1}
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={0.8}
            />
            <line
              x1={book.x + 3} y1={BOTTOM_SHELF_Y - book.h + 6}
              x2={book.x + 3} y2={BOTTOM_SHELF_Y - 4}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.5}
            />
          </g>
        ))}

        {/* Highlighted book glow pulse */}
        {(() => {
          const hb = TOP_BOOKS[3]
          return (
            <rect
              x={hb.x - 2}
              y={TOP_SHELF_Y - hb.h - 2}
              width={hb.w + 4}
              height={hb.h + 4}
              rx={2}
              fill="none"
              stroke="rgba(223, 255, 0, 0.2)"
              strokeWidth={0.8}
              className="overwhelmed-pulse"
              style={{ transformOrigin: `${hb.x + hb.w / 2}px ${TOP_SHELF_Y - hb.h / 2}px` }}
            />
          )
        })()}

        {/* Discovery particle — orbits slowly around the scene */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX + 100} cy={CY} r={2.5} fill="rgba(223, 255, 0, 0.6)" />
          <circle cx={CX + 100} cy={CY} r={5} fill="none" stroke="rgba(223, 255, 0, 0.2)" strokeWidth={0.5} />
          <circle cx={CX - 80} cy={CY + 40} r={1.5} fill="rgba(255,255,255,0.35)" />
          <circle cx={CX + 20} cy={CY - 90} r={1.5} fill="rgba(255,255,255,0.3)" />
        </g>

        {/* Corner brackets */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} fill="none">
          <polyline points="25,40 25,25 40,25" />
          <polyline points="360,25 375,25 375,40" />
          <polyline points="375,360 375,375 360,375" />
          <polyline points="40,375 25,375 25,360" />
        </g>

        {/* Small label */}
        <text
          x={CX}
          y={335}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
        >
          DISCOVERY
        </text>
      </svg>
    </div>
  )
}
