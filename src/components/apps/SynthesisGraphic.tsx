const CX = 200
const CY = 200

// Input node positions
const TASTE_X = 80
const COMMUNITY_X = 200
const MOOD_X = 320
const INPUT_Y = 75

// Synthesis point
const SYNTH_Y = 240

// Pentagon points for taste radar
function pentagonPts(cx: number, cy: number, r: number): string {
  return Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')
}

// Inner radar points (varying radii for data visualization)
function radarDataPts(cx: number, cy: number, r: number): string {
  const ratios = [0.9, 0.5, 0.7, 0.6, 0.85]
  return Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
    const dr = r * ratios[i]
    return `${cx + dr * Math.cos(angle)},${cy + dr * Math.sin(angle)}`
  }).join(' ')
}

// Sine wave path
function sineWavePath(cx: number, cy: number, width: number): string {
  const steps = 20
  const halfW = width / 2
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = cx - halfW + t * width
    const y = cy + Math.sin(t * Math.PI * 3) * 8
    pts.push(`${i === 0 ? 'M' : 'L'}${x},${y}`)
  }
  return pts.join(' ')
}

export function SynthesisGraphic(): React.JSX.Element {
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
          cx={CX} cy={CY} r={90}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={0.6}
          strokeDasharray="4 6"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* ====== Convergence lines (input → synthesis) ====== */}
        {/* Taste → center */}
        <path
          d={`M ${TASTE_X},${INPUT_Y + 30} Q ${TASTE_X + 40},${SYNTH_Y - 30} ${CX},${SYNTH_Y}`}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={0.8}
          strokeDasharray="4 4"
        />
        {/* Community → center */}
        <line
          x1={COMMUNITY_X} y1={INPUT_Y + 30}
          x2={CX} y2={SYNTH_Y}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={0.8}
          strokeDasharray="4 4"
        />
        {/* Mood → center */}
        <path
          d={`M ${MOOD_X},${INPUT_Y + 30} Q ${MOOD_X - 40},${SYNTH_Y - 30} ${CX},${SYNTH_Y}`}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={0.8}
          strokeDasharray="4 4"
        />

        {/* Synthesis → output card */}
        <line
          x1={CX} y1={SYNTH_Y + 20}
          x2={CX} y2={295}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={0.8}
          strokeDasharray="3 4"
        />

        {/* ====== Traveling particles along convergence lines ====== */}
        {/* Left path particles */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${SYNTH_Y - 40}px` }}
        >
          <circle cx={TASTE_X + 30} cy={INPUT_Y + 60} r={2} fill="rgba(223,255,0,0.5)" />
        </g>
        {/* Center path particles */}
        <g
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${(INPUT_Y + SYNTH_Y) / 2}px` }}
        >
          <circle cx={CX} cy={(INPUT_Y + SYNTH_Y) / 2} r={2} fill="rgba(223,255,0,0.5)" />
        </g>
        {/* Right path particles */}
        <g
          className="process-icon-spin-reverse"
          style={{ transformOrigin: `${CX}px ${SYNTH_Y - 40}px` }}
        >
          <circle cx={MOOD_X - 30} cy={INPUT_Y + 60} r={2} fill="rgba(223,255,0,0.5)" />
        </g>

        {/* ====== INPUT 1: TASTE (radar chart) ====== */}
        <g
          className="overwhelmed-float-1"
          style={{ transformOrigin: `${TASTE_X}px ${INPUT_Y}px` }}
        >
          {/* Outer pentagon */}
          <polygon
            points={pentagonPts(TASTE_X, INPUT_Y, 22)}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={0.8}
          />
          {/* Inner data polygon */}
          <polygon
            points={radarDataPts(TASTE_X, INPUT_Y, 22)}
            fill="rgba(255,255,255,0.1)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={0.5}
          />
          {/* Center dot */}
          <circle cx={TASTE_X} cy={INPUT_Y} r={1.5} fill="rgba(255,255,255,0.4)" />
          {/* Axis lines */}
          {Array.from({ length: 5 }, (_, i) => {
            const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
            return (
              <line
                key={`taste-axis-${i}`}
                x1={TASTE_X} y1={INPUT_Y}
                x2={TASTE_X + 22 * Math.cos(angle)} y2={INPUT_Y + 22 * Math.sin(angle)}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth={0.4}
              />
            )
          })}
          {/* Label */}
          <text
            x={TASTE_X} y={INPUT_Y + 35}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            TASTE
          </text>
        </g>

        {/* ====== INPUT 2: COMMUNITY (social graph) ====== */}
        <g
          className="overwhelmed-float-2"
          style={{ transformOrigin: `${COMMUNITY_X}px ${INPUT_Y}px` }}
        >
          {/* Three nodes in triangle */}
          <circle cx={COMMUNITY_X} cy={INPUT_Y - 14} r={5} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />
          <circle cx={COMMUNITY_X} cy={INPUT_Y - 14} r={2} fill="rgba(255,255,255,0.35)" />

          <circle cx={COMMUNITY_X - 14} cy={INPUT_Y + 10} r={4.5} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />
          <circle cx={COMMUNITY_X - 14} cy={INPUT_Y + 10} r={1.8} fill="rgba(255,255,255,0.35)" />

          <circle cx={COMMUNITY_X + 14} cy={INPUT_Y + 10} r={4.5} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={0.8} />
          <circle cx={COMMUNITY_X + 14} cy={INPUT_Y + 10} r={1.8} fill="rgba(255,255,255,0.35)" />

          {/* Connection lines */}
          <line x1={COMMUNITY_X} y1={INPUT_Y - 9} x2={COMMUNITY_X - 10} y2={INPUT_Y + 6} stroke="rgba(255,255,255,0.3)" strokeWidth={0.6} />
          <line x1={COMMUNITY_X} y1={INPUT_Y - 9} x2={COMMUNITY_X + 10} y2={INPUT_Y + 6} stroke="rgba(255,255,255,0.3)" strokeWidth={0.6} />
          <line x1={COMMUNITY_X - 10} y1={INPUT_Y + 10} x2={COMMUNITY_X + 10} y2={INPUT_Y + 10} stroke="rgba(255,255,255,0.3)" strokeWidth={0.6} />

          {/* Label */}
          <text
            x={COMMUNITY_X} y={INPUT_Y + 35}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            COMMUNITY
          </text>
        </g>

        {/* ====== INPUT 3: MOOD (sine wave) ====== */}
        <g
          className="overwhelmed-float-3"
          style={{ transformOrigin: `${MOOD_X}px ${INPUT_Y}px` }}
        >
          <path
            d={sineWavePath(MOOD_X, INPUT_Y, 44)}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1}
            strokeLinecap="round"
          />
          {/* Glow dot on wave peak */}
          <circle cx={MOOD_X - 7} cy={INPUT_Y - 7} r={2.5} fill="rgba(255,255,255,0.3)" />

          {/* Label */}
          <text
            x={MOOD_X} y={INPUT_Y + 35}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            MOOD
          </text>
        </g>

        {/* ====== CENTRAL SYNTHESIS NODE ====== */}
        {/* Outer spinning ring */}
        <circle
          cx={CX} cy={SYNTH_Y} r={28}
          fill="none"
          stroke="rgba(223,255,0,0.2)"
          strokeWidth={0.6}
          strokeDasharray="3 4"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${SYNTH_Y}px` }}
        />
        {/* Main glow circle */}
        <circle
          cx={CX} cy={SYNTH_Y} r={18}
          fill="rgba(223,255,0,0.08)"
          stroke="rgba(223,255,0,0.5)"
          strokeWidth={1.2}
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${SYNTH_Y}px` }}
        />
        {/* 4-point sparkle inside */}
        <line x1={CX} y1={SYNTH_Y - 8} x2={CX} y2={SYNTH_Y + 8} stroke="rgba(223,255,0,0.4)" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={CX - 8} y1={SYNTH_Y} x2={CX + 8} y2={SYNTH_Y} stroke="rgba(223,255,0,0.4)" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={CX - 5} y1={SYNTH_Y - 5} x2={CX + 5} y2={SYNTH_Y + 5} stroke="rgba(223,255,0,0.25)" strokeWidth={0.5} strokeLinecap="round" />
        <line x1={CX + 5} y1={SYNTH_Y - 5} x2={CX - 5} y2={SYNTH_Y + 5} stroke="rgba(223,255,0,0.25)" strokeWidth={0.5} strokeLinecap="round" />

        {/* ====== OUTPUT: STRUCTURED VIEW CARD ====== */}
        <g>
          {/* Card outline */}
          <rect
            x={CX - 50} y={300}
            width={100} height={55}
            rx={4}
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={0.8}
          />
          {/* Glow border */}
          <rect
            x={CX - 53} y={297}
            width={106} height={61}
            rx={6}
            fill="none"
            stroke="rgba(223,255,0,0.15)"
            strokeWidth={0.6}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${CX}px 327px` }}
          />

          {/* Data bars inside card */}
          {/* Bar 1 - taste */}
          <rect x={CX - 38} y={312} width={42} height={4} rx={1} fill="rgba(255,255,255,0.25)" />
          {/* Bar 2 - community (highlighted) */}
          <rect x={CX - 38} y={322} width={56} height={4} rx={1} fill="rgba(223,255,0,0.3)" />
          {/* Bar 3 - mood */}
          <rect x={CX - 38} y={332} width={34} height={4} rx={1} fill="rgba(255,255,255,0.25)" />

          {/* Small icon dots on the right of bars */}
          <circle cx={CX + 30} cy={314} r={2} fill="rgba(255,255,255,0.25)" />
          <circle cx={CX + 30} cy={324} r={2} fill="rgba(223,255,0,0.35)" />
          <circle cx={CX + 30} cy={334} r={2} fill="rgba(255,255,255,0.25)" />

          {/* Label */}
          <text
            x={CX} y={375}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
          >
            STRUCTURED VIEW
          </text>
        </g>

        {/* ====== Orbiting particles ====== */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX + 160} cy={CY} r={2} fill="rgba(223,255,0,0.5)" />
          <circle cx={CX + 160} cy={CY} r={4} fill="none" stroke="rgba(223,255,0,0.2)" strokeWidth={0.5} />
          <circle cx={CX - 130} cy={CY + 50} r={1.5} fill="rgba(255,255,255,0.35)" />
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
