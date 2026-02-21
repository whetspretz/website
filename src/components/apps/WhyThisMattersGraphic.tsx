// Animated "Identity Prism" graphic for Ketl "Why This Matters" slide
// Visual: real identity flows through a zk prism and emerges anonymous but verified
// Portrait viewBox to match the split-slide-image panel (50% width, full height)

const SVG_W = 340
const SVG_H = 540
const CX = SVG_W / 2

// Layout zones
const HEADER_Y = 36
const IDENTITY_Y = 85
const PRISM_TIP_Y = 200
const PRISM_BASE_Y = 310
const PRISM_CY = (PRISM_TIP_Y + PRISM_BASE_Y) / 2
const PRISM_HALF_W = 70
const OUTPUT_Y = 400

// Particle flow config
const PARTICLES = [
  { x: CX - 14, startY: 140, endY: PRISM_TIP_Y - 8, delay: '0s', dur: '3s' },
  { x: CX, startY: 130, endY: PRISM_TIP_Y - 8, delay: '0.8s', dur: '3.2s' },
  { x: CX + 14, startY: 145, endY: PRISM_TIP_Y - 8, delay: '1.6s', dur: '2.8s' },
]

// Output particles (transformed — accent colored)
const OUTPUT_PARTICLES = [
  { x: CX - 18, startY: PRISM_BASE_Y + 10, endY: OUTPUT_Y - 30, delay: '0.4s', dur: '3s' },
  { x: CX, startY: PRISM_BASE_Y + 14, endY: OUTPUT_Y - 26, delay: '1.2s', dur: '3.4s' },
  { x: CX + 18, startY: PRISM_BASE_Y + 10, endY: OUTPUT_Y - 30, delay: '2s', dur: '2.8s' },
]

// Reputation indicators
const REP_ITEMS = [
  { x: CX - 50, y: OUTPUT_Y + 66, label: '\u2605', cls: 'overwhelmed-float-1' },
  { x: CX, y: OUTPUT_Y + 58, label: '\u2605\u2605', cls: 'overwhelmed-float-2' },
  { x: CX + 50, y: OUTPUT_Y + 66, label: '\u2605', cls: 'overwhelmed-float-3' },
]

