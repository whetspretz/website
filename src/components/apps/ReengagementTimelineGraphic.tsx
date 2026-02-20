import { useState } from 'react'

interface Touchpoint {
  id: string
  day: number
  label: string
  active: string[]
  inactive: string[]
}

const TOUCHPOINTS: Touchpoint[] = [
  {
    id: 'day-1',
    day: 1,
    label: 'Day 1',
    active: ['Pigeon reengages based on past conversations.', 'Congratulations on PNL.', 'Offers suggestions.'],
    inactive: ['Pigeon suggests a simple automation.'],
  },
  {
    id: 'day-3',
    day: 3,
    label: 'Day 3',
    active: ['Pigeon reengages based on past conversations.', 'Congratulations on PNL.', 'Offers suggestions.'],
    inactive: ['Pigeon suggests a simple automation.'],
  },
  {
    id: 'day-7',
    day: 7,
    label: 'Day 7',
    active: ['Pigeon reengages based on past conversations.', 'Congratulations on PNL.', 'Offers suggestions.'],
    inactive: ['Pigeon suggests a simple automation.'],
  },
  {
    id: 'day-14',
    day: 14,
    label: 'Day 14',
    active: ['Pigeon reengages based on past conversations.', 'Congratulations on PNL.', 'Offers suggestions.'],
    inactive: ['Pigeon suggests a simple automation.'],
  },
  {
    id: 'day-30',
    day: 30,
    label: 'Day 30',
    active: ['Pigeon reengages based on past conversations.', 'Congratulations on PNL.', 'Offers suggestions.'],
    inactive: ['Pigeon suggests a simple automation.'],
  },
  {
    id: 'day-45',
    day: 45,
    label: 'Day 45',
    active: ['Pigeon reengages based on past conversations.', 'Congratulations on PNL.', 'Offers suggestions.'],
    inactive: ['Pigeon suggests a simple automation.'],
  },
  {
    id: 'day-60',
    day: 60,
    label: 'Day 60',
    active: ['Pigeon reengages based on past conversations.', 'Congratulations on PNL.', 'Offers suggestions.'],
    inactive: ['Pigeon suggests a simple automation.'],
  },
]

// Layout
const SVG_W = 900
const SVG_H = 360
const TIMELINE_Y = 180
const NODE_R = 22
const TIMELINE_LEFT = 100
const TIMELINE_RIGHT = 800
const NODE_COUNT = TOUCHPOINTS.length

function nodeX(i: number): number {
  return TIMELINE_LEFT + (i / (NODE_COUNT - 1)) * (TIMELINE_RIGHT - TIMELINE_LEFT)
}

