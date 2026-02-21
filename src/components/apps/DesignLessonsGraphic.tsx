import { useState } from 'react'

interface Lesson {
  id: string
  label: string
  icon: 'shield' | 'friction' | 'eye'
}

const LESSONS: Lesson[] = [
  { id: 'trust', label: 'TRUST SYSTEMS', icon: 'shield' },
  { id: 'friction', label: 'PROTECTIVE FRICTION', icon: 'friction' },
  { id: 'clarity', label: 'OBVIOUS GUARANTEES', icon: 'eye' },
]

function LessonIcon({ icon, cx, cy, active }: { icon: Lesson['icon']; cx: number; cy: number; active: boolean }): React.JSX.Element {
  const color = active ? '#dfff00' : 'rgba(255,255,255,0.5)'
  const origin = { transformOrigin: `${cx}px ${cy}px` }

  switch (icon) {
    case 'shield':
      return (
        <g className="flow-icon-pulse" style={origin}>
          <path
            d={`M${cx},${cy - 14} L${cx + 11},${cy - 7} L${cx + 11},${cy + 4} Q${cx + 11},${cy + 12} ${cx},${cy + 16} Q${cx - 11},${cy + 12} ${cx - 11},${cy + 4} L${cx - 11},${cy - 7} Z`}
            fill="none"
            stroke={color}
            strokeWidth={1.3}
            strokeLinejoin="round"
          />
          {/* Checkmark inside */}
          <polyline
            points={`${cx - 4},${cy + 1} ${cx - 1},${cy + 5} ${cx + 5},${cy - 4}`}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )
    case 'friction':
      return (
        <g className="flow-icon-pulse" style={origin}>
          {/* Gate / barrier */}
          <line x1={cx - 12} y1={cy - 10} x2={cx - 12} y2={cy + 10} stroke={color} strokeWidth={1.3} />
          <line x1={cx + 12} y1={cy - 10} x2={cx + 12} y2={cy + 10} stroke={color} strokeWidth={1.3} />
          {/* Barrier bars */}
          <line x1={cx - 12} y1={cy - 5} x2={cx + 12} y2={cy - 5} stroke={color} strokeWidth={1} strokeDasharray="3 2" />
          <line x1={cx - 12} y1={cy + 1} x2={cx + 12} y2={cy + 1} stroke={color} strokeWidth={1} strokeDasharray="3 2" />
          <line x1={cx - 12} y1={cy + 7} x2={cx + 12} y2={cy + 7} stroke={color} strokeWidth={1} strokeDasharray="3 2" />
          {/* Small lock on top */}
          <rect x={cx - 4} y={cy - 14} width={8} height={6} rx={1} fill="none" stroke={color} strokeWidth={1} />
          <path d={`M${cx - 2},${cy - 14} V${cy - 17} a2,2 0 0 1 4,0 V${cy - 14}`} fill="none" stroke={color} strokeWidth={0.8} />
        </g>
      )
    case 'eye':
    default:
      return (
        <g className="flow-icon-pulse" style={origin}>
          {/* Eye shape */}
          <path
            d={`M${cx - 16},${cy} Q${cx},${cy - 11} ${cx + 16},${cy} Q${cx},${cy + 11} ${cx - 16},${cy}Z`}
            fill="none"
            stroke={color}
            strokeWidth={1.3}
          />
          {/* Iris */}
          <circle cx={cx} cy={cy} r={5} fill="none" stroke={color} strokeWidth={1.2} />
          {/* Pupil */}
          <circle cx={cx} cy={cy} r={2} fill={color} />
          {/* Sparkle lines */}
          {[0, 60, 120, 180, 240, 300].map(angle => {
            const rad = (angle * Math.PI) / 180
            const x1 = cx + Math.cos(rad) * 8
            const y1 = cy + Math.sin(rad) * 8
            const x2 = cx + Math.cos(rad) * 6
            const y2 = cy + Math.sin(rad) * 6
            return (
              <line
                key={angle}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={color}
                strokeWidth={0.6}
                opacity={0.4}
              />
            )
          })}
        </g>
      )
  }
}

