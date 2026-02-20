// Animated "Anonymous Onboarding" graphic for Ketl case study
// Visual: anonymous silhouette with 3 trust questions orbiting, trust timeline bar below
// Portrait viewBox to match split-slide-image panel

const SVG_W = 340
const SVG_H = 540
const CX = SVG_W / 2

// Center figure position
const FIG_Y = 190

// Question card positions (around the figure)
const QUESTIONS = [
  { id: 'credible', text: 'Is this credible?', x: CX + 80, y: FIG_Y - 70, float: 'overwhelmed-float-1', delay: '0ms' },
  { id: 'safe', text: 'Am I safe to speak?', x: CX - 90, y: FIG_Y + 10, float: 'overwhelmed-float-2', delay: '100ms' },
  { id: 'belong', text: 'Do others belong?', x: CX + 75, y: FIG_Y + 80, float: 'overwhelmed-float-3', delay: '200ms' },
] as const

// Trust timeline
const BAR_Y = 410
const BAR_W = 260
const BAR_X = CX - BAR_W / 2

// Floating particles
const PARTICLES = [
  { x: 40, y: 80, r: 2, o: 0.5, cls: 'overwhelmed-float-1' },
  { x: 300, y: 460, r: 1.8, o: 0.45, cls: 'overwhelmed-float-2' },
  { x: 60, y: 500, r: 2.2, o: 0.4, cls: 'overwhelmed-float-3' },
  { x: 280, y: 100, r: 1.5, o: 0.5, cls: 'overwhelmed-float-1' },
]

export function AnonymousOnboardingGraphic(): React.JSX.Element {
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
          {/* ── Header ── */}
          <text
            x={CX}
            y={36}
            textAnchor="middle"
            fill="rgba(255,255,255,0.65)"
            fontSize="16"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.18em"
          >
            THE TRUST GAP
          </text>
          <line
            x1={CX - 60} y1={48} x2={CX + 60} y2={48}
            stroke="rgba(255,255,255,0.15)" strokeWidth={1}
          />

          {/* ── Orbit rings around figure ── */}
          <circle
            cx={CX} cy={FIG_Y}
            r={110}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={0.8}
            strokeDasharray="6 4"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${FIG_Y}px` }}
          />
          <circle
            cx={CX} cy={FIG_Y}
            r={75}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={0.6}
            strokeDasharray="4 6"
            className="overwhelmed-spin-reverse"
            style={{ transformOrigin: `${CX}px ${FIG_Y}px` }}
          />
          <circle
            cx={CX} cy={FIG_Y}
            r={42}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={0.8}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${CX}px ${FIG_Y}px` }}
          />

          {/* ── Anonymous silhouette (head + shoulders) ── */}
          {/* Head */}
          <circle
            cx={CX} cy={FIG_Y - 18}
            r={16}
            fill="none"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={1.8}
          />
          {/* Shoulders */}
          <path
            d={`M${CX - 28},${FIG_Y + 18} Q${CX - 28},${FIG_Y + 2} ${CX - 12},${FIG_Y} Q${CX},${FIG_Y - 1} ${CX + 12},${FIG_Y} Q${CX + 28},${FIG_Y + 2} ${CX + 28},${FIG_Y + 18}`}
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
          {/* Question mark inside head */}
          <text
            x={CX} y={FIG_Y - 12}
            textAnchor="middle"
            fill="rgba(223,255,0,0.7)"
            fontSize="18"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="700"
          >
            ?
          </text>

          {/* ── Connecting lines from figure to question cards ── */}
          {QUESTIONS.map((q) => (
            <line
              key={`line-${q.id}`}
              x1={CX} y1={FIG_Y}
              x2={q.x} y2={q.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.8}
              strokeDasharray="4 4"
              className="core-connection-line"
              style={{ animationDelay: '0.4s' }}
            />
          ))}

          {/* ── Question cards ── */}
          {QUESTIONS.map((q) => {
            const cardW = 120
            const cardH = 36
            const rx = q.x - cardW / 2
            const ry = q.y - cardH / 2
            return (
              <g
                key={q.id}
                className={`process-item-enter ${q.float}`}
                style={{ animationDelay: q.delay, transformOrigin: `${q.x}px ${q.y}px` }}
              >
                <rect
                  x={rx} y={ry}
                  width={cardW} height={cardH}
                  rx={6}
                  fill="rgba(255,255,255,0.08)"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth={0.8}
                />
                {/* Accent dot */}
                <circle
                  cx={rx + 10} cy={q.y}
                  r={2.5}
                  fill="rgba(223,255,0,0.6)"
                />
                <text
                  x={rx + 18} y={q.y + 5}
                  fill="rgba(255,255,255,0.85)"
                  fontSize="12"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="600"
                >
                  {q.text}
                </text>
              </g>
            )
          })}

          {/* ── "ANONYMOUS USER" label ── */}
          <text
            x={CX} y={FIG_Y + 50}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.12em"
          >
            ANONYMOUS USER
          </text>

          {/* ── Divider ── */}
          <line
            x1={BAR_X} y1={BAR_Y - 40}
            x2={BAR_X + BAR_W} y2={BAR_Y - 40}
            stroke="rgba(255,255,255,0.1)" strokeWidth={0.5}
          />

          {/* ── Trust timeline bar ── */}
          <text
            x={CX} y={BAR_Y - 20}
            textAnchor="middle"
            fill="rgba(223,255,0,0.6)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.12em"
          >
            TRUST WINDOW
          </text>

          {/* Timeline track */}
          <rect
            x={BAR_X} y={BAR_Y}
            width={BAR_W} height={6}
            rx={3}
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={0.5}
          />
          {/* Critical zone highlight (first ~20% of bar) */}
          <rect
            x={BAR_X} y={BAR_Y}
            width={BAR_W * 0.2} height={6}
            rx={3}
            fill="rgba(223,255,0,0.25)"
          />
          {/* Position marker */}
          <circle
            cx={BAR_X + BAR_W * 0.15} cy={BAR_Y + 3}
            r={5}
            fill="rgba(223,255,0,0.8)"
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${BAR_X + BAR_W * 0.15}px ${BAR_Y + 3}px` }}
          />

          {/* Timeline labels */}
          <text
            x={BAR_X} y={BAR_Y + 22}
            fill="rgba(255,255,255,0.45)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
          >
            0s
          </text>
          <text
            x={BAR_X + BAR_W * 0.2} y={BAR_Y + 22}
            textAnchor="middle"
            fill="rgba(223,255,0,0.55)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
            fontWeight="600"
          >
            30s
          </text>
          <text
            x={BAR_X + BAR_W} y={BAR_Y + 22}
            textAnchor="end"
            fill="rgba(255,255,255,0.35)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
          >
            5min
          </text>

          {/* Arrow annotation pointing at critical zone */}
          <text
            x={BAR_X + BAR_W * 0.15} y={BAR_Y + 42}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
            fontStyle="italic"
          >
            trust must land here
          </text>

          {/* ── "not zk mechanics" badge ── */}
          <g
            className="process-item-enter"
            style={{ animationDelay: '400ms' }}
          >
            <rect
              x={CX - 55} y={BAR_Y + 58}
              width={110} height={28}
              rx={14}
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth={0.6}
            />
            <text
              x={CX} y={BAR_Y + 76}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="12"
              fontFamily="'JetBrains Mono', monospace"
              textDecoration="line-through"
            >
              zk mechanics
            </text>
          </g>

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
