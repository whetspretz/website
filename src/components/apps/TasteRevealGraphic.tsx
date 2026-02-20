// Animated "Taste Reveal" graphic — a user silhouette with taste tags
// radiating outward and connecting, representing the onboarding moment
// where we SHOW users who they are instead of asking.

const CX = 200
const CY = 200

// Taste tags that "reveal" around the user
const TAGS = [
  { label: 'DARK FANTASY', angle: -70, dist: 105, accent: true },
  { label: 'MORALLY GRAY', angle: -25, dist: 115, accent: false },
  { label: 'EPIC SCALE', angle: 20, dist: 108, accent: true },
  { label: 'GUT-PUNCH', angle: 65, dist: 112, accent: false },
  { label: 'WAR & LOSS', angle: 115, dist: 105, accent: false },
  { label: 'COMPLEX HEROINES', angle: 160, dist: 118, accent: true },
  { label: 'MYTHOLOGY', angle: -115, dist: 110, accent: false },
  { label: 'WORLD-BUILDING', angle: -160, dist: 115, accent: false },
]

// Connection lines between related tags (index pairs)
const TAG_CONNECTIONS = [
  [0, 2],  // dark fantasy — epic scale
  [1, 3],  // morally gray — gut-punch
  [5, 6],  // complex heroines — mythology
  [0, 6],  // dark fantasy — mythology
  [4, 3],  // war & loss — gut-punch
]

function tagPosition(angle: number, dist: number): { x: number; y: number } {
  const rad = (angle * Math.PI) / 180
  return { x: CX + dist * Math.cos(rad), y: CY + dist * Math.sin(rad) }
}

export function TasteRevealGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ maxWidth: 400, maxHeight: 400 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background rings */}
        <circle
          cx={CX} cy={CY} r={170}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
          strokeDasharray="6 4"
          className="overwhelmed-spin-slow"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle
          cx={CX} cy={CY} r={130}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={0.8}
          strokeDasharray="4 6"
          className="overwhelmed-spin-reverse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
        <circle
          cx={CX} cy={CY} r={60}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={0.6}
          strokeDasharray="3 5"
        />

        {/* Connection lines between related tags */}
        {TAG_CONNECTIONS.map(([a, b], i) => {
          const posA = tagPosition(TAGS[a].angle, TAGS[a].dist)
          const posB = tagPosition(TAGS[b].angle, TAGS[b].dist)
          return (
            <line
              key={`tc-${i}`}
              x1={posA.x} y1={posA.y}
              x2={posB.x} y2={posB.y}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth={0.8}
              strokeDasharray="3 4"
            />
          )
        })}

        {/* Lines from center to each tag */}
        {TAGS.map((tag, i) => {
          const pos = tagPosition(tag.angle, tag.dist)
          return (
            <line
              key={`ray-${i}`}
              x1={CX} y1={CY}
              x2={pos.x} y2={pos.y}
              stroke={tag.accent ? 'rgba(223, 255, 0, 0.2)' : 'rgba(255,255,255,0.15)'}
              strokeWidth={0.6}
              strokeDasharray="2 4"
            />
          )
        })}

        {/* Central user silhouette */}
        <circle
          cx={CX} cy={CY - 16}
          r={16}
          fill="none"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth={1.4}
        />
        <path
          d={`M ${CX - 22},${CY + 22} Q ${CX - 22},${CY + 2} ${CX},${CY - 2} Q ${CX + 22},${CY + 2} ${CX + 22},${CY + 22}`}
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth={1.4}
        />

        {/* Reveal glow ring around user */}
        <circle
          cx={CX} cy={CY}
          r={38}
          fill="rgba(223, 255, 0, 0.05)"
          stroke="rgba(223, 255, 0, 0.4)"
          strokeWidth={1.2}
          className="overwhelmed-pulse"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Match percentage badge */}
        <g>
          <circle
            cx={CX + 32} cy={CY - 32}
            r={18}
            fill="rgba(223, 255, 0, 0.1)"
            stroke="rgba(223, 255, 0, 0.5)"
            strokeWidth={1}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${CX + 32}px ${CY - 32}px` }}
          />
          <text
            x={CX + 32} y={CY - 28}
            textAnchor="middle"
            fill="rgba(223, 255, 0, 0.85)"
            style={{ fontSize: '12px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}
          >
            93%
          </text>
        </g>

        {/* Taste tags */}
        {TAGS.map((tag, i) => {
          const pos = tagPosition(tag.angle, tag.dist)
          const textLen = tag.label.length * 5.8 + 16
          return (
            <g
              key={`tag-${i}`}
              className={`overwhelmed-float-${(i % 3) + 1}`}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              {/* Tag pill background */}
              <rect
                x={pos.x - textLen / 2} y={pos.y - 9}
                width={textLen} height={18}
                rx={9}
                fill={tag.accent ? 'rgba(223, 255, 0, 0.1)' : 'rgba(255,255,255,0.08)'}
                stroke={tag.accent ? 'rgba(223, 255, 0, 0.5)' : 'rgba(255,255,255,0.35)'}
                strokeWidth={0.8}
              />
              {/* Tag dot */}
              <circle
                cx={pos.x - textLen / 2 + 8} cy={pos.y}
                r={2.5}
                fill={tag.accent ? 'rgba(223, 255, 0, 0.7)' : 'rgba(255,255,255,0.4)'}
              />
              {/* Tag text */}
              <text
                x={pos.x + 4} y={pos.y + 3.5}
                textAnchor="middle"
                fill={tag.accent ? 'rgba(223, 255, 0, 0.85)' : 'rgba(255,255,255,0.6)'}
                style={{ fontSize: '8px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}
              >
                {tag.label}
              </text>
            </g>
          )
        })}

        {/* Orbiting discovery particle */}
        <g
          className="process-icon-spin"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle cx={CX + 85} cy={CY} r={2.5} fill="rgba(223, 255, 0, 0.6)" />
          <circle cx={CX + 85} cy={CY} r={5} fill="none" stroke="rgba(223, 255, 0, 0.25)" strokeWidth={0.6} />
        </g>

        {/* Floating sparkle particles */}
        {[
          { x: CX - 70, y: CY - 80, r: 2, o: 0.5 },
          { x: CX + 90, y: CY + 60, r: 2.2, o: 0.55 },
          { x: CX - 90, y: CY + 50, r: 1.8, o: 0.45 },
          { x: CX + 60, y: CY + 85, r: 2.5, o: 0.6 },
        ].map((p, i) => (
          <circle
            key={`sp-${i}`}
            cx={p.x} cy={p.y} r={p.r}
            fill={`rgba(223, 255, 0, ${p.o})`}
            className={`overwhelmed-float-${(i % 3) + 1}`}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          />
        ))}

        {/* Corner brackets */}
        <g stroke="rgba(255,255,255,0.25)" strokeWidth={1} fill="none">
          <polyline points="25,40 25,25 40,25" />
          <polyline points="360,25 375,25 375,40" />
          <polyline points="375,360 375,375 360,375" />
          <polyline points="40,375 25,375 25,360" />
        </g>

        {/* Label */}
        <text
          x={CX}
          y={355}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          style={{ fontSize: '11px', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}
        >
          TASTE REVEAL
        </text>
      </svg>
    </div>
  )
}
