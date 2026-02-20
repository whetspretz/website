const CX = 200
const CY = 200

// 10 books arranged in a circle
const BOOK_COUNT = 10
const BOOK_RADIUS = 120
const BOOKS = Array.from({ length: BOOK_COUNT }, (_, i) => {
  const angle = (i / BOOK_COUNT) * Math.PI * 2 - Math.PI / 2 // start at top
  const heights = [42, 50, 38, 48, 44, 52, 40, 46, 50, 43]
  return {
    angle,
    x: CX + BOOK_RADIUS * Math.cos(angle),
    y: CY + BOOK_RADIUS * Math.sin(angle),
    w: 14,
    h: heights[i],
    highlighted: i === 2, // one accent book
  }
})

// 8 mood words between books
const MOODS = ['comfort', 'escape', 'thrill', 'nostalgia', 'wonder', 'warmth', 'melancholy', 'adventure']
const MOOD_RADIUS = 152
const MOOD_POSITIONS = MOODS.map((word, i) => {
  // offset by half a book-gap so words sit between books
  const angle = ((i + 0.5) / MOODS.length) * Math.PI * 2 - Math.PI / 2
  return {
    word,
    x: CX + MOOD_RADIUS * Math.cos(angle),
    y: CY + MOOD_RADIUS * Math.sin(angle),
    angle: (angle * 180) / Math.PI + 90, // rotate text to follow circle
    highlighted: i === 2, // near the highlighted book
  }
})

// Dimmed genre labels (outside the wheel, with strikethrough)
const GENRES = [
  { label: 'Literary Fiction', x: 45, y: 30 },
  { label: 'Sci-Fi', x: 340, y: 45 },
  { label: 'Romance', x: 55, y: 375 },
  { label: 'Mystery', x: 320, y: 370 },
]

export function MoodSpinnerGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ maxWidth: 400, maxHeight: 400 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ====== Background rings ====== */}
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
          cx={CX} cy={CY} r={80}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={0.6}
          strokeDasharray="4 6"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Subtle circle behind books */}
        <circle
          cx={CX} cy={CY} r={BOOK_RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={0.5}
          strokeDasharray="3 5"
        />

        {/* ====== Dimmed genre labels with strikethrough ====== */}
        {GENRES.map((genre, i) => (
          <g key={`genre-${i}`}>
            <text
              x={genre.x}
              y={genre.y}
              textAnchor="middle"
              fill="rgba(255,255,255,0.25)"
              style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}
            >
              {genre.label}
            </text>
            {/* Strikethrough line */}
            <line
              x1={genre.x - genre.label.length * 2.2}
              y1={genre.y - 2.5}
              x2={genre.x + genre.label.length * 2.2}
              y2={genre.y - 2.5}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth={0.6}
            />
          </g>
        ))}

        {/* ====== Books in a circle ====== */}
        {BOOKS.map((book, i) => {
          const angleDeg = (book.angle * 180) / Math.PI
          return (
            <g
              key={`book-${i}`}
              className={`overwhelmed-float-${(i % 3) + 1}`}
              style={{ transformOrigin: `${book.x}px ${book.y}px` }}
            >
              <g transform={`translate(${book.x}, ${book.y}) rotate(${angleDeg})`}>
                <rect
                  x={-book.w / 2}
                  y={-book.h / 2}
                  width={book.w}
                  height={book.h}
                  rx={1.5}
                  fill={book.highlighted ? 'rgba(223, 255, 0, 0.12)' : 'rgba(255,255,255,0.12)'}
                  stroke={book.highlighted ? 'rgba(223, 255, 0, 0.55)' : 'rgba(255,255,255,0.4)'}
                  strokeWidth={book.highlighted ? 1.2 : 0.8}
                />
                {/* Spine line */}
                <line
                  x1={-book.w / 2 + 3}
                  y1={-book.h / 2 + 4}
                  x2={-book.w / 2 + 3}
                  y2={book.h / 2 - 4}
                  stroke={book.highlighted ? 'rgba(223, 255, 0, 0.35)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth={0.5}
                />
              </g>
              {/* Glow pulse on highlighted book */}
              {book.highlighted && (
                <rect
                  x={book.x - book.w / 2 - 3}
                  y={book.y - book.h / 2 - 3}
                  width={book.w + 6}
                  height={book.h + 6}
                  rx={3}
                  fill="none"
                  stroke="rgba(223, 255, 0, 0.2)"
                  strokeWidth={0.8}
                  className="overwhelmed-pulse"
                  style={{ transformOrigin: `${book.x}px ${book.y}px` }}
                  transform={`rotate(${angleDeg}, ${book.x}, ${book.y})`}
                />
              )}
            </g>
          )
        })}

        {/* ====== Mood words ====== */}
        {MOOD_POSITIONS.map((mood, i) => (
          <text
            key={`mood-${i}`}
            x={mood.x}
            y={mood.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill={mood.highlighted ? 'rgba(223, 255, 0, 0.6)' : 'rgba(255,255,255,0.5)'}
            style={{
              fontSize: '9px',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.1em',
            }}
            transform={`rotate(${mood.angle}, ${mood.x}, ${mood.y})`}
          >
            {mood.word}
          </text>
        ))}

        {/* ====== Spinning pointer ====== */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          {/* Needle — slim triangle pointing up */}
          <polygon
            points={`${CX},${CY - 65} ${CX - 4},${CY - 12} ${CX + 4},${CY - 12}`}
            fill="rgba(223, 255, 0, 0.5)"
            stroke="rgba(223, 255, 0, 0.6)"
            strokeWidth={0.5}
            strokeLinejoin="round"
          />
          {/* Small tail */}
          <line
            x1={CX} y1={CY + 8}
            x2={CX} y2={CY + 20}
            stroke="rgba(223, 255, 0, 0.3)"
            strokeWidth={1}
            strokeLinecap="round"
          />
        </g>

        {/* Hub circle (on top of needle base) */}
        <circle
          cx={CX} cy={CY} r={12}
          fill="rgba(223, 255, 0, 0.08)"
          stroke="rgba(223, 255, 0, 0.5)"
          strokeWidth={1}
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        {/* Inner hub dot */}
        <circle
          cx={CX} cy={CY} r={3}
          fill="rgba(223, 255, 0, 0.4)"
        />

        {/* ====== Orbiting particles ====== */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX + 170} cy={CY} r={2} fill="rgba(223, 255, 0, 0.5)" />
          <circle cx={CX + 170} cy={CY} r={4} fill="none" stroke="rgba(223, 255, 0, 0.2)" strokeWidth={0.5} />
          <circle cx={CX - 140} cy={CY + 50} r={1.5} fill="rgba(255,255,255,0.35)" />
          <circle cx={CX + 30} cy={CY - 160} r={1.5} fill="rgba(255,255,255,0.3)" />
        </g>

        {/* ====== Corner brackets ====== */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth={0.8} fill="none">
          <polyline points="18,30 18,18 30,18" />
          <polyline points="370,18 382,18 382,30" />
          <polyline points="382,370 382,382 370,382" />
          <polyline points="30,382 18,382 18,370" />
        </g>
      </svg>
    </div>
  )
}
