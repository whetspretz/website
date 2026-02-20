// 4-stage horizontal pipeline: History → AI → Taste Profile → Your Shelf

// Stage centers (x positions)
const HISTORY_X = 115
const AI_X = 300
const PROFILE_X = 485
const SHELF_X = 730
const MID_Y = 155

// --- Stage 1: scattered books around a person ---
const HISTORY_BOOKS = [
  { x: 45, y: 110, w: 14, h: 48, rot: -12 },
  { x: 70, y: 128, w: 12, h: 40, rot: 8 },
  { x: 90, y: 100, w: 15, h: 52, rot: -5 },
  { x: 130, y: 105, w: 13, h: 46, rot: 15 },
  { x: 152, y: 122, w: 12, h: 38, rot: -10 },
  { x: 170, y: 98, w: 14, h: 50, rot: 6 },
  { x: 52, y: 158, w: 13, h: 42, rot: 20 },
  { x: 162, y: 162, w: 12, h: 40, rot: -18 },
]

// --- Stage 3: score bars ---
const PROFILE_BARS = [
  { w: 70, accent: false },
  { w: 52, accent: false },
  { w: 82, accent: true },
  { w: 44, accent: false },
  { w: 64, accent: false },
]

// --- Stage 4: neat shelf books ---
const SHELF_Y_TOP = 125
const SHELF_Y_BOT = 200
const SHELF_BOOKS_TOP = [
  { x: 642, w: 14, h: 52, accent: false },
  { x: 660, w: 13, h: 44, accent: false },
  { x: 677, w: 15, h: 58, accent: true },
  { x: 696, w: 13, h: 48, accent: false },
  { x: 713, w: 14, h: 54, accent: true },
  { x: 731, w: 13, h: 42, accent: false },
  { x: 748, w: 15, h: 50, accent: false },
  { x: 767, w: 13, h: 56, accent: false },
  { x: 784, w: 14, h: 44, accent: false },
  { x: 802, w: 15, h: 60, accent: true },
  { x: 821, w: 13, h: 48, accent: false },
]
const SHELF_BOOKS_BOT = [
  { x: 648, w: 14, h: 48, accent: false },
  { x: 666, w: 13, h: 42, accent: false },
  { x: 683, w: 15, h: 54, accent: false },
  { x: 702, w: 13, h: 50, accent: true },
  { x: 719, w: 14, h: 44, accent: false },
  { x: 736, w: 15, h: 56, accent: false },
  { x: 755, w: 13, h: 40, accent: false },
  { x: 772, w: 14, h: 52, accent: false },
  { x: 790, w: 15, h: 58, accent: true },
  { x: 809, w: 13, h: 44, accent: false },
]

// Lifted/glowing book on top shelf
const LIFTED_IDX = 4

// Arrow connection points
const ARROWS: { x1: number; x2: number }[] = [
  { x1: 195, x2: 235 },
  { x1: 365, x2: 415 },
  { x1: 555, x2: 620 },
]

// Pentagon points for radar outline behind profile card
function pentagonPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 5 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')
}

// 6-point sparkle for AI node
function sparklePath(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = []
  for (let i = 0; i < 6; i++) {
    const aOuter = (Math.PI * 2 * i) / 6 - Math.PI / 2
    const aInner = (Math.PI * 2 * (i + 0.5)) / 6 - Math.PI / 2
    points.push(`${cx + outer * Math.cos(aOuter)},${cy + outer * Math.sin(aOuter)}`)
    points.push(`${cx + inner * Math.cos(aInner)},${cy + inner * Math.sin(aInner)}`)
  }
  return `M ${points.join(' L ')} Z`
}

