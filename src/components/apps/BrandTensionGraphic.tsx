// Animated "Brand Tension" graphic for Ketl case study
// Visual: two opposing brand forces (cryptic vs credible) with ketl balanced in the narrow center
// Portrait viewBox to match the split-slide-image panel (50% width, full height)

const SVG_W = 340
const SVG_H = 540
const CX = SVG_W / 2

// Nodes stacked vertically — left/right of center
const LEFT_X = CX - 72
const RIGHT_X = CX + 72
const NODE_Y = 110
const NODE_W = 120
const NODE_H = 100

// Center tension bar
const TENSION_Y = 280
const BAR_W = 280
const BAR_X = CX - BAR_W / 2

// Danger zones
const DANGER_Y = 390
const DANGER_W = 130
const DANGER_H = 54

export function BrandTensionGraphic(): React.JSX.Element {
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
            y={32}
            textAnchor="middle"
            fill="rgba(255,255,255,0.65)"
            fontSize="16"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.18em"
          >
            BRAND TENSION
          </text>

          {/* ── Background spinning ring ── */}
          <circle
            cx={CX}
            cy={TENSION_Y}
            r={150}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={0.8}
            strokeDasharray="6 4"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${TENSION_Y}px` }}
          />

          {/* ── LEFT NODE: CRYPTIC ── */}
          <g
            className="process-item-enter overwhelmed-float-1"
            style={{ animationDelay: '100ms', transformOrigin: `${LEFT_X}px ${NODE_Y}px` }}
          >
            {/* Node card */}
            <rect
              x={LEFT_X - NODE_W / 2}
              y={NODE_Y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={6}
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1.4}
            />
            {/* Left accent bar */}
            <rect
              x={LEFT_X - NODE_W / 2}
              y={NODE_Y - NODE_H / 2}
              width={4}
              height={NODE_H}
              rx={2}
              fill="rgba(251,113,133,0.6)"
            />

            {/* Eye/mask icon — secret society */}
            <g style={{ transformOrigin: `${LEFT_X}px ${NODE_Y - 12}px` }} className="process-icon-pulse">
              <ellipse
                cx={LEFT_X}
                cy={NODE_Y - 12}
                rx={20}
                ry={12}
                fill="none"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={1.6}
              />
              <circle cx={LEFT_X} cy={NODE_Y - 12} r={6} fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.55)" strokeWidth={1.4} />
              <circle cx={LEFT_X} cy={NODE_Y - 12} r={2.5} fill="rgba(255,255,255,0.7)" />
              {/* Eyelash rays */}
              <line x1={LEFT_X - 18} y1={NODE_Y - 20} x2={LEFT_X - 22} y2={NODE_Y - 28} stroke="rgba(255,255,255,0.4)" strokeWidth={1.2} strokeLinecap="round" />
              <line x1={LEFT_X} y1={NODE_Y - 24} x2={LEFT_X} y2={NODE_Y - 32} stroke="rgba(255,255,255,0.4)" strokeWidth={1.2} strokeLinecap="round" />
              <line x1={LEFT_X + 18} y1={NODE_Y - 20} x2={LEFT_X + 22} y2={NODE_Y - 28} stroke="rgba(255,255,255,0.4)" strokeWidth={1.2} strokeLinecap="round" />
            </g>

            {/* Label */}
            <text
              x={LEFT_X}
              y={NODE_Y + 20}
              textAnchor="middle"
              fill="rgba(255,255,255,0.95)"
              fontSize="18"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.1em"
            >
              CRYPTIC
            </text>
            {/* Sub-label */}
            <text
              x={LEFT_X}
              y={NODE_Y + 40}
              textAnchor="middle"
              fill="rgba(255,255,255,0.55)"
              fontSize="12"
              fontFamily="'JetBrains Mono', monospace"
            >
              secret society
            </text>
          </g>

          {/* ── RIGHT NODE: CREDIBLE ── */}
          <g
            className="process-item-enter overwhelmed-float-2"
            style={{ animationDelay: '200ms', transformOrigin: `${RIGHT_X}px ${NODE_Y}px` }}
          >
            {/* Node card */}
            <rect
              x={RIGHT_X - NODE_W / 2}
              y={NODE_Y - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx={6}
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1.4}
            />
            {/* Right accent bar */}
            <rect
              x={RIGHT_X + NODE_W / 2 - 4}
              y={NODE_Y - NODE_H / 2}
              width={4}
              height={NODE_H}
              rx={2}
              fill="rgba(96,165,250,0.6)"
            />

            {/* Shield/check icon — trust */}
            <g style={{ transformOrigin: `${RIGHT_X}px ${NODE_Y - 10}px` }} className="process-icon-pulse">
              <path
                d={`M${RIGHT_X},${NODE_Y - 32} L${RIGHT_X + 18},${NODE_Y - 22} L${RIGHT_X + 18},${NODE_Y - 4} Q${RIGHT_X + 18},${NODE_Y + 6} ${RIGHT_X},${NODE_Y + 8} Q${RIGHT_X - 18},${NODE_Y + 6} ${RIGHT_X - 18},${NODE_Y - 4} L${RIGHT_X - 18},${NODE_Y - 22} Z`}
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth={1.6}
              />
              {/* Checkmark */}
              <path
                d={`M${RIGHT_X - 8},${NODE_Y - 12} L${RIGHT_X - 2},${NODE_Y - 5} L${RIGHT_X + 10},${NODE_Y - 22}`}
                fill="none"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Label */}
            <text
              x={RIGHT_X}
              y={NODE_Y + 20}
              textAnchor="middle"
              fill="rgba(255,255,255,0.95)"
              fontSize="18"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.1em"
            >
              CREDIBLE
            </text>
            {/* Sub-label */}
            <text
              x={RIGHT_X}
              y={NODE_Y + 40}
              textAnchor="middle"
              fill="rgba(255,255,255,0.55)"
              fontSize="12"
              fontFamily="'JetBrains Mono', monospace"
            >
              trust instantly
            </text>
          </g>

          {/* ── Connection lines: nodes → center diamond ── */}
          <line
            x1={LEFT_X}
            y1={NODE_Y + NODE_H / 2 + 4}
            x2={CX - 16}
            y2={TENSION_Y - 28}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.2}
            strokeDasharray="5 4"
            className="core-connection-line"
            style={{ animationDelay: '0.3s' }}
          />
          <line
            x1={RIGHT_X}
            y1={NODE_Y + NODE_H / 2 + 4}
            x2={CX + 16}
            y2={TENSION_Y - 28}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.2}
            strokeDasharray="5 4"
            className="core-connection-line"
            style={{ animationDelay: '0.5s' }}
          />

          {/* Midpoint accent dots */}
          <circle
            cx={(LEFT_X + CX - 16) / 2}
            cy={(NODE_Y + NODE_H / 2 + 4 + TENSION_Y - 28) / 2}
            r={3}
            fill="#dfff00"
            fillOpacity={0.6}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${(LEFT_X + CX - 16) / 2}px ${(NODE_Y + NODE_H / 2 + 4 + TENSION_Y - 28) / 2}px` }}
          />
          <circle
            cx={(RIGHT_X + CX + 16) / 2}
            cy={(NODE_Y + NODE_H / 2 + 4 + TENSION_Y - 28) / 2}
            r={3}
            fill="#dfff00"
            fillOpacity={0.6}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${(RIGHT_X + CX + 16) / 2}px ${(NODE_Y + NODE_H / 2 + 4 + TENSION_Y - 28) / 2}px`, animationDelay: '0.5s' }}
          />

          {/* ── Horizontal tension spectrum bar ── */}
          <g className="process-item-enter" style={{ animationDelay: '400ms' }}>
            {/* Bar track */}
            <rect
              x={BAR_X}
              y={TENSION_Y - 5}
              width={BAR_W}
              height={10}
              rx={5}
              fill="rgba(255,255,255,0.12)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth={1}
            />

            {/* Left danger gradient (red) */}
            <rect
              x={BAR_X}
              y={TENSION_Y - 5}
              width={70}
              height={10}
              rx={5}
              fill="rgba(251,113,133,0.25)"
            />

            {/* Right danger gradient (blue) */}
            <rect
              x={BAR_X + BAR_W - 70}
              y={TENSION_Y - 5}
              width={70}
              height={10}
              rx={5}
              fill="rgba(96,165,250,0.25)"
            />

            {/* Center sweet spot glow */}
            <rect
              x={CX - 35}
              y={TENSION_Y - 5}
              width={70}
              height={10}
              rx={5}
              fill="rgba(223,255,0,0.3)"
            />

            {/* Pull arrows — left */}
            {[0, 1, 2].map(i => (
              <path
                key={`arrow-l-${i}`}
                d={`M${BAR_X + 14 + i * 18},${TENSION_Y - 14} L${BAR_X + 6 + i * 18},${TENSION_Y} L${BAR_X + 14 + i * 18},${TENSION_Y + 14}`}
                fill="none"
                stroke="rgba(251,113,133,0.4)"
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            ))}

            {/* Pull arrows — right */}
            {[0, 1, 2].map(i => (
              <path
                key={`arrow-r-${i}`}
                d={`M${BAR_X + BAR_W - 14 - i * 18},${TENSION_Y - 14} L${BAR_X + BAR_W - 6 - i * 18},${TENSION_Y} L${BAR_X + BAR_W - 14 - i * 18},${TENSION_Y + 14}`}
                fill="none"
                stroke="rgba(96,165,250,0.4)"
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            ))}

            {/* Endpoint labels */}
            <text
              x={BAR_X + 6}
              y={TENSION_Y + 28}
              textAnchor="start"
              fill="rgba(251,113,133,0.8)"
              fontSize="12"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
            >
              MYSTERY
            </text>
            <text
              x={BAR_X + BAR_W - 6}
              y={TENSION_Y + 28}
              textAnchor="end"
              fill="rgba(96,165,250,0.8)"
              fontSize="12"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
            >
              CLARITY
            </text>
          </g>

          {/* ── Center diamond marker (ketl sweet spot) ── */}
          <g className="process-item-enter" style={{ animationDelay: '600ms' }}>
            {/* Outer pulse ring */}
            <circle
              cx={CX}
              cy={TENSION_Y}
              r={28}
              fill="none"
              stroke="#dfff00"
              strokeWidth={1.2}
              strokeOpacity={0.5}
              className="overwhelmed-pulse"
              style={{ transformOrigin: `${CX}px ${TENSION_Y}px` }}
            />

            {/* Inner spinning ring */}
            <circle
              cx={CX}
              cy={TENSION_Y}
              r={20}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1}
              strokeDasharray="3 4"
              className="overwhelmed-spin-slow"
              style={{ transformOrigin: `${CX}px ${TENSION_Y}px` }}
            />

            {/* Diamond */}
            <g
              style={{ transformOrigin: `${CX}px ${TENSION_Y}px` }}
              className="process-icon-pulse"
            >
              <path
                d={`M${CX},${TENSION_Y - 14} L${CX + 14},${TENSION_Y} L${CX},${TENSION_Y + 14} L${CX - 14},${TENSION_Y} Z`}
                fill="rgba(223,255,0,0.2)"
                stroke="#dfff00"
                strokeWidth={1.8}
                strokeOpacity={0.85}
              />
            </g>

            {/* "ketl" label */}
            <text
              x={CX}
              y={TENSION_Y + 52}
              textAnchor="middle"
              fill="#dfff00"
              fillOpacity={0.85}
              fontSize="22"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.14em"
            >
              ketl
            </text>
          </g>

          {/* ── Danger Zone Cards ── */}

          {/* Left: Too Mysterious */}
          <g
            className="process-item-enter overwhelmed-float-3"
            style={{ animationDelay: '800ms', transformOrigin: `${CX - 80}px ${DANGER_Y + DANGER_H / 2}px` }}
          >
            <rect
              x={CX - 80 - DANGER_W / 2}
              y={DANGER_Y}
              width={DANGER_W}
              height={DANGER_H}
              rx={5}
              fill="rgba(251,113,133,0.1)"
              stroke="rgba(251,113,133,0.45)"
              strokeWidth={1.2}
            />
            {/* X icon */}
            <g>
              <line
                x1={CX - 80 - DANGER_W / 2 + 14}
                y1={DANGER_Y + 15}
                x2={CX - 80 - DANGER_W / 2 + 24}
                y2={DANGER_Y + 25}
                stroke="rgba(251,113,133,0.7)"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <line
                x1={CX - 80 - DANGER_W / 2 + 24}
                y1={DANGER_Y + 15}
                x2={CX - 80 - DANGER_W / 2 + 14}
                y2={DANGER_Y + 25}
                stroke="rgba(251,113,133,0.7)"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </g>
            <text
              x={CX - 80 + 6}
              y={DANGER_Y + 22}
              textAnchor="middle"
              fill="rgba(255,255,255,0.8)"
              fontSize="13"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
            >
              Too mysterious
            </text>
            <text
              x={CX - 80 + 6}
              y={DANGER_Y + 42}
              textAnchor="middle"
              fill="rgba(251,113,133,0.8)"
              fontSize="12"
              fontFamily="'JetBrains Mono', monospace"
              fontStyle="italic"
            >
              crypto theater
            </text>
          </g>

          {/* Right: Too Clear */}
          <g
            className="process-item-enter overwhelmed-float-1"
            style={{ animationDelay: '900ms', transformOrigin: `${CX + 80}px ${DANGER_Y + DANGER_H / 2}px` }}
          >
            <rect
              x={CX + 80 - DANGER_W / 2}
              y={DANGER_Y}
              width={DANGER_W}
              height={DANGER_H}
              rx={5}
              fill="rgba(96,165,250,0.1)"
              stroke="rgba(96,165,250,0.45)"
              strokeWidth={1.2}
            />
            {/* X icon */}
            <g>
              <line
                x1={CX + 80 - DANGER_W / 2 + 14}
                y1={DANGER_Y + 15}
                x2={CX + 80 - DANGER_W / 2 + 24}
                y2={DANGER_Y + 25}
                stroke="rgba(96,165,250,0.7)"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
              <line
                x1={CX + 80 - DANGER_W / 2 + 24}
                y1={DANGER_Y + 15}
                x2={CX + 80 - DANGER_W / 2 + 14}
                y2={DANGER_Y + 25}
                stroke="rgba(96,165,250,0.7)"
                strokeWidth={1.8}
                strokeLinecap="round"
              />
            </g>
            <text
              x={CX + 80 + 6}
              y={DANGER_Y + 22}
              textAnchor="middle"
              fill="rgba(255,255,255,0.8)"
              fontSize="13"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
            >
              Too clear
            </text>
            <text
              x={CX + 80 + 6}
              y={DANGER_Y + 42}
              textAnchor="middle"
              fill="rgba(96,165,250,0.8)"
              fontSize="12"
              fontFamily="'JetBrains Mono', monospace"
              fontStyle="italic"
            >
              LinkedIn
            </text>
          </g>

          {/* ── Dashed lines from bar to danger zones ── */}
          <line
            x1={BAR_X + 35}
            y1={TENSION_Y + 10}
            x2={CX - 80}
            y2={DANGER_Y - 4}
            stroke="rgba(251,113,133,0.35)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />
          <line
            x1={BAR_X + BAR_W - 35}
            y1={TENSION_Y + 10}
            x2={CX + 80}
            y2={DANGER_Y - 4}
            stroke="rgba(96,165,250,0.35)"
            strokeWidth={1}
            strokeDasharray="4 4"
          />

          {/* ── Floating accent particles ── */}
          {[
            { x: 20, y: 55, r: 3, o: 0.5, cls: 'overwhelmed-float-1' },
            { x: 320, y: 65, r: 2.5, o: 0.45, cls: 'overwhelmed-float-2' },
            { x: 25, y: 460, r: 2.5, o: 0.5, cls: 'overwhelmed-float-3' },
            { x: 315, y: 470, r: 3, o: 0.5, cls: 'overwhelmed-float-1' },
          ].map((p, i) => (
            <circle
              key={`particle-${i}`}
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill={`rgba(223,255,0,${p.o})`}
              className={p.cls}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
            />
          ))}

          {/* ── Bottom label ── */}
          <text
            x={CX}
            y={SVG_H - 30}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="11"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            THE NARROW SPACE BETWEEN
          </text>
        </svg>
      </div>
    </div>
  )
}
