import { useState, useRef } from 'react'

function getPupilOffset(
  eyeCx: number,
  eyeCy: number,
  mouseX: number,
  mouseY: number,
): { dx: number; dy: number } {
  const dx = mouseX - eyeCx
  const dy = mouseY - eyeCy
  const dist = Math.sqrt(dx * dx + dy * dy)
  const maxOffset = 3
  if (dist === 0) return { dx: 0, dy: 0 }
  const scale = Math.min(maxOffset / dist, 1)
  return { dx: dx * scale, dy: dy * scale }
}

export function WritingApp(): React.JSX.Element {
  const [mousePos, setMousePos] = useState({ x: 100, y: 100 })
  const svgRef = useRef<SVGSVGElement>(null)

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>): void {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 200
    const y = ((e.clientY - rect.top) / rect.height) * 260
    setMousePos({ x, y })
  }

  const headCx = 100
  const headCy = 60
  const bodyCx = 100
  const bodyCy = 145

  const leftEye = { cx: 88, cy: 57 }
  const rightEye = { cx: 112, cy: 57 }
  const leftPupil = getPupilOffset(leftEye.cx, leftEye.cy, mousePos.x, mousePos.y)
  const rightPupil = getPupilOffset(rightEye.cx, rightEye.cy, mousePos.x, mousePos.y)

  const color = 'rgba(255,255,255,0.7)'
  const colorDim = 'rgba(255,255,255,0.25)'
  const accentColor = '#fbbf24'
  const accentDim = 'rgba(251,191,36,0.3)'

  // Diamond body
  const diamondPoints = `${bodyCx},${bodyCy - 34} ${bodyCx + 30},${bodyCy} ${bodyCx},${bodyCy + 34} ${bodyCx - 30},${bodyCy}`

  // Eye path
  const eyePath = (cx: number, cy: number): string => {
    const ey = 5
    return `M${cx - 9},${cy} Q${cx},${cy - ey} ${cx + 9},${cy} Q${cx},${cy + ey} ${cx - 9},${cy}Z`
  }

  return (
    <div className="flex flex-col items-center justify-center h-full font-mono px-6">
      <div style={{ width: '100%', maxWidth: 180 }}>
        <svg
          ref={svgRef}
          viewBox="0 0 200 260"
          width="100%"
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMouseMove}
          className="guardian-float"
          style={{ display: 'block' }}
        >
          {/* Hard hat */}
          <path
            d={`M${headCx - 26},${headCy - 22} L${headCx - 32},${headCy - 22} L${headCx - 32},${headCy - 18} L${headCx + 32},${headCy - 18} L${headCx + 32},${headCy - 22} L${headCx + 26},${headCy - 22}`}
            fill="none"
            stroke={accentColor}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
          <path
            d={`M${headCx - 20},${headCy - 22} Q${headCx - 20},${headCy - 38} ${headCx},${headCy - 40} Q${headCx + 20},${headCy - 38} ${headCx + 20},${headCy - 22}`}
            fill="none"
            stroke={accentColor}
            strokeWidth={1.5}
          />
          {/* Hat stripe */}
          <line
            x1={headCx - 14} y1={headCy - 30}
            x2={headCx + 14} y2={headCy - 30}
            stroke={accentDim}
            strokeWidth={2}
          />

          {/* Legs */}
          <line x1={85} y1={bodyCy + 34} x2={75} y2={220} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
          <line x1={115} y1={bodyCy + 34} x2={125} y2={220} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
          <circle cx={75} cy={222} r={3} fill="none" stroke={colorDim} strokeWidth={1} />
          <circle cx={125} cy={222} r={3} fill="none" stroke={colorDim} strokeWidth={1} />

          {/* Arms */}
          <g className="guardian-arm-wave" style={{ transformOrigin: `${bodyCx - 30}px ${bodyCy}px` }}>
            <line x1={bodyCx - 30} y1={bodyCy} x2={bodyCx - 55} y2={bodyCy - 20} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
            {/* Wrench */}
            <g style={{ transform: `translate(${bodyCx - 58}px, ${bodyCy - 24}px) rotate(-30deg)` }}>
              <line x1={0} y1={0} x2={0} y2={-14} stroke={accentColor} strokeWidth={1.2} />
              <circle cx={0} cy={-16} r={3.5} fill="none" stroke={accentColor} strokeWidth={1.2} />
            </g>
          </g>
          <g className="guardian-arm-wave-reverse" style={{ transformOrigin: `${bodyCx + 30}px ${bodyCy}px` }}>
            <line x1={bodyCx + 30} y1={bodyCy} x2={bodyCx + 55} y2={bodyCy - 20} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={bodyCx + 57} cy={bodyCy - 22} r={2.5} fill="none" stroke={colorDim} strokeWidth={1} />
          </g>

          {/* Body diamond */}
          <polygon
            points={diamondPoints}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
          />

          {/* Inner diamond (spinning) */}
          <g
            style={{ transformOrigin: `${bodyCx}px ${bodyCy}px` }}
            className="guardian-body-spin"
          >
            <polygon
              points={`${bodyCx},${bodyCy - 18} ${bodyCx + 16},${bodyCy} ${bodyCx},${bodyCy + 18} ${bodyCx - 16},${bodyCy}`}
              fill="none"
              stroke={colorDim}
              strokeWidth={0.8}
            />
          </g>

          {/* Body center dot */}
          <circle cx={bodyCx} cy={bodyCy} r={4} fill={color} />

          {/* Neck */}
          <line x1={headCx} y1={headCy + 30} x2={bodyCx} y2={bodyCy - 34} stroke={colorDim} strokeWidth={1} />

          {/* Head */}
          <g className="guardian-head-pulse" style={{ transformOrigin: `${headCx}px ${headCy}px` }}>
            <circle cx={headCx} cy={headCy} r={30} fill="none" stroke={color} strokeWidth={1.2} />
            <circle cx={headCx} cy={headCy} r={22} fill="none" stroke={colorDim} strokeWidth={0.8} />
          </g>

          {/* Eyes */}
          <g className="guardian-eye-blink" style={{ transformOrigin: `${headCx}px ${headCy - 3}px` }}>
            <path d={eyePath(leftEye.cx, leftEye.cy)} fill="none" stroke={color} strokeWidth={1} />
            <circle cx={leftEye.cx + leftPupil.dx} cy={leftEye.cy + leftPupil.dy} r={2.5} fill={color} />
            <path d={eyePath(rightEye.cx, rightEye.cy)} fill="none" stroke={color} strokeWidth={1} />
            <circle cx={rightEye.cx + rightPupil.dx} cy={rightEye.cy + rightPupil.dy} r={2.5} fill={color} />
          </g>

          {/* Mouth — little smile */}
          <path
            d={`M${headCx - 5},${headCy + 13} Q${headCx},${headCy + 16} ${headCx + 5},${headCy + 13}`}
            fill="none"
            stroke={colorDim}
            strokeWidth={1}
            strokeLinecap="round"
          />

          {/* Orbiting dots */}
          <g className="process-icon-spin" style={{ transformOrigin: `${headCx}px ${headCy}px` }}>
            <circle cx={headCx + 35} cy={headCy} r={1.5} fill={colorDim} />
            <circle cx={headCx - 35} cy={headCy} r={1.5} fill={colorDim} />
            <circle cx={headCx} cy={headCy - 35} r={1.5} fill={accentDim} />
          </g>
        </svg>
      </div>

      <p
        className="text-white/50 text-center mt-4"
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        under construction
      </p>
      <p
        className="text-white/25 text-center mt-2"
        style={{ fontSize: '0.6rem' }}
      >
        check back soon
      </p>
    </div>
  )
}
