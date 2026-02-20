export function CoreStrengthsGraphic(): React.JSX.Element {
  const cx = 150
  const cy = 150
  const orbitR = 70

  // 3 nodes positioned 120 degrees apart
  const nodes = [
    { id: 'taste', label: 'Taste', angle: -90 },
    { id: 'empathy', label: 'Empathy', angle: 30 },
    { id: 'adapt', label: 'Adapt', angle: 150 },
  ]

  const nodePositions = nodes.map(n => {
    const rad = (n.angle * Math.PI) / 180
    return {
      ...n,
      x: cx + Math.cos(rad) * orbitR,
      y: cy + Math.sin(rad) * orbitR,
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
        {/* Orbit ring */}
        <circle
          cx={cx}
          cy={cy}
          r={orbitR}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
          strokeDasharray="4 6"
        />

        {/* Outer pulse rings */}
        {[0, 1, 2].map(i => (
          <circle
            key={`pulse-${i}`}
            cx={cx}
            cy={cy}
            r={orbitR + 14 + i * 16}
            fill="none"
            stroke="rgba(223,255,0,0.06)"
            strokeWidth={0.8}
            className="core-orbit-pulse"
            style={{ animationDelay: `${i * 0.8}s` }}
          />
        ))}

        {/* Connection lines from center to nodes */}
        {nodePositions.map(n => (
          <line
            key={`line-${n.id}`}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={1}
            strokeDasharray="3 5"
            className="core-connection-line"
          />
        ))}

        {/* Central node — diamond */}
        <g style={{ transformOrigin: `${cx}px ${cy}px` }} className="core-center-spin">
          <rect
            x={cx - 10}
            y={cy - 10}
            width={20}
            height={20}
            rx={2}
            fill="rgba(223,255,0,0.08)"
            stroke="rgba(223,255,0,0.45)"
            strokeWidth={1}
            transform={`rotate(45 ${cx} ${cy})`}
          />
        </g>
        {/* Center dot */}
        <circle cx={cx} cy={cy} r={3} fill="rgba(223,255,0,0.6)" />

        {/* Node 1: Taste — Eye icon */}
        {(() => {
          const n = nodePositions[0]
          return (
            <g>
              <circle
                cx={n.x}
                cy={n.y}
                r={22}
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={1}
                className="core-node-glow"
              />
              {/* Eye shape */}
              <g style={{ transformOrigin: `${n.x}px ${n.y}px` }} className="core-icon-blink">
                <path
                  d={`M${n.x - 10},${n.y} Q${n.x},${n.y - 6} ${n.x + 10},${n.y} Q${n.x},${n.y + 6} ${n.x - 10},${n.y}Z`}
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth={1}
                />
                <circle cx={n.x} cy={n.y} r={3} fill="rgba(255,255,255,0.7)" />
              </g>
              {/* Label */}
              <text
                x={n.x}
                y={n.y - 30}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.1em"
              >
                TASTE
              </text>
            </g>
          )
        })()}

        {/* Node 2: Empathy — Person silhouette */}
        {(() => {
          const n = nodePositions[1]
          return (
            <g>
              <circle
                cx={n.x}
                cy={n.y}
                r={22}
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={1}
                className="core-node-glow"
                style={{ animationDelay: '1s' }}
              />
              {/* Person: head + shoulders */}
              <g className="core-icon-pulse">
                <circle cx={n.x} cy={n.y - 5} r={4} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={1} />
                <path
                  d={`M${n.x - 8},${n.y + 10} Q${n.x - 8},${n.y + 2} ${n.x},${n.y + 1} Q${n.x + 8},${n.y + 2} ${n.x + 8},${n.y + 10}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth={1}
                />
              </g>
              {/* Label */}
              <text
                x={n.x}
                y={n.y + 36}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.1em"
              >
                EMPATHY
              </text>
            </g>
          )
        })()}

        {/* Node 3: Adapt — Circular arrows */}
        {(() => {
          const n = nodePositions[2]
          return (
            <g>
              <circle
                cx={n.x}
                cy={n.y}
                r={22}
                fill="rgba(255,255,255,0.08)"
                stroke="rgba(255,255,255,0.7)"
                strokeWidth={1}
                className="core-node-glow"
                style={{ animationDelay: '2s' }}
              />
              {/* Circular arrow */}
              <g style={{ transformOrigin: `${n.x}px ${n.y}px` }} className="core-icon-spin">
                <path
                  d={`M${n.x + 8},${n.y - 2} A 8 8 0 1 0 ${n.x - 2},${n.y - 8}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth={1}
                  strokeLinecap="round"
                />
                {/* Arrow tip */}
                <path
                  d={`M${n.x - 5},${n.y - 8} L${n.x - 2},${n.y - 8} L${n.x - 2},${n.y - 5}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              {/* Label */}
              <text
                x={n.x}
                y={n.y + 36}
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="12"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.1em"
              >
                ADAPT
              </text>
            </g>
          )
        })()}

        {/* Small accent particles along orbit */}
        {[0, 45, 120, 200, 270, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180
          const px = cx + Math.cos(rad) * (orbitR + 2)
          const py = cy + Math.sin(rad) * (orbitR + 2)
          return (
            <circle
              key={`dot-${i}`}
              cx={px}
              cy={py}
              r={1.5}
              fill="#dfff00"
              opacity={0.4}
              className="core-orbit-dot"
              style={{ animationDelay: `${i * 0.5}s` }}
            />
          )
        })}
      </svg>
    </div>
  )
}
