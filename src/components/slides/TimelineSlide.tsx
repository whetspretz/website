import { useState, useRef, useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { TimelineSlide, TimelineEntry } from '@/lib/slideTypes'

function toMonths(entry: TimelineEntry, isEnd: boolean): number {
  if (isEnd) {
    const y = entry.endYear ?? new Date().getFullYear()
    const m = entry.endMonth ?? (entry.endYear ? 12 : new Date().getMonth() + 1)
    return y * 12 + m
  }
  return entry.startYear * 12 + (entry.startMonth ?? 1) - 1
}

export function TimelineSlideView({ slide }: { slide: TimelineSlide }): React.JSX.Element {
  const isMobile = useIsMobile()
  const [activeIndex, setActiveIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isNarrow, setIsNarrow] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      setIsNarrow(entries[0].contentRect.width < 420)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const { entries } = slide
  const active = entries[activeIndex]

  // Compute timeline range
  const allStartMonths = entries.map((e) => toMonths(e, false))
  const allEndMonths = entries.map((e) => toMonths(e, true))
  const minMonth = Math.min(...allStartMonths)
  const maxMonth = Math.max(...allEndMonths)
  const totalMonths = maxMonth - minMonth

  const minYear = Math.floor(minMonth / 12)
  const maxYear = Math.ceil(maxMonth / 12)

  // Check if entries use month granularity
  const hasMonths = entries.some((e) => e.startMonth != null || e.endMonth != null)

  const MONTH_ABBREV = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // SVG layout constants
  const pad = 40
  const trackWidth = 720
  const blockY = 30
  const blockH = 44
  const trackY = blockY + blockH + 12
  const tickY = trackY + 6

  // Month label density: hide text when too compressed
  const pxPerMonth = totalMonths > 0 ? trackWidth / totalMonths : trackWidth
  const monthMode: 'full' | 'dots' | 'hidden' = pxPerMonth >= 15 ? 'full' : pxPerMonth >= 5 ? 'dots' : 'hidden'
  const showMonthRow = hasMonths && monthMode !== 'hidden'

  const monthLabelY = tickY + 12
  const yearLabelY = showMonthRow ? monthLabelY + 14 : tickY + 14
  const svgW = trackWidth + pad * 2
  const svgH = yearLabelY + 16

  // Map a month value to x coordinate
  const monthToX = (m: number): number => {
    if (totalMonths === 0) return pad
    return pad + ((m - minMonth) / totalMonths) * trackWidth
  }

  // Vertical layout
  const vBlockH = 40
  const vGap = 8
  const vLabelW = 60
  const vTrackX = vLabelW + 20
  const vBarMaxW = 180
  const vSvgW = vTrackX + vBarMaxW + 40
  const vSvgH = entries.length * (vBlockH + vGap) + 40

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

      {/* Main SVG area */}
      <div ref={containerRef} className="flex-1 min-h-0 relative flex items-center justify-center px-4">
        {isNarrow ? (
          /* Vertical layout for narrow widths */
          <svg
            viewBox={`0 0 ${vSvgW} ${vSvgH}`}
            className="w-full h-full"
            style={{ maxHeight: '100%' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Vertical track line */}
            <line
              x1={vTrackX}
              y1={12}
              x2={vTrackX}
              y2={vSvgH - 12}
              stroke="rgba(255,255,255,0.18)"
              strokeDasharray="4 6"
            />

            {entries.map((entry, i) => {
              const isActive = i === activeIndex
              const y = 20 + i * (vBlockH + vGap)
              const startM = toMonths(entry, false)
              const endM = toMonths(entry, true)
              const duration = endM - startM
              const barW = totalMonths > 0 ? (duration / totalMonths) * vBarMaxW : vBarMaxW
              const isPresent = !entry.endYear

              return (
                <g
                  key={i}
                  className={`timeline-block ${isActive ? 'timeline-block-active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  {/* Year label */}
                  <text
                    x={vTrackX - 12}
                    y={y + vBlockH / 2 + 4}
                    textAnchor="end"
                    fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)'}
                    fontSize="10"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {entry.startYear}
                  </text>

                  {/* Block */}
                  <rect
                    x={vTrackX + 8}
                    y={y}
                    width={Math.max(barW, 30)}
                    height={vBlockH}
                    rx={3}
                    fill={isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'}
                    stroke={isActive ? '#fff' : 'rgba(255,255,255,0.25)'}
                    strokeWidth={isActive ? 1.2 : 0.8}
                    className="transition-all duration-200"
                  />

                  {/* Label inside block */}
                  <text
                    x={vTrackX + 16}
                    y={y + vBlockH / 2 + 4}
                    fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}
                    fontSize="10"
                    fontWeight={isActive ? '700' : '400'}
                    fontFamily="'JetBrains Mono', monospace"
                    className="pointer-events-none"
                  >
                    {entry.label}
                  </text>

                  {/* Present indicator */}
                  {isPresent && (
                    <circle
                      cx={vTrackX + 8 + Math.max(barW, 30) + 8}
                      cy={y + vBlockH / 2}
                      r={3}
                      fill="#dfff00"
                      className="timeline-present-dot"
                    />
                  )}

                  {/* Connector dot on track */}
                  <circle
                    cx={vTrackX}
                    cy={y + vBlockH / 2}
                    r={3}
                    fill={isActive ? '#fff' : 'rgba(255,255,255,0.3)'}
                    className="transition-all duration-200"
                  />
                </g>
              )
            })}
          </svg>
        ) : (
          /* Horizontal layout */
          <svg
            viewBox={`0 0 ${svgW} ${svgH}`}
            className="w-full h-full"
            style={{ maxHeight: '100%' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Horizontal guide lines */}
            <line
              x1={pad}
              y1={blockY - 4}
              x2={pad + trackWidth}
              y2={blockY - 4}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 8"
            />
            <line
              x1={pad}
              y1={blockY + blockH + 4}
              x2={pad + trackWidth}
              y2={blockY + blockH + 4}
              stroke="rgba(255,255,255,0.08)"
              strokeDasharray="3 8"
            />

            {/* Track line */}
            <line
              x1={pad}
              y1={trackY}
              x2={pad + trackWidth}
              y2={trackY}
              stroke="rgba(255,255,255,0.18)"
              strokeDasharray="4 6"
            />

            {/* Month tick marks (when month data present and not too dense) */}
            {showMonthRow && Array.from({ length: totalMonths + 1 }, (_, i) => {
              const m = minMonth + i
              const x = monthToX(m)
              const monthIndex = ((m % 12) + 12) % 12
              const isJan = monthIndex === 0
              return (
                <g key={`month-${m}`}>
                  <line
                    x1={x}
                    y1={trackY}
                    x2={x}
                    y2={isJan ? tickY : trackY + 4}
                    stroke={isJan ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}
                    strokeWidth={0.8}
                  />
                  {monthMode === 'full' ? (
                    <text
                      x={x}
                      y={monthLabelY}
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.25)"
                      fontSize="7"
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {MONTH_ABBREV[monthIndex]}
                    </text>
                  ) : (
                    <circle
                      cx={x}
                      cy={monthLabelY - 3}
                      r={1}
                      fill={isJan ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.12)'}
                    />
                  )}
                </g>
              )
            })}

            {/* Year tick marks */}
            {Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
              const year = minYear + i
              const x = monthToX(year * 12)
              return (
                <g key={year}>
                  {!hasMonths && (
                    <line
                      x1={x}
                      y1={trackY}
                      x2={x}
                      y2={tickY}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={0.8}
                    />
                  )}
                  <text
                    x={x}
                    y={yearLabelY}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.3)"
                    fontSize="9"
                    fontFamily="'JetBrains Mono', monospace"
                  >
                    {year}
                  </text>
                </g>
              )
            })}

            {/* Entry blocks */}
            {entries.map((entry, i) => {
              const isActive = i === activeIndex
              const startM = toMonths(entry, false)
              const endM = toMonths(entry, true)
              const x1 = monthToX(startM)
              const x2 = monthToX(endM)
              const w = Math.max(x2 - x1, 20)
              const isPresent = !entry.endYear

              return (
                <g
                  key={i}
                  className={`timeline-block ${isActive ? 'timeline-block-active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <rect
                    x={x1}
                    y={blockY}
                    width={w}
                    height={blockH}
                    rx={3}
                    fill={isActive ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)'}
                    stroke={isActive ? '#fff' : 'rgba(255,255,255,0.25)'}
                    strokeWidth={isActive ? 1.2 : 0.8}
                    className="transition-all duration-200"
                  />

                  {/* Label */}
                  <text
                    x={x1 + w / 2}
                    y={blockY + blockH / 2 + 4}
                    textAnchor="middle"
                    fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'}
                    fontSize={w > 60 ? '11' : '9'}
                    fontWeight={isActive ? '700' : '400'}
                    fontFamily="'JetBrains Mono', monospace"
                    className="pointer-events-none transition-all duration-200"
                  >
                    {entry.label}
                  </text>

                  {/* Present indicator */}
                  {isPresent && (
                    <circle
                      cx={x1 + w}
                      cy={blockY + blockH / 2}
                      r={3}
                      fill="#dfff00"
                      className="timeline-present-dot"
                    />
                  )}

                  {/* Active decorative orbiting dots */}
                  {isActive && (
                    <g
                      className="process-icon-spin"
                      style={{ transformOrigin: `${x1 + w / 2}px ${blockY + blockH / 2}px` }}
                    >
                      <circle cx={x1 + w / 2 + w / 2 + 10} cy={blockY + blockH / 2} r={1.5} fill="rgba(255,255,255,0.2)" />
                      <circle cx={x1 + w / 2 - w / 2 - 10} cy={blockY + blockH / 2} r={1.5} fill="rgba(255,255,255,0.2)" />
                    </g>
                  )}
                </g>
              )
            })}
          </svg>
        )}

        {/* Detail panel */}
        {active && (active.sublabel || (active.details && active.details.length > 0)) && (
          <div
            key={active.label}
            className="absolute z-10"
            style={{
              ...(isMobile
                ? { bottom: 12, left: 12, right: 12, maxWidth: 'none' }
                : { top: 12, right: 12, maxWidth: 220 }),
              background: 'rgba(5,5,5,0.95)',
              border: '1px solid #222',
              borderRadius: 8,
              padding: '0.75rem 1rem',
              minWidth: 160,
            }}
          >
            <div
              className="font-mono text-white font-bold mb-1 flex items-center gap-2"
              style={{ fontSize: '0.85rem' }}
            >
              <span style={{ color: '#60a5fa' }}>*</span>
              {active.label}
            </div>
            {active.sublabel && (
              <div
                className="font-mono text-white/50 mb-2"
                style={{ fontSize: '0.7rem' }}
              >
                {active.sublabel}
              </div>
            )}
            {active.details?.map((item, i) => (
              <div
                key={item}
                className="font-mono text-white/60 process-item-enter"
                style={{
                  fontSize: '0.75rem',
                  lineHeight: 1.7,
                  animationDelay: `${i * 60}ms`,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      {slide.caption && (
        <p
          className="text-white/40 text-center font-mono px-8 pb-10 shrink-0"
          style={{ fontSize: '0.65rem' }}
        >
          {slide.caption}
        </p>
      )}
    </div>
  )
}
