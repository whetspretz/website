const CX = 150
const CY = 150

/* Small envelope icon at (0,0) — 18×12 rect with flap */
function Envelope({ x, y, angle = 0, stroke = 'rgba(255,255,255,0.35)', fill = 'rgba(255,255,255,0.08)' }: {
  x: number; y: number; angle?: number; stroke?: string; fill?: string
}): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <rect x={-9} y={-6} width={18} height={12} rx={1.5}
        fill={fill} stroke={stroke} strokeWidth={0.8} />
      <polyline points="-9,-6 0,1 9,-6"
        fill="none" stroke={stroke} strokeWidth={0.7} strokeLinejoin="round" />
    </g>
  )
}

/* Deflected envelope with red X */
function DeflectedEnvelope({ x, y, angle }: { x: number; y: number; angle: number }): React.JSX.Element {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <Envelope x={0} y={0} stroke="rgba(255,255,255,0.15)" fill="rgba(255,255,255,0.03)" />
      <line x1={-3} y1={-3} x2={3} y2={3} stroke="rgba(220,80,80,0.4)" strokeWidth={1} strokeLinecap="round" />
      <line x1={3} y1={-3} x2={-3} y2={3} stroke="rgba(220,80,80,0.4)" strokeWidth={1} strokeLinecap="round" />
    </g>
  )
}

export function ColdOutreachGraphic(): React.JSX.Element {
  /* Envelope positions — radial layout approaching center */
  const envelopes = [
    { x: 62, y: 58, angle: 25 },
    { x: 240, y: 72, angle: -15 },
    { x: 48, y: 180, angle: 12 },
    { x: 248, y: 195, angle: -20 },
    { x: 95, y: 42, angle: 35 },
    { x: 210, y: 248, angle: -30 },
    { x: 55, y: 245, angle: 18 },
    { x: 235, y: 130, angle: -10 },
  ]

  /* Deflected envelopes — just outside the barrier */
  const deflected = [
    { x: 90, y: 115, angle: 45 },
    { x: 215, y: 100, angle: -35 },
    { x: 195, y: 215, angle: 25 },
  ]

  /* Accent orbit particles */
  const particles = [0, 72, 144, 216, 288].map((deg, i) => {
    const r = 80
    const rad = (deg * Math.PI) / 180
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad), delay: i * 0.4 }
  })

  return (
    <div className="w-full h-full flex items-center justify-center process-dot-grid" style={{ position: 'relative' }}>
      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/10" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/10" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/10" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/10" />

      <svg viewBox="0 0 300 300" className="w-full h-full" style={{ maxWidth: 300, maxHeight: 300 }} preserveAspectRatio="xMidYMid meet">

        {/* === Background orbit rings === */}
        <circle cx={CX} cy={CY} r={130}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.6}
          strokeDasharray="6 4"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle cx={CX} cy={CY} r={100}
          fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={0.5}
          strokeDasharray="4 6"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* === Floating envelopes (incoming) === */}
        {envelopes.map((env, i) => (
          <g key={i} className={`overwhelmed-float-${(i % 3) + 1}`}>
            <Envelope x={env.x} y={env.y} angle={env.angle} />
          </g>
        ))}

        {/* === Barrier / gatekeeping ring (accent) === */}
        <circle cx={CX} cy={CY} r={80}
          fill="none"
          stroke="rgba(223,255,0,0.35)"
          strokeWidth={1.2}
          strokeDasharray="8 5"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Subtle glow ring behind barrier */}
        <circle cx={CX} cy={CY} r={80}
          fill="none"
          stroke="rgba(223,255,0,0.08)"
          strokeWidth={8}
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* === Deflected envelopes with X marks === */}
        {deflected.map((d, i) => (
          <g key={i} className={`overwhelmed-float-${(i % 3) + 1}`}>
            <DeflectedEnvelope x={d.x} y={d.y} angle={d.angle} />
          </g>
        ))}

        {/* === Center person node === */}
        {/* Glow backdrop */}
        <circle cx={CX} cy={CY} r={52}
          fill="rgba(255,255,255,0.03)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={0.8}
        />

        {/* Person silhouette: head + shoulders */}
        <g className="overwhelmed-pulse" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          {/* Head */}
          <circle cx={CX} cy={CY - 15} r={11}
            fill="rgba(255,255,255,0.08)"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth={1.2}
          />
          {/* Shoulders / body arc */}
          <path
            d={`M${CX - 22},${CY + 25} Q${CX - 22},${CY + 4} ${CX},${CY + 4} Q${CX + 22},${CY + 4} ${CX + 22},${CY + 25}`}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </g>

        {/* === Accent orbit particles === */}
        {particles.map((p, i) => (
          <circle key={i}
            cx={p.x} cy={p.y} r={1.5}
            fill="#dfff00"
            opacity={0.5}
            className="core-orbit-dot"
            style={{ animationDelay: `${p.delay}s`, transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}

        {/* === Connecting lines from envelopes toward center (faint) === */}
        {envelopes.slice(0, 4).map((env, i) => (
          <line key={i}
            x1={env.x} y1={env.y}
            x2={CX + (env.x - CX) * 0.45} y2={CY + (env.y - CY) * 0.45}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={0.5}
            strokeDasharray="3 4"
            className="core-connection-line"
          />
        ))}

      </svg>
    </div>
  )
}
