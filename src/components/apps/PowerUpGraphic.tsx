export function PowerUpGraphic(): React.JSX.Element {
  const cx = 150
  const cy = 155
  const headR = 16
  const headY = cy - 30

  // Particle positions — deterministic "random" offsets
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 12 + (i % 2 === 0 ? 0.2 : -0.1)
    const dist = 50 + (i % 3) * 18
    return {
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      delay: i * 0.3,
      size: 2 + (i % 3),
    }
  })

  return (
    <div className="flex items-center justify-center w-full h-full">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full"
        style={{ maxWidth: 320, maxHeight: 320 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Expanding rings */}
        {[0, 1, 2, 3].map(i => (
          <circle
            key={`ring-${i}`}
            cx={cx}
            cy={cy}
            r={40 + i * 20}
            fill="none"
            stroke="rgba(223,255,0,0.12)"
            strokeWidth={1}
            className="powerup-ring"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}

        {/* Inner glow circle */}
        <circle
          cx={cx}
          cy={cy}
          r={32}
          fill="rgba(223,255,0,0.04)"
          stroke="none"
          className="powerup-glow"
        />

        {/* Person — head */}
        <circle
          cx={cx}
          cy={headY}
          r={headR}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={1.2}
          className="powerup-figure-glow"
        />

        {/* Person — body (curved shoulders) */}
        <path
          d={`M ${cx - 20},${cy + 16} Q ${cx - 20},${cy - 8} ${cx},${cy - 12} Q ${cx + 20},${cy - 8} ${cx + 20},${cy + 16}`}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1.2}
          className="powerup-figure-glow"
        />

        {/* Person — arms reaching up */}
        <path
          d={`M ${cx - 20},${cy + 2} Q ${cx - 30},${cy - 16} ${cx - 22},${cy - 32}`}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1}
          strokeLinecap="round"
          className="powerup-figure-glow"
        />
        <path
          d={`M ${cx + 20},${cy + 2} Q ${cx + 30},${cy - 16} ${cx + 22},${cy - 32}`}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth={1}
          strokeLinecap="round"
          className="powerup-figure-glow"
        />

        {/* Energy lines radiating upward */}
        {[- 12, -4, 4, 12].map((offset, i) => (
          <line
            key={`energy-${i}`}
            x1={cx + offset}
            y1={headY - headR - 8}
            x2={cx + offset * 1.5}
            y2={headY - headR - 28}
            stroke="rgba(223,255,0,0.45)"
            strokeWidth={1}
            strokeLinecap="round"
            className="powerup-energy-line"
            style={{ animationDelay: `${i * 0.4}s` }}
          />
        ))}

        {/* Floating particles */}
        {particles.map((p, i) => (
          <circle
            key={`particle-${i}`}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="#dfff00"
            opacity={0.5}
            className="powerup-particle"
            style={{ animationDelay: `${p.delay}s` }}
          />
        ))}

        {/* Ground shadow */}
        <ellipse
          cx={cx}
          cy={cy + 40}
          rx={28}
          ry={4}
          fill="rgba(255,255,255,0.06)"
          className="powerup-shadow"
        />
      </svg>
    </div>
  )
}