export function TasteDiscoveryGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 900 340"
        className="w-full h-full"
        style={{ maxWidth: 820, maxHeight: 360 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ====== Background ====== */}
        <circle
          cx={450} cy={170} r={220}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={1}
          strokeDasharray="6 4"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: '450px 170px' }}
        />

        {/* ====== Connecting arrows ====== */}
        {ARROWS.map((a, i) => (
          <g key={`arrow-${i}`}>
            <line
              x1={a.x1} y1={MID_Y} x2={a.x2} y2={MID_Y}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1.2}
              strokeDasharray="6 4"
            />
            {/* Arrowhead */}
            <polygon
              points={`${a.x2},${MID_Y} ${a.x2 - 7},${MID_Y - 4} ${a.x2 - 7},${MID_Y + 4}`}
              fill="rgba(255,255,255,0.3)"
            />
          </g>
        ))}

        {/* Traveling particles along arrows */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: '450px 155px' }}
        >
          <circle cx={215} cy={MID_Y} r={2.5} fill="rgba(223, 255, 0, 0.6)" />
          <circle cx={390} cy={MID_Y} r={2.5} fill="rgba(223, 255, 0, 0.5)" />
          <circle cx={590} cy={MID_Y} r={2.2} fill="rgba(223, 255, 0, 0.55)" />
        </g>

        {/* ====== STAGE 1: HISTORY ====== */}
        <g>
          {/* Person silhouette */}
          <circle
            cx={HISTORY_X} cy={MID_Y - 28}
            r={15}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={1.2}
          />
          {/* Body */}
          <path
            d={`M ${HISTORY_X - 18},${MID_Y + 14} Q ${HISTORY_X - 18},${MID_Y - 8} ${HISTORY_X},${MID_Y - 12} Q ${HISTORY_X + 18},${MID_Y - 8} ${HISTORY_X + 18},${MID_Y + 14}`}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.2}
          />

          {/* Scattered books */}
          {HISTORY_BOOKS.map((book, i) => (
            <g
              key={`hb-${i}`}
              className={`overwhelmed-float-${(i % 3) + 1}`}
              style={{ transformOrigin: `${book.x + book.w / 2}px ${book.y + book.h / 2}px` }}
            >
              <rect
                x={book.x} y={book.y}
                width={book.w} height={book.h}
                rx={1.5}
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth={0.8}
                transform={`rotate(${book.rot}, ${book.x + book.w / 2}, ${book.y + book.h / 2})`}
              />
            </g>
          ))}

          {/* Label */}
          <text
            x={HISTORY_X} y={240}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            READING HISTORY
          </text>
        </g>

        {/* ====== STAGE 2: AI ====== */}
        <g>
          {/* Outer spinning ring */}
          <circle
            cx={AI_X} cy={MID_Y} r={55}
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth={1}
            strokeDasharray="5 4"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${AI_X}px ${MID_Y}px` }}
          />
          {/* Inner counter-ring */}
          <circle
            cx={AI_X} cy={MID_Y} r={40}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={0.8}
            strokeDasharray="3 5"
            className="overwhelmed-spin-reverse"
            style={{ transformOrigin: `${AI_X}px ${MID_Y}px` }}
          />

          {/* Central glow circle */}
          <circle
            cx={AI_X} cy={MID_Y} r={22}
            fill="rgba(223, 255, 0, 0.08)"
            stroke="rgba(223, 255, 0, 0.45)"
            strokeWidth={1.2}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${AI_X}px ${MID_Y}px` }}
          />

          {/* Sparkle icon */}
          <path
            d={sparklePath(AI_X, MID_Y, 13, 6)}
            fill="none"
            stroke="rgba(223, 255, 0, 0.6)"
            strokeWidth={1}
            strokeLinejoin="round"
            className="process-icon-spin"
            style={{ transformOrigin: `${AI_X}px ${MID_Y}px` }}
          />

          {/* Radiating analysis lines */}
          {[0, 60, 120, 180, 240, 300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180
            return (
              <line
                key={`ray-${i}`}
                x1={AI_X + 26 * Math.cos(rad)} y1={MID_Y + 26 * Math.sin(rad)}
                x2={AI_X + 37 * Math.cos(rad)} y2={MID_Y + 37 * Math.sin(rad)}
                stroke="rgba(255,255,255,0.18)"
                strokeWidth={0.7}
                strokeDasharray="2 3"
              />
            )
          })}

          {/* Label */}
          <text
            x={AI_X} y={240}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            LLMs
          </text>
        </g>

        {/* ====== STAGE 3: TASTE PROFILE ====== */}
        <g>
          {/* Pentagon radar outline */}
          <polygon
            points={pentagonPoints(PROFILE_X, MID_Y, 65)}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={0.8}
            strokeDasharray="4 4"
          />

          {/* Card background */}
          <rect
            x={PROFILE_X - 50} y={MID_Y - 55}
            width={100} height={110}
            rx={7}
            fill="rgba(255,255,255,0.05)"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${PROFILE_X}px ${MID_Y}px` }}
          />

          {/* Score bars */}
          {PROFILE_BARS.map((bar, i) => {
            const barY = MID_Y - 35 + i * 18
            return (
              <g key={`bar-${i}`}>
                {/* Track */}
                <rect
                  x={PROFILE_X - 38} y={barY}
                  width={76} height={8}
                  rx={4}
                  fill="rgba(255,255,255,0.07)"
                />
                {/* Fill */}
                <rect
                  x={PROFILE_X - 38} y={barY}
                  width={bar.w} height={8}
                  rx={4}
                  fill={bar.accent ? 'rgba(223, 255, 0, 0.45)' : 'rgba(255,255,255,0.2)'}
                />
              </g>
            )
          })}

          {/* Small profile icon at top of card */}
          <circle
            cx={PROFILE_X} cy={MID_Y - 64}
            r={7}
            fill="rgba(255,255,255,0.12)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={0.8}
          />

          {/* Label */}
          <text
            x={PROFILE_X} y={240}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            TASTE PROFILE
          </text>
        </g>

        {/* ====== STAGE 4: YOUR SHELF ====== */}
        <g>
          {/* Shelf lines */}
          <line
            x1={635} y1={SHELF_Y_TOP} x2={840} y2={SHELF_Y_TOP}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.2}
          />
          <line
            x1={640} y1={SHELF_Y_BOT} x2={835} y2={SHELF_Y_BOT}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.2}
          />
          {/* Shelf bracket ticks */}
          <line x1={635} y1={SHELF_Y_TOP} x2={635} y2={SHELF_Y_TOP + 6} stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} />
          <line x1={840} y1={SHELF_Y_TOP} x2={840} y2={SHELF_Y_TOP + 6} stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} />
          <line x1={640} y1={SHELF_Y_BOT} x2={640} y2={SHELF_Y_BOT + 6} stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} />
          <line x1={835} y1={SHELF_Y_BOT} x2={835} y2={SHELF_Y_BOT + 6} stroke="rgba(255,255,255,0.3)" strokeWidth={0.8} />

          {/* Top shelf books */}
          {SHELF_BOOKS_TOP.map((book, i) => {
            const isLifted = i === LIFTED_IDX
            const bookY = isLifted ? SHELF_Y_TOP - book.h - 5 : SHELF_Y_TOP - book.h
            return (
              <g
                key={`st-${i}`}
                className={`overwhelmed-float-${(i % 3) + 1}`}
                style={{ transformOrigin: `${book.x + book.w / 2}px ${bookY + book.h / 2}px` }}
              >
                <rect
                  x={book.x} y={bookY}
                  width={book.w} height={book.h}
                  rx={1.5}
                  fill={book.accent ? 'rgba(223, 255, 0, 0.12)' : 'rgba(255,255,255,0.1)'}
                  stroke={book.accent ? 'rgba(223, 255, 0, 0.55)' : 'rgba(255,255,255,0.35)'}
                  strokeWidth={book.accent ? 1 : 0.8}
                />
                {/* Spine */}
                <line
                  x1={book.x + 3.5} y1={bookY + 5}
                  x2={book.x + 3.5} y2={bookY + book.h - 5}
                  stroke={book.accent ? 'rgba(223, 255, 0, 0.3)' : 'rgba(255,255,255,0.15)'}
                  strokeWidth={0.5}
                />
              </g>
            )
          })}

          {/* Lifted book glow */}
          {(() => {
            const lb = SHELF_BOOKS_TOP[LIFTED_IDX]
            const lbY = SHELF_Y_TOP - lb.h - 5
            return (
              <rect
                x={lb.x - 3} y={lbY - 3}
                width={lb.w + 6} height={lb.h + 6}
                rx={3}
                fill="none"
                stroke="rgba(223, 255, 0, 0.35)"
                strokeWidth={1}
                className="overwhelmed-pulse"
                style={{ transformOrigin: `${lb.x + lb.w / 2}px ${lbY + lb.h / 2}px` }}
              />
            )
          })()}

          {/* Bottom shelf books */}
          {SHELF_BOOKS_BOT.map((book, i) => (
            <g
              key={`sb-${i}`}
              className={`overwhelmed-float-${((i + 1) % 3) + 1}`}
              style={{ transformOrigin: `${book.x + book.w / 2}px ${SHELF_Y_BOT - book.h / 2}px` }}
            >
              <rect
                x={book.x} y={SHELF_Y_BOT - book.h}
                width={book.w} height={book.h}
                rx={1.5}
                fill={book.accent ? 'rgba(223, 255, 0, 0.12)' : 'rgba(255,255,255,0.1)'}
                stroke={book.accent ? 'rgba(223, 255, 0, 0.55)' : 'rgba(255,255,255,0.35)'}
                strokeWidth={book.accent ? 1 : 0.8}
              />
              <line
                x1={book.x + 3.5} y1={SHELF_Y_BOT - book.h + 5}
                x2={book.x + 3.5} y2={SHELF_Y_BOT - 5}
                stroke={book.accent ? 'rgba(223, 255, 0, 0.3)' : 'rgba(255,255,255,0.15)'}
                strokeWidth={0.5}
              />
            </g>
          ))}

          {/* Celebratory floating particles */}
          {[
            { x: 665, y: 68, r: 2.5, o: 0.55 },
            { x: 715, y: 56, r: 1.8, o: 0.45 },
            { x: 760, y: 72, r: 2.2, o: 0.5 },
            { x: 805, y: 62, r: 1.5, o: 0.4 },
            { x: 688, y: 50, r: 2, o: 0.45 },
            { x: 745, y: 45, r: 2.3, o: 0.55 },
          ].map((p, i) => (
            <circle
              key={`cp-${i}`}
              cx={p.x} cy={p.y} r={p.r}
              fill={`rgba(223, 255, 0, ${p.o})`}
              className={`overwhelmed-float-${(i % 3) + 1}`}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          ))}

          {/* Label */}
          <text
            x={SHELF_X} y={240}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            TASTE DISCOVERY
          </text>
        </g>

        {/* ====== Corner brackets ====== */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth={1} fill="none">
          <polyline points="15,25 15,12 28,12" />
          <polyline points="872,12 885,12 885,25" />
          <polyline points="885,315 885,328 872,328" />
          <polyline points="28,328 15,328 15,315" />
        </g>

        {/* ====== Step numbers ====== */}
        {[
          { x: HISTORY_X, label: '01' },
          { x: AI_X, label: '02' },
          { x: PROFILE_X, label: '03' },
          { x: SHELF_X, label: '04' },
        ].map((step) => (
          <text
            key={step.label}
            x={step.x} y={268}
            textAnchor="middle"
            fill="rgba(255,255,255,0.25)"
            style={{ fontSize: '26px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}
          >
            {step.label}
          </text>
        ))}
      </svg>
    </div>
  )
}