export function ReengagementTimelineGraphic(): React.JSX.Element {
  const [activeNode, setActiveNode] = useState(0)
  const active = TOUCHPOINTS[activeNode]

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
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/15" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/15" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/15" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/15" />

      {/* Step readout */}
      <div
        className="absolute top-4 right-5 font-mono text-white/30 z-10"
        style={{ fontSize: '0.55rem' }}
      >
        DAY {active.day}/60
      </div>

      {/* Main SVG */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center px-4">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Header */}
          <text
            x={SVG_W / 2}
            y={36}
            textAnchor="middle"
            fill="#dfff00"
            fontSize="14"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.12em"
          >
            60 DAY REENGAGEMENT
          </text>
          <text
            x={SVG_W / 2}
            y={56}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
          >
            Contextual touchpoints that adapt to user behavior
          </text>

          {/* Timeline base line */}
          <line
            x1={TIMELINE_LEFT}
            y1={TIMELINE_Y}
            x2={TIMELINE_RIGHT}
            y2={TIMELINE_Y}
            stroke="rgba(255,255,255,0.2)"
            strokeWidth={1}
            strokeDasharray="6 4"
            className="core-connection-line"
          />

          {/* Timeline segments (highlighted when adjacent to active) */}
          {TOUCHPOINTS.map((_tp, i) => {
            if (i >= NODE_COUNT - 1) return null
            const x1 = nodeX(i) + NODE_R
            const x2 = nodeX(i + 1) - NODE_R
            const isActive = i === activeNode || i + 1 === activeNode
            return (
              <line
                key={`seg-${i}`}
                x1={x1}
                y1={TIMELINE_Y}
                x2={x2}
                y2={TIMELINE_Y}
                stroke={isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray="4 4"
                className="transition-all duration-300"
              />
            )
          })}

          {/* Fork indicators — small arrows above/below timeline at each node */}
          {TOUCHPOINTS.map((_tp, i) => {
            const x = nodeX(i)
            const isActive = i === activeNode
            return (
              <g key={`fork-${i}`} className="transition-all duration-300">
                {/* Active arrow (up) */}
                <path
                  d={`M${x - 4},${TIMELINE_Y - NODE_R - 14} L${x},${TIMELINE_Y - NODE_R - 22} L${x + 4},${TIMELINE_Y - NODE_R - 14}`}
                  fill="none"
                  stroke={isActive ? '#dfff00' : 'rgba(223,255,0,0.45)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inactive arrow (down) */}
                <path
                  d={`M${x - 4},${TIMELINE_Y + NODE_R + 30} L${x},${TIMELINE_Y + NODE_R + 38} L${x + 4},${TIMELINE_Y + NODE_R + 30}`}
                  fill="none"
                  stroke={isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            )
          })}

          {/* Fork labels (only when a node is active) */}
          <text
            x={nodeX(activeNode)}
            y={TIMELINE_Y - NODE_R - 28}
            textAnchor="middle"
            fill="rgba(223,255,0,0.7)"
            fontSize="7"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            ACTIVE
          </text>
          <text
            x={nodeX(activeNode)}
            y={TIMELINE_Y + NODE_R + 52}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="7"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            INACTIVE
          </text>

          {/* Nodes */}
          {TOUCHPOINTS.map((tp, i) => {
            const x = nodeX(i)
            const isActive = i === activeNode

            return (
              <g
                key={tp.id}
                onClick={() => setActiveNode(i)}
                className="cursor-pointer"
              >
                {/* Outer pulse ring for active node */}
                {isActive && (
                  <circle
                    cx={x}
                    cy={TIMELINE_Y}
                    r={NODE_R + 6}
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={0.8}
                    className="overwhelmed-pulse"
                    style={{ transformOrigin: `${x}px ${TIMELINE_Y}px` }}
                  />
                )}
                {/* Main circle */}
                <circle
                  cx={x}
                  cy={TIMELINE_Y}
                  r={NODE_R}
                  fill={isActive ? '#fff' : '#111'}
                  stroke={isActive ? '#fff' : 'rgba(255,255,255,0.35)'}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${isActive ? 'process-node-active' : ''}`}
                />
                {/* Day number inside circle */}
                <text
                  x={x}
                  y={TIMELINE_Y + 5}
                  textAnchor="middle"
                  fill={isActive ? '#050505' : 'rgba(255,255,255,0.5)'}
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', monospace"
                  className="pointer-events-none"
                >
                  {tp.day}
                </text>
                {/* Day label below */}
                <text
                  x={x}
                  y={TIMELINE_Y + NODE_R + 16}
                  textAnchor="middle"
                  fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)'}
                  fontSize="9"
                  fontFamily="'JetBrains Mono', monospace"
                  className="pointer-events-none transition-all duration-300"
                >
                  {tp.label}
                </text>
              </g>
            )
          })}

          {/* Start/End markers */}
          <text
            x={TIMELINE_LEFT - 30}
            y={TIMELINE_Y + 4}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            START
          </text>
          <text
            x={TIMELINE_RIGHT + 35}
            y={TIMELINE_Y + 4}
            textAnchor="middle"
            fill="rgba(223,255,0,0.5)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            RETAIN
          </text>
        </svg>

        {/* Detail panel */}
        <div
          key={active.id}
          className="absolute z-10"
          style={{
            top: 12,
            right: 12,
            background: 'rgba(5,5,5,0.95)',
            border: '1px solid #222',
            borderRadius: 8,
            padding: '1rem 1.25rem',
            maxWidth: 260,
            minWidth: 180,
          }}
        >
          <div
            className="font-mono text-white font-bold mb-3 flex items-center gap-2"
            style={{ fontSize: '0.9rem' }}
          >
            <span style={{ color: '#dfff00' }}>*</span>
            {active.label}
          </div>

          {/* Active section */}
          <div
            className="font-mono font-bold mb-1 flex items-center gap-1.5"
            style={{ fontSize: '0.7rem', color: '#dfff00' }}
          >
            <span style={{ fontSize: '0.6rem' }}>▲</span>
            ACTIVE
          </div>
          {active.active.map((item, i) => (
            <div
              key={`a-${item}`}
              className="font-mono text-white/60 process-item-enter"
              style={{
                fontSize: '0.8rem',
                lineHeight: 1.7,
                animationDelay: `${i * 60}ms`,
              }}
            >
              {item}
            </div>
          ))}

          {/* Inactive section */}
          <div
            className="font-mono font-bold mt-3 mb-1 flex items-center gap-1.5"
            style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}
          >
            <span style={{ fontSize: '0.6rem' }}>▼</span>
            INACTIVE
          </div>
          {active.inactive.map((item, i) => (
            <div
              key={`i-${item}`}
              className="font-mono text-white/40 process-item-enter"
              style={{
                fontSize: '0.8rem',
                lineHeight: 1.7,
                animationDelay: `${(active.active.length + i) * 60}ms`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Sequencer bar */}
      <div
        className="shrink-0 flex border-t border-white/10"
        style={{ height: 64 }}
      >
        {TOUCHPOINTS.map((tp, i) => {
          const isActive = i === activeNode
          return (
            <button
              key={tp.id}
              onClick={() => setActiveNode(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < NODE_COUNT - 1 ? 'border-r border-white/10' : ''
              } ${isActive ? 'bg-white text-[#050505]' : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
              style={{ border: 'none', outline: 'none' }}
            >
              <span
                className="font-bold transition-opacity"
                style={{ fontSize: '1rem', opacity: isActive ? 1 : 0.4 }}
              >
                D{tp.day}
              </span>
              <span
                className="uppercase tracking-widest"
                style={{ fontSize: '0.4rem' }}
              >
                {tp.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
