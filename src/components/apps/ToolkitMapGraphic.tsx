import { useState, useRef, useEffect } from 'react'

interface ToolNode {
  id: string
  label: string
  description: string
  group: 'code' | 'design'
  connectedPhases: string[]
  color: string
}

interface PhaseNode {
  id: string
  label: string
}

const PHASE_NODES: PhaseNode[] = [
  { id: 'understand', label: 'Understand' },
  { id: 'design', label: 'Design' },
  { id: 'prototype', label: 'Prototype' },
  { id: 'build', label: 'Build' },
  { id: 'ship', label: 'Ship' },
]

const TOOL_NODES: ToolNode[] = [
  {
    id: 'figma-mcp',
    label: 'Figma MCP',
    description: 'Design-to-code bridge via Model Context Protocol. Extracts components, tokens, and layout rules directly from Figma into your editor.',
    group: 'design',
    connectedPhases: ['design', 'build'],
    color: '#a78bfa',
  },
  {
    id: 'variant',
    label: 'Variant',
    description: 'AI-powered UI generator. Produces well-designed interface variations from a single prompt, exportable as HTML or React.',
    group: 'design',
    connectedPhases: ['design', 'prototype'],
    color: '#f472b6',
  },
  {
    id: 'super-design',
    label: 'Super Design',
    description: 'AI design agent inside the IDE. Generates production-ready UI components from natural language without leaving your editor.',
    group: 'design',
    connectedPhases: ['design', 'prototype'],
    color: '#fb923c',
  },
  {
    id: 'superpowers',
    label: 'Superpowers',
    description: 'Structured workflows for AI agents. TDD, brainstorming, planning, debugging — composable skills that enforce discipline.',
    group: 'code',
    connectedPhases: ['prototype', 'build'],
    color: '#dfff00',
  },
  {
    id: 'beagle',
    label: 'Beagle',
    description: '82 skills for code review and quality. Framework-specific reviews for React, Python, Go, Elixir, iOS — automated quality gates.',
    group: 'code',
    connectedPhases: ['build', 'ship'],
    color: '#34d399',
  },
  {
    id: 'daydream',
    label: 'Daydream',
    description: 'Automated review-fix-test CLI. Four-phase workflow: Review → Parse → Fix → Test. Parallel agents resolve issues automatically.',
    group: 'code',
    connectedPhases: ['ship'],
    color: '#60a5fa',
  },
]

type Selection = { type: 'tool'; id: string } | { type: 'phase'; id: string } | null

