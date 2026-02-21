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

export function MusicApp(): React.JSX.Element {
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
  const accentColor = '#c084fc'
  const accentDim = 'rgba(192,132,252,0.3)'

  // Rounded body (pill/capsule)
  const bodyW = 28
  const bodyH = 32

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
          {/* Headphones */}
          <path
            d={`M${headCx - 30},${headCy - 2} Q${headCx - 32},${headCy - 36} ${headCx},${headCy - 38} Q${headCx + 32},${headCy - 36} ${headCx + 30},${headCy - 2}`}
            fill="none"
            stroke={accentColor}
            strokeWidth={2}
          />
          {/* Left ear cup */}
          <rect
            x={headCx - 37} y={headCy - 8}
            width={10} height={16} rx={3}
            fill="none"
            stroke={accentColor}
            strokeWidth={1.5}
          />
          {/* Right ear cup */}
          <rect
            x={headCx + 27} y={headCy - 8}
            width={10} height={16} rx={3}
            fill="none"
            stroke={accentColor}
            strokeWidth={1.5}
          />

          {/* Legs */}
          <line x1={85} y1={bodyCy + bodyH} x2={75} y2={220} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
          <line x1={115} y1={bodyCy + bodyH} x2={125} y2={220} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
          <circle cx={75} cy={222} r={3} fill="none" stroke={colorDim} strokeWidth={1} />
          <circle cx={125} cy={222} r={3} fill="none" stroke={colorDim} strokeWidth={1} />

          {/* Arms */}
          <g className="guardian-arm-wave" style={{ transformOrigin: `${bodyCx - bodyW}px ${bodyCy}px` }}>
            <line x1={bodyCx - bodyW} y1={bodyCy} x2={bodyCx - 55} y2={bodyCy - 20} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
            {/* Music note */}
            <g>
              <line x1={bodyCx - 58} y1={bodyCy - 30} x2={bodyCx - 58} y2={bodyCy - 18} stroke={accentColor} strokeWidth={1.2} />
              <circle cx={bodyCx - 61} cy={bodyCy - 17} r={2.5} fill="none" stroke={accentColor} strokeWidth={1} />
            </g>
          </g>
          <g className="guardian-arm-wave-reverse" style={{ transformOrigin: `${bodyCx + bodyW}px ${bodyCy}px` }}>
            <line x1={bodyCx + bodyW} y1={bodyCy} x2={bodyCx + 55} y2={bodyCy - 20} stroke={colorDim} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={bodyCx + 57} cy={bodyCy - 22} r={2.5} fill="none" stroke={colorDim} strokeWidth={1} />
          </g>

          {/* Body — rounded rect */}
          <rect
            x={bodyCx - bodyW} y={bodyCy - bodyH}
            width={bodyW * 2} height={bodyH * 2}
            rx={14}
            fill="none"
            stroke={color}
            strokeWidth={1.2}
          />

          {/* Inner circle (spinning) */}
          <g
            style={{ transformOrigin: `${bodyCx}px ${bodyCy}px` }}
            className="guardian-body-spin"
          >
            <circle
              cx={bodyCx} cy={bodyCy} r={18}
              fill="none"
              stroke={colorDim}
              strokeWidth={0.8}
              strokeDasharray="4 3"
            />
          </g>

          {/* Body center dot */}
          <circle cx={bodyCx} cy={bodyCy} r={4} fill={color} />

          {/* Neck */}
          <line x1={headCx} y1={headCy + 30} x2={bodyCx} y2={bodyCy - bodyH} stroke={colorDim} strokeWidth={1} />

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

          {/* Floating music notes */}
          <g className="overwhelmed-float-1" style={{ opacity: 0.3 }}>
            <line x1={155} y1={50} x2={155} y2={38} stroke={accentColor} strokeWidth={0.8} />
            <circle cx={152} cy={51} r={2} fill="none" stroke={accentColor} strokeWidth={0.8} />
          </g>
          <g className="overwhelmed-float-2" style={{ opacity: 0.2 }}>
            <line x1={45} y1={70} x2={45} y2={58} stroke={accentColor} strokeWidth={0.8} />
            <circle cx={42} cy={71} r={2} fill="none" stroke={accentColor} strokeWidth={0.8} />
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
