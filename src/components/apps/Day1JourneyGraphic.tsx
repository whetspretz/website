import { useState } from 'react'

interface FlowNode {
  id: string
  label: string
  items: string[]
}

const NODES: FlowNode[] = [
  {
    id: 'first-contact',
    label: 'First Contact',
    items: [
      'Pigeon sends an intro message',
      'Learns user intent through conversation',
      'No feature dump — just a greeting',
      'Sets the tone: simple, helpful, human',
    ],
  },
  {
    id: 'follow-up',
    label: 'Dynamic Follow-up',
    items: [
      'Pigeon recommends a next step',
      'Based on what the user expressed interest in',
      'Contextual, not generic',
      'Could be an automation, a trade, or research',
    ],
  },
  {
    id: 'engages',
    label: 'User Engages',
    items: [
      '1. Create a non-trade automation (research, alerts)',
      '2. Fund wallet',
      '3. Make first trade / swap / bet',
    ],
  },
  {
    id: 'no-engage',
    label: 'User Doesn\'t Engage',
    items: [
      'Contextual reengagement message',
      'Recommends an automation',
      'Not spammy — feels personal',
    ],
  },
]

// Layout
const SVG_W = 800
const SVG_H = 440

// Node positions
const FIRST_CONTACT = { x: 260, y: 100 }
const FOLLOW_UP = { x: 260, y: 220 }
const ENGAGES = { x: 140, y: 340 }
const NO_ENGAGE = { x: 380, y: 340 }
const NODE_R = 26
const POSITIONS = [FIRST_CONTACT, FOLLOW_UP, ENGAGES, NO_ENGAGE]

function NodeIcon({ nodeId, cx, cy, isActive }: { nodeId: string; cx: number; cy: number; isActive: boolean }): React.JSX.Element {
  const color = isActive ? '#050505' : 'rgba(255,255,255,0.5)'

  switch (nodeId) {
    case 'first-contact':
      // Chat bubble
      return (
        <g className="flow-icon-pulse" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <rect x={cx - 9} y={cy - 7} width={18} height={12} rx={3} fill="none" stroke={color} strokeWidth={1} />
          <path d={`M${cx - 3},${cy + 5} L${cx - 1},${cy + 9} L${cx + 2},${cy + 5}`} fill="none" stroke={color} strokeWidth={0.8} strokeLinejoin="round" />
          <line x1={cx - 5} y1={cy - 2} x2={cx + 5} y2={cy - 2} stroke={color} strokeWidth={0.7} />
          <line x1={cx - 5} y1={cy + 1} x2={cx + 3} y2={cy + 1} stroke={color} strokeWidth={0.7} />
        </g>
      )
    case 'follow-up':
      // Branching arrows
      return (
        <g className="flow-icon-pulse" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 2} stroke={color} strokeWidth={1} />
          <line x1={cx} y1={cy + 2} x2={cx - 8} y2={cy + 8} stroke={color} strokeWidth={1} />
          <line x1={cx} y1={cy + 2} x2={cx + 8} y2={cy + 8} stroke={color} strokeWidth={1} />
          <circle cx={cx - 8} cy={cy + 8} r={2} fill={color} />
          <circle cx={cx + 8} cy={cy + 8} r={2} fill={color} />
        </g>
      )
    case 'engages':
      // Checkmark / target
      return (
        <g className="flow-icon-pulse" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={9} fill="none" stroke={color} strokeWidth={0.8} />
          <path d={`M${cx - 5},${cy} L${cx - 1},${cy + 4} L${cx + 6},${cy - 5}`} fill="none" stroke={color} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )
    case 'no-engage':
      // Clock / return
      return (
        <g className="flow-icon-pulse" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <circle cx={cx} cy={cy} r={9} fill="none" stroke={color} strokeWidth={0.8} />
          <line x1={cx} y1={cy - 5} x2={cx} y2={cy} stroke={color} strokeWidth={1} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={cx + 4} y2={cy + 3} stroke={color} strokeWidth={1} strokeLinecap="round" />
        </g>
      )
    default:
      return <></>
  }
}

