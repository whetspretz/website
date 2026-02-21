// Animated "ZK Promise" graphic for Ketl case study
// Visual: two failing extremes (real-name vs anonymous) contrasted,
// with ketl's zk-proof third way synthesized at the bottom
// Portrait viewBox to match the split-slide-image panel

const SVG_W = 340
const SVG_H = 540
const CX = SVG_W / 2

// Two cards
const CARD_W = 130
const CARD_H = 160
const CARD_Y = 70
const LEFT_CX = CX - 76
const RIGHT_CX = CX + 76
// Synthesis zone
const SYNTH_Y = 380

export function ZkPromiseGraphic(): React.JSX.Element {
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
            fill="rgba(255,255,255,0.6)"
            fontSize="13"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.18em"
          >
            THE TRADEOFF
          </text>

          {/* ── Background rings ── */}
          <circle
            cx={CX}
            cy={260}
            r={160}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.7}
            strokeDasharray="4 6"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px 260px` }}
          />

          {/* ═══════════ LEFT CARD: REAL NAME ═══════════ */}
          <g
            className="process-item-enter overwhelmed-float-1"
            style={{ animationDelay: '100ms', transformOrigin: `${LEFT_CX}px ${CARD_Y + CARD_H / 2}px` }}
          >
            {/* Card bg */}
            <rect
              x={LEFT_CX - CARD_W / 2}
              y={CARD_Y}
              width={CARD_W}
              height={CARD_H}
              rx={6}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(96,165,250,0.45)"
              strokeWidth={1.4}
            />
            {/* Accent bar */}
            <rect
              x={LEFT_CX - CARD_W / 2}
              y={CARD_Y}
              width={4}
              height={CARD_H}
              rx={2}
              fill="rgba(96,165,250,0.5)"
            />

            {/* Profile icon — fully visible person */}
            <circle
              cx={LEFT_CX}
              cy={CARD_Y + 32}
              r={16}
              fill="rgba(96,165,250,0.12)"
              stroke="rgba(96,165,250,0.5)"
              strokeWidth={1.4}
            />
            {/* Head */}
            <circle cx={LEFT_CX} cy={CARD_Y + 28} r={6} fill="rgba(255,255,255,0.35)" />
            {/* Shoulders */}
            <path
              d={`M${LEFT_CX - 10},${CARD_Y + 42} Q${LEFT_CX - 10},${CARD_Y + 34} ${LEFT_CX},${CARD_Y + 34} Q${LEFT_CX + 10},${CARD_Y + 34} ${LEFT_CX + 10},${CARD_Y + 42}`}
              fill="rgba(255,255,255,0.25)"
            />

            {/* Name bar (exposed) */}
            <rect x={LEFT_CX - 30} y={CARD_Y + 58} width={60} height={6} rx={2} fill="rgba(255,255,255,0.3)" />
            {/* Company bar */}
            <rect x={LEFT_CX - 22} y={CARD_Y + 70} width={44} height={5} rx={2} fill="rgba(255,255,255,0.15)" />

            {/* Lock icon — open/exposed */}
            <g>
              <rect x={LEFT_CX + 28} y={CARD_Y + 56} width={14} height={11} rx={2} fill="rgba(96,165,250,0.2)" stroke="rgba(96,165,250,0.5)" strokeWidth={1} />
              <path
                d={`M${LEFT_CX + 31},${CARD_Y + 56} L${LEFT_CX + 31},${CARD_Y + 51} Q${LEFT_CX + 31},${CARD_Y + 45} ${LEFT_CX + 35},${CARD_Y + 45} Q${LEFT_CX + 39},${CARD_Y + 45} ${LEFT_CX + 39},${CARD_Y + 51}`}
                fill="none"
                stroke="rgba(96,165,250,0.5)"
                strokeWidth={1.2}
                strokeLinecap="round"
              />
            </g>

            {/* Label */}
            <text
              x={LEFT_CX}
              y={CARD_Y + 100}
              textAnchor="middle"
              fill="rgba(96,165,250,0.9)"
              fontSize="14"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.08em"
            >
              REAL NAME
            </text>

            {/* Verdict */}
            <text
              x={LEFT_CX}
              y={CARD_Y + 120}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              credible but
            </text>
            <text
              x={LEFT_CX}
              y={CARD_Y + 136}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              performative
            </text>

            {/* Constraint chains — horizontal dashes around the person */}
            {[-1, 1].map(dir => (
              <line
                key={`chain-${dir}`}
                x1={LEFT_CX + dir * 22}
                y1={CARD_Y + 30}
                x2={LEFT_CX + dir * 38}
                y2={CARD_Y + 30}
                stroke="rgba(96,165,250,0.35)"
                strokeWidth={1.2}
                strokeDasharray="3 3"
              />
            ))}
          </g>

          {/* ── VS divider ── */}
          <g className="process-item-enter" style={{ animationDelay: '250ms' }}>
            <text
              x={CX}
              y={CARD_Y + CARD_H / 2 + 5}
              textAnchor="middle"
              fill="rgba(255,255,255,0.35)"
              fontSize="14"
              fontWeight="600"
              fontFamily="'JetBrains Mono', monospace"
            >
              vs
            </text>
          </g>

          {/* ═══════════ RIGHT CARD: ANONYMOUS ═══════════ */}
          <g
            className="process-item-enter overwhelmed-float-2"
            style={{ animationDelay: '200ms', transformOrigin: `${RIGHT_CX}px ${CARD_Y + CARD_H / 2}px` }}
          >
            {/* Card bg */}
            <rect
              x={RIGHT_CX - CARD_W / 2}
              y={CARD_Y}
              width={CARD_W}
              height={CARD_H}
              rx={6}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(251,113,133,0.45)"
              strokeWidth={1.4}
            />
            {/* Accent bar */}
            <rect
              x={RIGHT_CX + CARD_W / 2 - 4}
              y={CARD_Y}
              width={4}
              height={CARD_H}
              rx={2}
              fill="rgba(251,113,133,0.5)"
            />

            {/* Anonymous icon — question mark in circle */}
            <circle
              cx={RIGHT_CX}
              cy={CARD_Y + 32}
              r={16}
              fill="rgba(251,113,133,0.1)"
              stroke="rgba(251,113,133,0.45)"
              strokeWidth={1.4}
            />
            <text
              x={RIGHT_CX}
              y={CARD_Y + 38}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="18"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
            >
              ?
            </text>

            {/* Static/noise lines (lack of signal) */}
            {[58, 66, 74].map((dy, i) => (
              <g key={`noise-${i}`}>
                <rect
                  x={RIGHT_CX - 28 + (i * 7) % 10}
                  y={CARD_Y + dy}
                  width={30 + (i * 13) % 20}
                  height={4}
                  rx={1}
                  fill="rgba(255,255,255,0.1)"
                />
                <rect
                  x={RIGHT_CX + 6 + (i * 5) % 8}
                  y={CARD_Y + dy}
                  width={14 + (i * 7) % 12}
                  height={4}
                  rx={1}
                  fill="rgba(255,255,255,0.07)"
                />
              </g>
            ))}

            {/* No-verify icon — X badge */}
            <g>
              <circle
                cx={RIGHT_CX + 28}
                cy={CARD_Y + 56}
                r={7}
                fill="rgba(251,113,133,0.2)"
                stroke="rgba(251,113,133,0.5)"
                strokeWidth={1}
              />
              <line x1={RIGHT_CX + 25} y1={CARD_Y + 53} x2={RIGHT_CX + 31} y2={CARD_Y + 59} stroke="rgba(251,113,133,0.7)" strokeWidth={1.4} strokeLinecap="round" />
              <line x1={RIGHT_CX + 31} y1={CARD_Y + 53} x2={RIGHT_CX + 25} y2={CARD_Y + 59} stroke="rgba(251,113,133,0.7)" strokeWidth={1.4} strokeLinecap="round" />
            </g>

            {/* Label */}
            <text
              x={RIGHT_CX}
              y={CARD_Y + 100}
              textAnchor="middle"
              fill="rgba(251,113,133,0.9)"
              fontSize="14"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.08em"
            >
              ANONYMOUS
            </text>

            {/* Verdict */}
            <text
              x={RIGHT_CX}
              y={CARD_Y + 120}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              honest but
            </text>
            <text
              x={RIGHT_CX}
              y={CARD_Y + 136}
              textAnchor="middle"
              fill="rgba(255,255,255,0.5)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              unverifiable
            </text>
          </g>

          {/* ═══════════ CONVERGENCE LINES ═══════════ */}
          <line
            x1={LEFT_CX}
            y1={CARD_Y + CARD_H + 8}
            x2={CX - 12}
            y2={SYNTH_Y - 60}
            stroke="rgba(96,165,250,0.3)"
            strokeWidth={1}
            strokeDasharray="4 4"
            className="core-connection-line"
            style={{ animationDelay: '0.4s' }}
          />
          <line
            x1={RIGHT_CX}
            y1={CARD_Y + CARD_H + 8}
            x2={CX + 12}
            y2={SYNTH_Y - 60}
            stroke="rgba(251,113,133,0.3)"
            strokeWidth={1}
            strokeDasharray="4 4"
            className="core-connection-line"
            style={{ animationDelay: '0.6s' }}
          />

          {/* Midpoint merge dot */}
          <circle
            cx={CX}
            cy={SYNTH_Y - 56}
            r={4}
            fill="rgba(223,255,0,0.6)"
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${CX}px ${SYNTH_Y - 56}px` }}
          />

          {/* ── "WHAT IF BOTH?" label ── */}
          <text
            x={CX}
            y={SYNTH_Y - 36}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize="12"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.12em"
          >
            WHAT IF BOTH?
          </text>

          {/* ── Arrow down to synthesis ── */}
          <line
            x1={CX}
            y1={SYNTH_Y - 26}
            x2={CX}
            y2={SYNTH_Y - 8}
            stroke="rgba(223,255,0,0.35)"
            strokeWidth={1.2}
            strokeDasharray="3 3"
          />
          <path
            d={`M${CX - 4},${SYNTH_Y - 12} L${CX},${SYNTH_Y - 6} L${CX + 4},${SYNTH_Y - 12}`}
            fill="none"
            stroke="rgba(223,255,0,0.45)"
            strokeWidth={1.2}
            strokeLinecap="round"
          />

          {/* ═══════════ SYNTHESIS ZONE: KETL'S ANSWER ═══════════ */}
          <g className="process-item-enter" style={{ animationDelay: '500ms' }}>
            {/* Synthesis card */}
            <rect
              x={CX - 100}
              y={SYNTH_Y}
              width={200}
              height={100}
              rx={8}
              fill="rgba(223,255,0,0.05)"
              stroke="rgba(223,255,0,0.45)"
              strokeWidth={1.6}
            />

            {/* Pulse ring */}
            <rect
              x={CX - 106}
              y={SYNTH_Y - 6}
              width={212}
              height={112}
              rx={12}
              fill="none"
              stroke="rgba(223,255,0,0.18)"
              strokeWidth={1}
              className="overwhelmed-pulse"
              style={{ transformOrigin: `${CX}px ${SYNTH_Y + 50}px` }}
            />

            {/* Verified anonymous avatar */}
            <circle
              cx={CX - 50}
              cy={SYNTH_Y + 36}
              r={18}
              fill="rgba(223,255,0,0.08)"
              stroke="rgba(223,255,0,0.5)"
              strokeWidth={1.4}
            />
            <text
              x={CX - 50}
              y={SYNTH_Y + 42}
              textAnchor="middle"
              fill="rgba(255,255,255,0.8)"
              fontSize="18"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
            >
              ?
            </text>
            {/* Checkmark badge */}
            <circle
              cx={CX - 36}
              cy={SYNTH_Y + 22}
              r={7}
              fill="rgba(223,255,0,0.25)"
              stroke="rgba(223,255,0,0.65)"
              strokeWidth={1}
            />
            <path
              d={`M${CX - 40},${SYNTH_Y + 22} L${CX - 37},${SYNTH_Y + 25} L${CX - 32},${SYNTH_Y + 19}`}
              fill="none"
              stroke="rgba(223,255,0,0.9)"
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Right side labels */}
            <text
              x={CX + 16}
              y={SYNTH_Y + 28}
              textAnchor="middle"
              fill="rgba(223,255,0,0.85)"
              fontSize="16"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.1em"
            >
              ketl
            </text>
            <text
              x={CX + 16}
              y={SYNTH_Y + 46}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              credible +
            </text>
            <text
              x={CX + 16}
              y={SYNTH_Y + 60}
              textAnchor="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="11"
              fontFamily="'JetBrains Mono', monospace"
            >
              honest
            </text>

            {/* Bottom accent line */}
            <line
              x1={CX - 80}
              y1={SYNTH_Y + 78}
              x2={CX + 80}
              y2={SYNTH_Y + 78}
              stroke="rgba(223,255,0,0.2)"
              strokeWidth={1}
            />
            <text
              x={CX}
              y={SYNTH_Y + 92}
              textAnchor="middle"
              fill="rgba(223,255,0,0.6)"
              fontSize="10"
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.12em"
            >
              ZERO-KNOWLEDGE PROOFS
            </text>
          </g>

          {/* ── Floating accent particles ── */}
          {[
            { x: 24, y: 56, r: 2.5, o: 0.5, cls: 'overwhelmed-float-1' },
            { x: 316, y: 80, r: 2, o: 0.45, cls: 'overwhelmed-float-2' },
            { x: 20, y: 330, r: 2, o: 0.45, cls: 'overwhelmed-float-3' },
            { x: 320, y: 310, r: 2.5, o: 0.5, cls: 'overwhelmed-float-1' },
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
            fill="rgba(255,255,255,0.4)"
            fontSize="11"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            PROVE WITHOUT EXPOSING
          </text>
        </svg>
      </div>
    </div>
  )
}