export function WhyThisMattersGraphic(): React.JSX.Element {
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
          <defs>
            {/* Particle animation — falling down into prism */}
            {PARTICLES.map((p, i) => (
              <animateTransform
                key={`anim-in-${i}`}
                xlinkHref={`#particle-in-${i}`}
                attributeName="transform"
                type="translate"
                values={`0,0; 0,${p.endY - p.startY}; 0,0`}
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
              />
            ))}
            {/* Output particle animations */}
            {OUTPUT_PARTICLES.map((p, i) => (
              <animateTransform
                key={`anim-out-${i}`}
                xlinkHref={`#particle-out-${i}`}
                attributeName="transform"
                type="translate"
                values={`0,0; 0,${p.endY - p.startY}; 0,0`}
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
              />
            ))}
          </defs>

          {/* ── Header ── */}
          <text
            x={CX}
            y={HEADER_Y}
            textAnchor="middle"
            fill="rgba(255,255,255,0.65)"
            fontSize="14"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.18em"
          >
            IDENTITY PRISM
          </text>

          {/* ── Background orbital ring ── */}
          <circle
            cx={CX}
            cy={PRISM_CY}
            r={120}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={0.8}
            strokeDasharray="6 4"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${PRISM_CY}px` }}
          />
          <circle
            cx={CX}
            cy={PRISM_CY}
            r={95}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.6}
            strokeDasharray="3 6"
            className="overwhelmed-spin-reverse"
            style={{ transformOrigin: `${CX}px ${PRISM_CY}px` }}
          />

          {/* ═══════════ TOP ZONE: REAL IDENTITY ═══════════ */}
          <g className="process-item-enter" style={{ animationDelay: '100ms' }}>
            {/* Person silhouette — simple head + shoulders */}
            <circle
              cx={CX}
              cy={IDENTITY_Y - 10}
              r={14}
              fill="rgba(255,255,255,0.1)"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth={1.4}
            />
            <path
              d={`M${CX - 24},${IDENTITY_Y + 20} Q${CX - 24},${IDENTITY_Y + 4} ${CX},${IDENTITY_Y + 4} Q${CX + 24},${IDENTITY_Y + 4} ${CX + 24},${IDENTITY_Y + 20}`}
              fill="rgba(255,255,255,0.08)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1.4}
            />

            {/* Identity markers — name bar, company bar, role bar */}
            <rect x={CX + 30} y={IDENTITY_Y - 18} width={55} height={8} rx={2} fill="rgba(255,255,255,0.2)" />
            <rect x={CX + 30} y={IDENTITY_Y - 5} width={40} height={6} rx={2} fill="rgba(255,255,255,0.12)" />
            <rect x={CX + 30} y={IDENTITY_Y + 6} width={48} height={6} rx={2} fill="rgba(255,255,255,0.12)" />

            {/* Label */}
            <text
              x={CX}
              y={IDENTITY_Y + 38}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="12"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.15em"
            >
              REAL IDENTITY
            </text>
          </g>

          {/* ── Input particles (white, drifting into prism) ── */}
          {PARTICLES.map((p, i) => (
            <circle
              key={`pin-${i}`}
              id={`particle-in-${i}`}
              cx={p.x}
              cy={p.startY}
              r={2.5}
              fill="rgba(255,255,255,0.6)"
              opacity={0.8}
            >
              <animate
                attributeName="opacity"
                values="0.8;0.3;0.8"
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* ── Downward flow arrow ── */}
          <line
            x1={CX}
            y1={IDENTITY_Y + 48}
            x2={CX}
            y2={PRISM_TIP_Y - 16}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={1.2}
            strokeDasharray="4 4"
            className="core-connection-line"
            style={{ animationDelay: '0.3s' }}
          />
          {/* Arrow head */}
          <path
            d={`M${CX - 5},${PRISM_TIP_Y - 22} L${CX},${PRISM_TIP_Y - 14} L${CX + 5},${PRISM_TIP_Y - 22}`}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.2}
            strokeLinecap="round"
          />

          {/* ═══════════ MIDDLE ZONE: ZK PRISM ═══════════ */}
          <g className="process-item-enter" style={{ animationDelay: '300ms' }}>
            {/* Prism triangle (point up) */}
            <path
              d={`M${CX},${PRISM_TIP_Y} L${CX + PRISM_HALF_W},${PRISM_BASE_Y} L${CX - PRISM_HALF_W},${PRISM_BASE_Y} Z`}
              fill="rgba(223,255,0,0.06)"
              stroke="#dfff00"
              strokeWidth={1.8}
              strokeOpacity={0.65}
              strokeLinejoin="round"
            />

            {/* Inner glow triangle (smaller) */}
            <path
              d={`M${CX},${PRISM_TIP_Y + 28} L${CX + PRISM_HALF_W * 0.55},${PRISM_BASE_Y - 14} L${CX - PRISM_HALF_W * 0.55},${PRISM_BASE_Y - 14} Z`}
              fill="rgba(223,255,0,0.04)"
              stroke="rgba(223,255,0,0.3)"
              strokeWidth={1}
              strokeLinejoin="round"
            />

            {/* Eye in center of prism (Ketl logo nod) */}
            <g
              className="process-icon-pulse"
              style={{ transformOrigin: `${CX}px ${PRISM_CY + 12}px` }}
            >
              <ellipse
                cx={CX}
                cy={PRISM_CY + 12}
                rx={18}
                ry={10}
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1.4}
              />
              <circle
                cx={CX}
                cy={PRISM_CY + 12}
                r={5}
                fill="rgba(255,255,255,0.12)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth={1.2}
              />
              <circle
                cx={CX}
                cy={PRISM_CY + 12}
                r={2}
                fill="rgba(223,255,0,0.7)"
              />
            </g>

            {/* Pulse ring around prism */}
            <circle
              cx={CX}
              cy={PRISM_CY}
              r={PRISM_HALF_W + 18}
              fill="none"
              stroke="rgba(223,255,0,0.25)"
              strokeWidth={1}
              className="overwhelmed-pulse"
              style={{ transformOrigin: `${CX}px ${PRISM_CY}px` }}
            />

            {/* ZK TRANSFORM label */}
            <text
              x={CX}
              y={PRISM_BASE_Y + 22}
              textAnchor="middle"
              fill="rgba(223,255,0,0.7)"
              fontSize="12"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.15em"
            >
              ZK TRANSFORM
            </text>
          </g>

          {/* ── Downward flow arrow from prism ── */}
          <line
            x1={CX}
            y1={PRISM_BASE_Y + 32}
            x2={CX}
            y2={OUTPUT_Y - 34}
            stroke="rgba(223,255,0,0.3)"
            strokeWidth={1.2}
            strokeDasharray="4 4"
            className="core-connection-line"
            style={{ animationDelay: '0.6s' }}
          />
          {/* Arrow head (accent) */}
          <path
            d={`M${CX - 5},${OUTPUT_Y - 40} L${CX},${OUTPUT_Y - 32} L${CX + 5},${OUTPUT_Y - 40}`}
            fill="none"
            stroke="rgba(223,255,0,0.45)"
            strokeWidth={1.2}
            strokeLinecap="round"
          />

          {/* ── Output particles (accent colored, drifting down from prism) ── */}
          {OUTPUT_PARTICLES.map((p, i) => (
            <circle
              key={`pout-${i}`}
              id={`particle-out-${i}`}
              cx={p.x}
              cy={p.startY}
              r={2.5}
              fill="rgba(223,255,0,0.6)"
              opacity={0.7}
            >
              <animate
                attributeName="opacity"
                values="0.7;0.2;0.7"
                dur={p.dur}
                begin={p.delay}
                repeatCount="indefinite"
              />
            </circle>
          ))}

          {/* ═══════════ BOTTOM ZONE: ANONYMOUS + VERIFIED OUTPUT ═══════════ */}
          <g className="process-item-enter" style={{ animationDelay: '600ms' }}>
            {/* Anonymous avatar — question mark circle */}
            <circle
              cx={CX}
              cy={OUTPUT_Y}
              r={22}
              fill="rgba(223,255,0,0.08)"
              stroke="rgba(223,255,0,0.5)"
              strokeWidth={1.6}
            />
            {/* Question mark */}
            <text
              x={CX}
              y={OUTPUT_Y + 7}
              textAnchor="middle"
              fill="rgba(255,255,255,0.85)"
              fontSize="22"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
            >
              ?
            </text>

            {/* Verified badge — small shield with check, top-right of avatar */}
            <g>
              <circle
                cx={CX + 18}
                cy={OUTPUT_Y - 16}
                r={9}
                fill="rgba(223,255,0,0.2)"
                stroke="rgba(223,255,0,0.65)"
                strokeWidth={1.2}
              />
              <path
                d={`M${CX + 14},${OUTPUT_Y - 16} L${CX + 17},${OUTPUT_Y - 13} L${CX + 23},${OUTPUT_Y - 20}`}
                fill="none"
                stroke="rgba(223,255,0,0.9)"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* VERIFIED • ANONYMOUS label */}
            <text
              x={CX}
              y={OUTPUT_Y + 38}
              textAnchor="middle"
              fill="rgba(255,255,255,0.85)"
              fontSize="13"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.1em"
            >
              VERIFIED • ANONYMOUS
            </text>
          </g>

          {/* ── Reputation indicators ── */}
          {REP_ITEMS.map((r, i) => (
            <g
              key={`rep-${i}`}
              className={`process-item-enter ${r.cls}`}
              style={{ animationDelay: `${800 + i * 150}ms`, transformOrigin: `${r.x}px ${r.y}px` }}
            >
              <text
                x={r.x}
                y={r.y}
                textAnchor="middle"
                fill="rgba(223,255,0,0.55)"
                fontSize="14"
                fontFamily="'JetBrains Mono', monospace"
              >
                {r.label}
              </text>
            </g>
          ))}

          {/* Reputation accrual label */}
          <text
            x={CX}
            y={OUTPUT_Y + 86}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="11"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.12em"
          >
            REPUTATION ACCRUES
          </text>

          {/* ── Floating accent particles ── */}
          {[
            { x: 22, y: 70, r: 2.5, o: 0.5, cls: 'overwhelmed-float-1' },
            { x: 318, y: 90, r: 2, o: 0.45, cls: 'overwhelmed-float-2' },
            { x: 30, y: 380, r: 2.5, o: 0.5, cls: 'overwhelmed-float-3' },
            { x: 310, y: 360, r: 2, o: 0.45, cls: 'overwhelmed-float-1' },
            { x: 50, y: 250, r: 2, o: 0.4, cls: 'overwhelmed-float-2' },
            { x: 290, y: 260, r: 2.5, o: 0.5, cls: 'overwhelmed-float-3' },
          ].map((p, i) => (
            <circle
              key={`accent-${i}`}
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
            y={SVG_H - 24}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="11"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            PROOF WITHOUT EXPOSURE
          </text>
        </svg>
      </div>
    </div>
  )
}
