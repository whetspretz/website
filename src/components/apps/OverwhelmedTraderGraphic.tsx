const CX = 150
const CY = 150

const NODES = [
  { x: 55, y: 75 },
  { x: 235, y: 65 },
  { x: 40, y: 210 },
  { x: 255, y: 195 },
  { x: 150, y: 40 },
  { x: 175, y: 255 },
  { x: 95, y: 150 },
]

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 3], [0, 4],
  [1, 4], [3, 5], [2, 5], [4, 5], [0, 3],
  [6, 0], [6, 2], [6, 4], [1, 5],
]

// Broken shield: two arcs with a gap at bottom-right
const SHIELD_R = 42
const gapDeg = 40
const startRad = ((90 + gapDeg / 2) * Math.PI) / 180
const endRad = ((90 - gapDeg / 2 + 360) * Math.PI) / 180
const arc1Start = { x: CX + SHIELD_R * Math.cos(startRad), y: CY + SHIELD_R * Math.sin(startRad) }
const arc1End = { x: CX + SHIELD_R * Math.cos(endRad), y: CY + SHIELD_R * Math.sin(endRad) }

export function OverwhelmedTraderGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full"
        style={{ maxWidth: 300, maxHeight: 300 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Outer spinning ring */}
        <circle
          cx={CX} cy={CY} r={130}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={0.8}
          strokeDasharray="6 4"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Middle counter-rotating ring */}
        <circle
          cx={CX} cy={CY} r={100}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={0.8}
          strokeDasharray="4 3"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Inner pulsing ring */}
        <circle
          cx={CX} cy={CY} r={60}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth={0.5}
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Tangled connections */}
        {CONNECTIONS.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x} y1={NODES[a].y}
            x2={NODES[b].x} y2={NODES[b].y}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={0.8}
            strokeDasharray="4 3"
          />
        ))}

        {/* Scattered nodes */}
        {NODES.map((node, i) => (
          <g
            key={i}
            className={`overwhelmed-float-${(i % 3) + 1}`}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Outer ring */}
            <circle
              cx={node.x} cy={node.y} r={10}
              fill="none"
              stroke="rgba(255,255,255,0.7)"
              strokeWidth={1}
            />
            {/* Inner dot */}
            <circle
              cx={node.x} cy={node.y} r={2.5}
              fill="rgba(255,255,255,0.55)"
            />
          </g>
        ))}

        {/* Broken shield — main arc */}
        <path
          d={`M ${arc1Start.x},${arc1Start.y} A ${SHIELD_R} ${SHIELD_R} 0 1 0 ${arc1End.x},${arc1End.y}`}
          fill="none"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth={1.5}
          strokeDasharray="6 4"
          strokeLinecap="round"
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Broken shield — gap fragment (dimmer, shorter dashes) */}
        <path
          d={`M ${arc1End.x},${arc1End.y} A ${SHIELD_R} ${SHIELD_R} 0 0 0 ${arc1Start.x},${arc1Start.y}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={1}
          strokeDasharray="2 5"
          strokeLinecap="round"
        />

        {/* Crack mark at the gap */}
        <g style={{ transformOrigin: `${CX}px ${CY + SHIELD_R}px` }}>
          <line
            x1={CX - 5} y1={CY + SHIELD_R - 5}
            x2={CX + 5} y2={CY + SHIELD_R + 5}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1}
            strokeLinecap="round"
          />
          <line
            x1={CX + 5} y1={CY + SHIELD_R - 5}
            x2={CX - 5} y2={CY + SHIELD_R + 5}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1}
            strokeLinecap="round"
          />
        </g>

        {/* Orbiting particles on outer ring */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX + 130} cy={CY} r={2} fill="rgba(255,255,255,0.35)" />
          <circle cx={CX - 130} cy={CY} r={1.5} fill="rgba(255,255,255,0.25)" />
          <circle cx={CX} cy={CY - 130} r={1.5} fill="rgba(255,255,255,0.3)" />
        </g>

        {/* Center crosshair */}
        <line
          x1={CX - 8} y1={CY} x2={CX + 8} y2={CY}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={0.5}
        />
        <line
          x1={CX} y1={CY - 8} x2={CX} y2={CY + 8}
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={0.5}
        />
      </svg>
    </div>
  )
}
