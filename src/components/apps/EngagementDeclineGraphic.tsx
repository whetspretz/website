// Chart area constants
const MARGIN = { top: 30, right: 25, bottom: 40, left: 50 }
const W = 340
const H = 280
const PLOT_W = W - MARGIN.left - MARGIN.right
const PLOT_H = H - MARGIN.top - MARGIN.bottom

// Data points — engagement declining over 4 weeks
const DATA = [
  { week: 1, pct: 92 },
  { week: 2, pct: 58 },
  { week: 3, pct: 31 },
  { week: 4, pct: 14 },
]

function x(week: number): number {
  return MARGIN.left + ((week - 1) / 3) * PLOT_W
}

function y(pct: number): number {
  return MARGIN.top + (1 - pct / 100) * PLOT_H
}

// Build a smooth cubic Bézier path through the data points
function buildCurvePath(): string {
  const pts = DATA.map(d => ({ x: x(d.week), y: y(d.pct) }))
  let path = `M ${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cpx = (prev.x + curr.x) / 2
    path += ` C ${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`
  }
  return path
}

// Build area path (curve + bottom edge closed)
function buildAreaPath(): string {
  const curve = buildCurvePath()
  const lastPt = DATA[DATA.length - 1]
  const firstPt = DATA[0]
  return `${curve} L ${x(lastPt.week)},${y(0)} L ${x(firstPt.week)},${y(0)} Z`
}

const CURVE_PATH = buildCurvePath()
const AREA_PATH = buildAreaPath()
// Approximate total path length for stroke-dashoffset animation
const PATH_LENGTH = 400

const Y_TICKS = [0, 25, 50, 75, 100]

export function EngagementDeclineGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        style={{ maxWidth: W, maxHeight: H }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradient for the area fill under the curve */}
          <linearGradient id="eng-area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(223,255,0,0.15)" />
            <stop offset="100%" stopColor="rgba(223,255,0,0)" />
          </linearGradient>

          {/* Gradient along the line from accent to dim */}
          <linearGradient id="eng-line-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(223,255,0,0.9)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
          </linearGradient>
        </defs>

        {/* Corner brackets */}
        <g stroke="rgba(255,255,255,0.2)" strokeWidth={1} fill="none">
          <polyline points="12,24 12,12 24,12" />
          <polyline points={`${W - 12},${H - 24} ${W - 12},${H - 12} ${W - 24},${H - 12}`} />
        </g>

        {/* Y-axis grid lines */}
        {Y_TICKS.map(tick => (
          <line
            key={tick}
            x1={MARGIN.left}
            y1={y(tick)}
            x2={MARGIN.left + PLOT_W}
            y2={y(tick)}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.5}
          />
        ))}

        {/* Y-axis labels */}
        {Y_TICKS.filter(t => t > 0).map(tick => (
          <text
            key={tick}
            x={MARGIN.left - 8}
            y={y(tick) + 3}
            textAnchor="end"
            fill="rgba(255,255,255,0.35)"
            style={{ fontSize: '8px', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {tick}%
          </text>
        ))}

        {/* X-axis labels */}
        {DATA.map(d => (
          <text
            key={d.week}
            x={x(d.week)}
            y={H - MARGIN.bottom + 20}
            textAnchor="middle"
            fill="rgba(255,255,255,0.35)"
            style={{ fontSize: '8px', fontFamily: "'JetBrains Mono', monospace" }}
          >
            WK {d.week}
          </text>
        ))}

        {/* Area fill under curve */}
        <path
          d={AREA_PATH}
          fill="url(#eng-area-grad)"
          className="engagement-area-fade"
        />

        {/* Main declining curve — animated draw-in */}
        <path
          d={CURVE_PATH}
          fill="none"
          stroke="url(#eng-line-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={PATH_LENGTH}
          strokeDashoffset={PATH_LENGTH}
          className="engagement-draw-line"
        />

        {/* Data points */}
        {DATA.map((d, i) => (
          <g
            key={d.week}
            className={`overwhelmed-float-${(i % 3) + 1}`}
            style={{ transformOrigin: `${x(d.week)}px ${y(d.pct)}px` }}
          >
            {/* Outer ring */}
            <circle
              cx={x(d.week)}
              cy={y(d.pct)}
              r={5}
              fill="none"
              stroke={i === DATA.length - 1 ? 'rgba(255,255,255,0.5)' : 'rgba(223,255,0,0.5)'}
              strokeWidth={1}
            />
            {/* Inner dot */}
            <circle
              cx={x(d.week)}
              cy={y(d.pct)}
              r={2}
              fill={i === DATA.length - 1 ? 'rgba(255,255,255,0.6)' : 'rgba(223,255,0,0.7)'}
            />
          </g>
        ))}

        {/* Pulsing ring on last (lowest) data point */}
        <circle
          cx={x(DATA[DATA.length - 1].week)}
          cy={y(DATA[DATA.length - 1].pct)}
          r={10}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={0.8}
          className="overwhelmed-pulse"
          style={{
            transformOrigin: `${x(DATA[DATA.length - 1].week)}px ${y(DATA[DATA.length - 1].pct)}px`,
          }}
        />

        {/* Downward arrow at lowest point */}
        <g opacity={0.35}>
          <line
            x1={x(4)}
            y1={y(DATA[DATA.length - 1].pct) + 16}
            x2={x(4)}
            y2={y(DATA[DATA.length - 1].pct) + 28}
            stroke="rgba(255,255,255,1)"
            strokeWidth={1}
            strokeLinecap="round"
          />
          <polyline
            points={`${x(4) - 4},${y(DATA[DATA.length - 1].pct) + 24} ${x(4)},${y(DATA[DATA.length - 1].pct) + 28} ${x(4) + 4},${y(DATA[DATA.length - 1].pct) + 24}`}
            fill="none"
            stroke="rgba(255,255,255,1)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Y-axis title */}
        <text
          x={14}
          y={MARGIN.top + PLOT_H / 2}
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          style={{
            fontSize: '7px',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.14em',
          }}
          transform={`rotate(-90, 14, ${MARGIN.top + PLOT_H / 2})`}
        >
          ENGAGEMENT
        </text>

        {/* Accent label */}
        <text
          x={MARGIN.left}
          y={H - 6}
          fill="rgba(223,255,0,0.4)"
          style={{
            fontSize: '7px',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.12em',
          }}
        >
          FIRST 30 DAYS
        </text>
      </svg>
    </div>
  )
}