export function ToolkitMapGraphic(): React.JSX.Element {
  const [selection, setSelection] = useState<Selection>({ type: 'tool', id: 'figma-mcp' })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width
      setIsCompact(width < 500)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Phase positions (top row)
  const phasePositions = PHASE_NODES.map((_p, i) => {
    if (isCompact) {
      return { x: 60 + i * 55, y: 50 }
    }
    return { x: 120 + i * 180, y: 55 }
  })

  // Tool positions (bottom area, split into two groups)
  const designTools = TOOL_NODES.filter(t => t.group === 'design')
  const codeTools = TOOL_NODES.filter(t => t.group === 'code')

  const toolPositions: Record<string, { x: number; y: number }> = {}
  designTools.forEach((t, i) => {
    if (isCompact) {
      toolPositions[t.id] = { x: 60 + i * 85, y: 200 }
    } else {
      toolPositions[t.id] = { x: 160 + i * 180, y: 210 }
    }
  })
  codeTools.forEach((t, i) => {
    if (isCompact) {
      toolPositions[t.id] = { x: 60 + i * 85, y: 290 }
    } else {
      toolPositions[t.id] = { x: 160 + i * 180, y: 310 }
    }
  })

  const viewBox = isCompact ? '0 0 340 380' : '0 0 960 400'

  // Determine which items are highlighted
  const isPhaseHighlighted = (phaseId: string): boolean => {
    if (!selection) return false
    if (selection.type === 'phase') return selection.id === phaseId
    if (selection.type === 'tool') {
      const tool = TOOL_NODES.find(t => t.id === selection.id)
      return tool ? tool.connectedPhases.includes(phaseId) : false
    }
    return false
  }

  const isToolHighlighted = (toolId: string): boolean => {
    if (!selection) return false
    if (selection.type === 'tool') return selection.id === toolId
    if (selection.type === 'phase') {
      const tool = TOOL_NODES.find(t => t.id === toolId)
      return tool ? tool.connectedPhases.includes(selection.id) : false
    }
    return false
  }

  const isConnectionHighlighted = (toolId: string, phaseId: string): boolean => {
    if (!selection) return false
    if (selection.type === 'tool') return selection.id === toolId && TOOL_NODES.find(t => t.id === toolId)?.connectedPhases.includes(phaseId) === true
    if (selection.type === 'phase') return selection.id === phaseId && TOOL_NODES.find(t => t.id === toolId)?.connectedPhases.includes(phaseId) === true
    return false
  }

  // Detail panel content
  const getDetailContent = (): { label: string; description: string; color: string; items: string[] } | null => {
    if (!selection) return null
    if (selection.type === 'tool') {
      const tool = TOOL_NODES.find(t => t.id === selection.id)
      if (!tool) return null
      return {
        label: tool.label,
        description: tool.description,
        color: tool.color,
        items: tool.connectedPhases.map(p => PHASE_NODES.find(pn => pn.id === p)?.label ?? p),
      }
    }
    if (selection.type === 'phase') {
      const phase = PHASE_NODES.find(p => p.id === selection.id)
      if (!phase) return null
      const connectedTools = TOOL_NODES.filter(t => t.connectedPhases.includes(selection.id))
      return {
        label: phase.label,
        description: `${connectedTools.length} tool${connectedTools.length !== 1 ? 's' : ''} active in this phase.`,
        color: '#fff',
        items: connectedTools.map(t => t.label),
      }
    }
    return null
  }

  const detail = getDetailContent()

  const handleClick = (type: 'tool' | 'phase', id: string): void => {
    setSelection(prev => (prev?.type === type && prev?.id === id) ? null : { type, id })
  }

  return (
    <div className="flex flex-col h-full relative process-dot-grid">
      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.04) 50%)',
          backgroundSize: '100% 2px',
        }}
      />

      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/15" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/15" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/15" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/15" />

      {/* Main SVG area */}
      <div ref={containerRef} className="flex-1 min-h-0 relative flex items-center justify-center px-4">
        <svg
          viewBox={viewBox}
          className="w-full h-full"
          style={{ maxHeight: '100%' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Header label */}
          <text
            x={isCompact ? 170 : 480}
            y={20}
            textAnchor="middle"
            fill="rgba(255,255,255,0.4)"
            fontSize="9"
            fontFamily="'JetBrains Mono', monospace"
            letterSpacing="0.15em"
          >
            TOOLKIT MAP
          </text>

          {/* Group labels */}
          {!isCompact && (
            <>
              <text
                x={50}
                y={215}
                fill="rgba(255,255,255,0.5)"
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.12em"
              >
                DESIGN
              </text>
              <text
                x={50}
                y={315}
                fill="rgba(255,255,255,0.5)"
                fontSize="8"
                fontFamily="'JetBrains Mono', monospace"
                letterSpacing="0.12em"
              >
                CODE
              </text>
            </>
          )}

          {/* Horizontal divider between phases and tools */}
          <line
            x1={isCompact ? 20 : 80}
            y1={isCompact ? 120 : 130}
            x2={isCompact ? 320 : 880}
            y2={isCompact ? 120 : 130}
            stroke="rgba(255,255,255,0.2)"
            strokeDasharray="4 6"
          />

          {/* Connection lines */}
          {TOOL_NODES.map(tool => {
            const toolPos = toolPositions[tool.id]
            return tool.connectedPhases.map(phaseId => {
              const phaseIdx = PHASE_NODES.findIndex(p => p.id === phaseId)
              if (phaseIdx === -1) return null
              const phasePos = phasePositions[phaseIdx]
              const highlighted = isConnectionHighlighted(tool.id, phaseId)

              return (
                <line
                  key={`${tool.id}-${phaseId}`}
                  x1={toolPos.x}
                  y1={toolPos.y - 18}
                  x2={phasePos.x}
                  y2={phasePos.y + 18}
                  stroke={highlighted ? tool.color : 'rgba(255,255,255,0.2)'}
                  strokeWidth={highlighted ? 1.5 : 0.8}
                  strokeDasharray={highlighted ? '6 3' : '3 6'}
                  className="transition-all duration-300"
                  style={highlighted ? {
                    filter: `drop-shadow(0 0 4px ${tool.color})`,
                  } : undefined}
                />
              )
            })
          })}

          {/* Phase nodes (top row) */}
          {PHASE_NODES.map((phase, i) => {
            const pos = phasePositions[i]
            const highlighted = isPhaseHighlighted(phase.id)
            const isSelected = selection?.type === 'phase' && selection.id === phase.id

            return (
              <g
                key={phase.id}
                onClick={() => handleClick('phase', phase.id)}
                className="cursor-pointer"
              >
                <rect
                  x={pos.x - (isCompact ? 22 : 36)}
                  y={pos.y - 14}
                  width={isCompact ? 44 : 72}
                  height={28}
                  rx={4}
                  fill={isSelected ? '#fff' : highlighted ? 'rgba(255,255,255,0.08)' : '#111'}
                  stroke={highlighted ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.35)'}
                  strokeWidth={highlighted ? 1.5 : 1}
                  className={`transition-all duration-300 ${isSelected ? 'process-node-active' : ''}`}
                />
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill={isSelected ? '#050505' : highlighted ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)'}
                  fontSize={isCompact ? 8 : 11}
                  fontWeight={highlighted ? '700' : '400'}
                  fontFamily="'JetBrains Mono', monospace"
                  className="pointer-events-none transition-all duration-300"
                >
                  {phase.label}
                </text>
              </g>
            )
          })}

          {/* Tool nodes (bottom area) */}
          {TOOL_NODES.map(tool => {
            const pos = toolPositions[tool.id]
            const highlighted = isToolHighlighted(tool.id)
            const isSelected = selection?.type === 'tool' && selection.id === tool.id

            return (
              <g
                key={tool.id}
                onClick={() => handleClick('tool', tool.id)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isCompact ? 16 : 22}
                  fill={isSelected ? tool.color : highlighted ? `${tool.color}22` : '#111'}
                  stroke={highlighted ? tool.color : 'rgba(255,255,255,0.35)'}
                  strokeWidth={highlighted ? 1.5 : 1}
                  className={`transition-all duration-300 ${isSelected ? 'process-node-active' : ''}`}
                  style={isSelected ? { filter: `drop-shadow(0 0 8px ${tool.color})` } : undefined}
                />
                {/* Tool initial letter */}
                <text
                  x={pos.x}
                  y={pos.y + (isCompact ? 4 : 5)}
                  textAnchor="middle"
                  fill={isSelected ? '#050505' : highlighted ? tool.color : 'rgba(255,255,255,0.6)'}
                  fontSize={isCompact ? 10 : 13}
                  fontWeight="700"
                  fontFamily="'JetBrains Mono', monospace"
                  className="pointer-events-none transition-all duration-300"
                >
                  {tool.label.charAt(0)}
                </text>
                {/* Label below */}
                <text
                  x={pos.x}
                  y={pos.y + (isCompact ? 30 : 38)}
                  textAnchor="middle"
                  fill={highlighted ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.55)'}
                  fontSize={isCompact ? 7 : 9}
                  fontFamily="'JetBrains Mono', monospace"
                  className="pointer-events-none transition-all duration-300"
                >
                  {tool.label}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Detail panel */}
        {detail && (
          <div
            key={`${selection?.type}-${selection?.id}`}
            className="absolute z-10"
            style={{
              top: 12,
              right: 12,
              background: 'rgba(5,5,5,0.95)',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '1rem 1.25rem',
              maxWidth: isCompact ? 180 : 260,
              minWidth: isCompact ? 140 : 180,
            }}
          >
            <div
              className="font-mono text-white font-bold mb-2 flex items-center gap-2"
              style={{ fontSize: isCompact ? '0.75rem' : '0.9rem' }}
            >
              <span
                className="inline-block rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: detail.color,
                  boxShadow: `0 0 6px ${detail.color}`,
                }}
              />
              {detail.label}
            </div>
            <div
              className="font-mono text-white/50 mb-2 process-item-enter"
              style={{ fontSize: isCompact ? '0.65rem' : '0.75rem', lineHeight: 1.6 }}
            >
              {detail.description}
            </div>
            <div
              className="font-mono mt-2 mb-1"
              style={{
                fontSize: '0.6rem',
                color: selection?.type === 'tool' ? 'rgba(255,255,255,0.4)' : 'rgba(223,255,0,0.6)',
                letterSpacing: '0.1em',
              }}
            >
              {selection?.type === 'tool' ? 'USED IN' : 'ACTIVE TOOLS'}
            </div>
            {detail.items.map((item, i) => (
              <div
                key={item}
                className="font-mono process-item-enter flex items-center gap-1.5"
                style={{
                  fontSize: isCompact ? '0.65rem' : '0.75rem',
                  lineHeight: 1.7,
                  color: selection?.type === 'tool' ? 'rgba(255,255,255,0.7)' : 'rgba(223,255,0,0.8)',
                  animationDelay: `${(i + 1) * 60}ms`,
                }}
              >
                <span style={{ fontSize: '0.45rem' }}>&#9670;</span>
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom tool selector bar */}
      <div
        className="shrink-0 flex border-t border-white/10"
        style={{ height: isCompact ? 40 : 52 }}
      >
        {TOOL_NODES.map((tool, i) => {
          const isActive = selection?.type === 'tool' && selection.id === tool.id
          return (
            <button
              key={tool.id}
              onClick={() => handleClick('tool', tool.id)}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 cursor-pointer transition-all duration-150 font-mono ${
                i < TOOL_NODES.length - 1 ? 'border-r border-white/10' : ''
              } ${isActive ? 'text-[#050505]' : 'bg-transparent text-white/40 hover:bg-white/5 hover:text-white/80'}`}
              style={{
                border: 'none',
                outline: 'none',
                background: isActive ? tool.color : undefined,
              }}
            >
              <span
                className="font-bold transition-opacity"
                style={{
                  fontSize: isCompact ? '0.65rem' : '0.8rem',
                  opacity: isActive ? 1 : 0.4,
                }}
              >
                {tool.label.charAt(0)}
              </span>
              {!isCompact && (
                <span
                  className="uppercase tracking-widest"
                  style={{ fontSize: '0.4rem' }}
                >
                  {tool.label.length > 10 ? tool.label.slice(0, 9) + '.' : tool.label}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