export function Day1JourneyGraphic(): React.JSX.Element {
  const [activeNode, setActiveNode] = useState(0)
  const active = NODES[activeNode]

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
        NODE {activeNode + 1}/4
      </div>

      {/* Main SVG */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center px-4">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Banner */}
          <text
            x={260}
            y={30}
            textAnchor="middle"
            fill="#dfff00"
            fontSize="16"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.1em"
          >
            DAY 1
          </text>
          <text
            x={260}
            y={50}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize="10"
            fontFamily="'JetBrains Mono', monospace"
          >
            Goal: Get user to create their first automation
          </text>

          {/* Arrow marker */}
          <defs>
            <marker
              id="day1-arrow"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.4)" />
            </marker>
            <marker
              id="day1-arrow-active"
              markerWidth="6"
              markerHeight="4"
              refX="5"
              refY="2"
              orient="auto"
            >
              <polygon points="0 0, 6 2, 0 4" fill="rgba(255,255,255,0.7)" />
            </marker>
          </defs>

          {/* Connection: First Contact → Follow-up */}
          {(() => {
            const isActive = activeNode === 0 || activeNode === 1
            return (
              <line
                x1={FIRST_CONTACT.x}
                y1={FIRST_CONTACT.y + NODE_R}
                x2={FOLLOW_UP.x}
                y2={FOLLOW_UP.y - NODE_R}
                stroke={isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray="4 4"
                markerEnd={isActive ? 'url(#day1-arrow-active)' : 'url(#day1-arrow)'}
                className="core-connection-line"
              />
            )
          })()}

          {/* Connection: Follow-up → Engages (left fork) */}
          {(() => {
            const isActive = activeNode === 1 || activeNode === 2
            return (
              <line
                x1={FOLLOW_UP.x - 10}
                y1={FOLLOW_UP.y + NODE_R}
                x2={ENGAGES.x + 10}
                y2={ENGAGES.y - NODE_R}
                stroke={isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray="4 4"
                markerEnd={isActive ? 'url(#day1-arrow-active)' : 'url(#day1-arrow)'}
                className="core-connection-line"
              />
            )
          })()}

          {/* Connection: Follow-up → No Engage (right fork) */}
          {(() => {
            const isActive = activeNode === 1 || activeNode === 3
            return (
              <line
                x1={FOLLOW_UP.x + 10}
                y1={FOLLOW_UP.y + NODE_R}
                x2={NO_ENGAGE.x - 10}
                y2={NO_ENGAGE.y - NODE_R}
                stroke={isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}
                strokeWidth={isActive ? 1.5 : 1}
                strokeDasharray="4 4"
                markerEnd={isActive ? 'url(#day1-arrow-active)' : 'url(#day1-arrow)'}
                className="core-connection-line"
              />
            )
          })()}

          {/* Fork labels — nudged outward to avoid line overlap */}
          <text
            x={(FOLLOW_UP.x + ENGAGES.x) / 2 - 36}
            y={(FOLLOW_UP.y + ENGAGES.y) / 2 + 4}
            textAnchor="middle"
            fill="rgba(223,255,0,0.5)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            ENGAGES
          </text>
          <text
            x={(FOLLOW_UP.x + NO_ENGAGE.x) / 2 + 36}
            y={(FOLLOW_UP.y + NO_ENGAGE.y) / 2 + 4}
            textAnchor="middle"
            fill="rgba(255,255,255,0.3)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
          >
            DROPS OFF
          </text>

          {/* Nodes */}
          {NODES.map((node, i) => {
            const isActive = i === activeNode
            const pos = POSITIONS[i]
            // Position labels: first-contact above, follow-up to the right, bottom two below
            const isFollowUp = i === 1
            const isBottom = i === 2 || i === 3

            return (
              <g
                key={node.id}
                onClick={() => setActiveNode(i)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={NODE_R}
                  fill={isActive ? '#fff' : '#111'}
                  stroke={isActive ? '#fff' : '#555'}
                  strokeWidth={1.5}
                  className={`transition-all duration-300 ${isActive ? 'process-node-active' : ''}`}
                />
                <NodeIcon nodeId={node.id} cx={pos.x} cy={pos.y} isActive={isActive} />
                {/* Label */}
                <text
                  x={isFollowUp ? pos.x + NODE_R + 12 : pos.x}
                  y={isBottom ? pos.y + NODE_R + 20 : pos.y - 36}
                  textAnchor={isFollowUp ? 'start' : 'middle'}
                  fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}
                  fontSize="11"
                  fontWeight={isActive ? '700' : '400'}
                  fontFamily="'JetBrains Mono', monospace"
                  className="transition-all duration-300 pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            )
          })}

          {/* Subtitle text under Dynamic Follow-up label */}
          <text
            x={FOLLOW_UP.x + NODE_R + 12}
            y={FOLLOW_UP.y - 20}
            fill="rgba(255,255,255,0.35)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            fontStyle="italic"
          >
            Engage users instead of
          </text>
          <text
            x={FOLLOW_UP.x + NODE_R + 12}
            y={FOLLOW_UP.y - 8}
            fill="rgba(255,255,255,0.35)"
            fontSize="8"
            fontFamily="'JetBrains Mono', monospace"
            fontStyle="italic"
          >
            throwing everything at them
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
            className="font-mono text-white font-bold mb-2 flex items-center gap-2"
            style={{ fontSize: '0.9rem' }}
          >
            <span style={{ color: '#dfff00' }}>*</span>
            {active.label}
          </div>
          {active.items.map((item, i) => (
            <div
              key={item}
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
        </div>
      </div>

      {/* Sequencer bar */}
      <div
        className="shrink-0 flex border-t border-white/10"
        style={{ height: 64 }}
      >
        {NODES.map((node, i) => {
          const isActive = i === activeNode
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(i)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < NODES.length - 1 ? 'border-r border-white/10' : ''
              } ${isActive ? 'bg-white text-[#050505]' : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
              style={{ border: 'none', outline: 'none' }}
            >
              <span
                className="font-bold transition-opacity"
                style={{ fontSize: '1.1rem', opacity: isActive ? 1 : 0.4 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className="uppercase tracking-widest"
                style={{ fontSize: '0.45rem' }}
              >
                {node.label.length > 14 ? node.label.slice(0, 13) + '.' : node.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