export function DesignLessonsGraphic(): React.JSX.Element {
  const [activeIdx, setActiveIdx] = useState(0)

  const CX = 170
  const CY = 270

  // 3 nodes arranged in a vertical column
  const nodePositions = LESSONS.map((_, i) => ({
    x: CX,
    y: 80 + i * 190,
  }))

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 340 540"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background subtle grid */}
        <defs>
          <pattern id="dl-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="0.5" fill="rgba(255,255,255,0.04)" />
          </pattern>
        </defs>
        <rect width="340" height="540" fill="url(#dl-grid)" />

        {/* Connecting line through all nodes */}
        <line
          x1={CX} y1={nodePositions[0].y}
          x2={CX} y2={nodePositions[2].y}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1}
          strokeDasharray="4 4"
          className="flow-loop-line"
        />

        {/* Nodes */}
        {LESSONS.map((lesson, i) => {
          const pos = nodePositions[i]
          const isActive = i === activeIdx

          return (
            <g
              key={lesson.id}
              onClick={() => setActiveIdx(i)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer glow ring */}
              {isActive && (
                <>
                  <circle
                    cx={pos.x} cy={pos.y} r={52}
                    fill="none"
                    stroke="rgba(223,255,0,0.08)"
                    strokeWidth={1}
                    className="core-orbit-pulse"
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px`, animationDelay: '0s' }}
                  />
                  <circle
                    cx={pos.x} cy={pos.y} r={62}
                    fill="none"
                    stroke="rgba(223,255,0,0.04)"
                    strokeWidth={0.8}
                    className="core-orbit-pulse"
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px`, animationDelay: '0.5s' }}
                  />
                </>
              )}

              {/* Node circle */}
              <circle
                cx={pos.x} cy={pos.y} r={38}
                fill={isActive ? 'rgba(223,255,0,0.06)' : 'rgba(255,255,255,0.03)'}
                stroke={isActive ? 'rgba(223,255,0,0.4)' : 'rgba(255,255,255,0.12)'}
                strokeWidth={1}
              />

              {/* Icon */}
              <LessonIcon icon={lesson.icon} cx={pos.x} cy={pos.y} active={isActive} />

              {/* Label */}
              <text
                x={pos.x}
                y={pos.y + 54}
                textAnchor="middle"
                fill={isActive ? 'rgba(223,255,0,0.8)' : 'rgba(255,255,255,0.35)'}
                fontSize="12"
                fontWeight={600}
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.12em"
              >
                {lesson.label}
              </text>

              {/* Index number */}
              <text
                x={pos.x - 50}
                y={pos.y + 5}
                textAnchor="middle"
                fill={isActive ? 'rgba(223,255,0,0.5)' : 'rgba(255,255,255,0.15)'}
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
              >
                {String(i + 1).padStart(2, '0')}
              </text>

              {/* Small connector dot on the main line */}
              <circle
                cx={pos.x} cy={pos.y}
                r={3}
                fill={isActive ? '#dfff00' : 'rgba(255,255,255,0.2)'}
                className={isActive ? 'core-orbit-dot' : ''}
                style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
              />
            </g>
          )
        })}

        {/* Decorative orbiting dots */}
        <g className="process-icon-spin" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX + 80} cy={CY} r={1} fill="rgba(255,255,255,0.1)" />
          <circle cx={CX - 80} cy={CY} r={1} fill="rgba(255,255,255,0.1)" />
        </g>

        {/* Corner brackets */}
        <g stroke="rgba(255,255,255,0.1)" strokeWidth={0.8}>
          <polyline points="10,20 10,10 20,10" fill="none" />
          <polyline points="320,10 330,10 330,20" fill="none" />
          <polyline points="10,520 10,530 20,530" fill="none" />
          <polyline points="320,530 330,530 330,520" fill="none" />
        </g>
      </svg>
    </div>
  )
}
