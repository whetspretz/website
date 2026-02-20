import { useState, useRef } from 'react'
import { verifyPassword } from '@/lib/passwordCheck'

interface PasswordGateProps {
  onUnlocked: () => void
  onBack: () => void
}

function StarburstPath({ cx, cy, r }: { cx: number; cy: number; r: number }): React.JSX.Element {
  const points = 10
  const innerR = r * 0.55
  let d = ''
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI * i) / points - Math.PI / 2
    const radius = i % 2 === 0 ? r : innerR
    const x = cx + radius * Math.cos(angle)
    const y = cy + radius * Math.sin(angle)
    d += i === 0 ? `M${x},${y}` : `L${x},${y}`
  }
  d += 'Z'
  return <path d={d} />
}

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

export function PasswordGate({ onUnlocked, onBack }: PasswordGateProps): React.JSX.Element {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 100, y: 130 })
  const [confetti, setConfetti] = useState<{ key: number } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<SVGSVGElement>): void {
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 200
    const y = ((e.clientY - rect.top) / rect.height) * 280
    setMousePos({ x, y })
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (celebrating) return
    const correct = await verifyPassword(input)
    if (correct) {
      setCelebrating(true)
      setConfetti({ key: Date.now() })
      setTimeout(() => onUnlocked(), 1000)
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 600)
      setTimeout(() => setError(false), 2000)
      setInput('')
    }
  }

  // Creature geometry
  const headCx = 100
  const headCy = 55
  const bodyCx = 100
  const bodyCy = 145
  const leftEye = { cx: 88, cy: 52 }
  const rightEye = { cx: 112, cy: 52 }
  const leftPupil = getPupilOffset(leftEye.cx, leftEye.cy, mousePos.x, mousePos.y)
  const rightPupil = getPupilOffset(rightEye.cx, rightEye.cy, mousePos.x, mousePos.y)

  // Hexagon body
  const hexPoints = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    return `${bodyCx + 32 * Math.cos(angle)},${bodyCy + 32 * Math.sin(angle)}`
  }).join(' ')

  // Eye path builder
  const eyePath = (cx: number, cy: number): string => {
    const ey = 5
    return `M${cx - 9},${cy} Q${cx},${cy - ey} ${cx + 9},${cy} Q${cx},${cy + ey} ${cx - 9},${cy}Z`
  }

  // Happy eye path (upward curves for celebration)
  const happyEyePath = (cx: number, cy: number): string => {
    return `M${cx - 7},${cy + 1} Q${cx},${cy - 5} ${cx + 7},${cy + 1}`
  }

  const creatureColor = celebrating ? '#dfff00' : 'rgba(255,255,255,0.7)'
  const creatureColorDim = celebrating ? 'rgba(223,255,0,0.4)' : 'rgba(255,255,255,0.25)'

  return (
    <div className="flex flex-col h-full font-mono overflow-y-auto" ref={containerRef}>
      {/* Back button */}
      <div className="shrink-0 p-4 pb-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
          style={{ fontSize: '0.7rem', background: 'none', border: 'none', padding: 0 }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <polyline points="7,2 3,6 7,10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          back to projects
        </button>
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* SVG Creature */}
        <div className={`${shaking ? 'guardian-shake' : ''}`} style={{ width: '100%', maxWidth: 200 }}>
          <svg
            ref={svgRef}
            viewBox="0 0 200 280"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleMouseMove}
            className={celebrating ? 'guardian-celebrate' : 'guardian-float'}
            style={{ display: 'block' }}
          >
            {/* Legs */}
            <line x1={85} y1={175} x2={75} y2={230} stroke={creatureColorDim} strokeWidth={1.5} strokeDasharray="4 3" />
            <line x1={115} y1={175} x2={125} y2={230} stroke={creatureColorDim} strokeWidth={1.5} strokeDasharray="4 3" />
            <circle cx={75} cy={232} r={3} fill="none" stroke={creatureColorDim} strokeWidth={1} />
            <circle cx={125} cy={232} r={3} fill="none" stroke={creatureColorDim} strokeWidth={1} />

            {/* Arms */}
            <g className="guardian-arm-wave" style={{ transformOrigin: `${bodyCx - 32}px ${bodyCy}px` }}>
              <line x1={bodyCx - 32} y1={bodyCy} x2={bodyCx - 58} y2={bodyCy - 25} stroke={creatureColorDim} strokeWidth={1.5} strokeDasharray="4 3" />
              <circle cx={bodyCx - 60} cy={bodyCy - 27} r={2.5} fill="none" stroke={creatureColorDim} strokeWidth={1} />
            </g>
            <g className="guardian-arm-wave-reverse" style={{ transformOrigin: `${bodyCx + 32}px ${bodyCy}px` }}>
              <line x1={bodyCx + 32} y1={bodyCy} x2={bodyCx + 58} y2={bodyCy - 25} stroke={creatureColorDim} strokeWidth={1.5} strokeDasharray="4 3" />
              <circle cx={bodyCx + 60} cy={bodyCy - 27} r={2.5} fill="none" stroke={creatureColorDim} strokeWidth={1} />
            </g>

            {/* Body hexagon */}
            <polygon
              points={hexPoints}
              fill="none"
              stroke={creatureColor}
              strokeWidth={1.2}
            />

            {/* Body starburst (spinning) */}
            <g
              style={{ transformOrigin: `${bodyCx}px ${bodyCy}px` }}
              className="guardian-body-spin"
            >
              <g
                fill="none"
                stroke={creatureColorDim}
                strokeWidth={0.8}
              >
                <StarburstPath cx={bodyCx} cy={bodyCy} r={22} />
              </g>
            </g>

            {/* Body center dot */}
            <circle cx={bodyCx} cy={bodyCy} r={4} fill={creatureColor} />

            {/* Neck connector */}
            <line x1={headCx} y1={headCy + 30} x2={bodyCx} y2={bodyCy - 32} stroke={creatureColorDim} strokeWidth={1} />

            {/* Head — concentric circles */}
            <g className="guardian-head-pulse" style={{ transformOrigin: `${headCx}px ${headCy}px` }}>
              <circle cx={headCx} cy={headCy} r={30} fill="none" stroke={creatureColor} strokeWidth={1.2} />
              <circle cx={headCx} cy={headCy} r={22} fill="none" stroke={creatureColorDim} strokeWidth={0.8} />
              <circle cx={headCx} cy={headCy} r={14} fill="none" stroke={creatureColorDim} strokeWidth={0.5} />
            </g>

            {/* Eyes */}
            <g className="guardian-eye-blink" style={{ transformOrigin: `${headCx}px ${headCy - 3}px` }}>
              {celebrating ? (
                <>
                  <path d={happyEyePath(leftEye.cx, leftEye.cy)} fill="none" stroke={creatureColor} strokeWidth={1.5} strokeLinecap="round" />
                  <path d={happyEyePath(rightEye.cx, rightEye.cy)} fill="none" stroke={creatureColor} strokeWidth={1.5} strokeLinecap="round" />
                </>
              ) : (
                <>
                  <path d={eyePath(leftEye.cx, leftEye.cy)} fill="none" stroke={creatureColor} strokeWidth={1} />
                  <circle cx={leftEye.cx + leftPupil.dx} cy={leftEye.cy + leftPupil.dy} r={2.5} fill={creatureColor} />
                  <path d={eyePath(rightEye.cx, rightEye.cy)} fill="none" stroke={creatureColor} strokeWidth={1} />
                  <circle cx={rightEye.cx + rightPupil.dx} cy={rightEye.cy + rightPupil.dy} r={2.5} fill={creatureColor} />
                </>
              )}
            </g>

            {/* Mouth — small line that curves when celebrating */}
            {celebrating ? (
              <path
                d={`M${headCx - 6},${headCy + 12} Q${headCx},${headCy + 18} ${headCx + 6},${headCy + 12}`}
                fill="none"
                stroke={creatureColor}
                strokeWidth={1}
                strokeLinecap="round"
              />
            ) : (
              <line
                x1={headCx - 5}
                y1={headCy + 13}
                x2={headCx + 5}
                y2={headCy + 13}
                stroke={creatureColorDim}
                strokeWidth={1}
                strokeLinecap="round"
              />
            )}

            {/* Decorative orbiting dots */}
            <g className="process-icon-spin" style={{ transformOrigin: `${headCx}px ${headCy}px` }}>
              <circle cx={headCx + 35} cy={headCy} r={1.5} fill={creatureColorDim} />
              <circle cx={headCx - 35} cy={headCy} r={1.5} fill={creatureColorDim} />
              <circle cx={headCx} cy={headCy - 35} r={1.5} fill={creatureColorDim} />
            </g>
          </svg>
        </div>

        {/* "none shall pass" */}
        <p
          className="text-white/50 text-center mt-4 mb-6"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          none shall pass
        </p>

        {/* Password form */}
        <form onSubmit={handleSubmit} className="flex gap-2 w-full" style={{ maxWidth: 280 }}>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="enter password"
            className={`flex-1 font-mono text-white bg-white/5 px-3 py-2 outline-none transition-colors ${error ? 'guardian-input-error' : ''}`}
            style={{
              fontSize: '0.8rem',
              borderRadius: 4,
              border: error ? '1px solid #fb7185' : '1px solid rgba(255,255,255,0.1)',
            }}
            autoFocus
            disabled={celebrating}
          />
          <button
            type="submit"
            className="font-mono text-black bg-white px-4 py-2 cursor-pointer hover:bg-white/90 transition-colors"
            style={{ fontSize: '0.8rem', borderRadius: 4, border: 'none' }}
            disabled={celebrating}
          >
            enter
          </button>
        </form>

        {/* Error message */}
        {error && (
          <p
            className="text-center mt-3"
            style={{ color: '#fb7185', fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace" }}
          >
            wrong password
          </p>
        )}

        {/* Confetti */}
        {confetti && (
          <div
            key={confetti.key}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {Array.from({ length: 40 }, (_, i) => {
              const hash = (n: number): number => (((n * 2654435761) >>> 0) / 4294967296)
              const seed = confetti.key
              const angle = hash(i * 17 + seed) * Math.PI * 2
              const dist = 80 + hash(i * 13 + seed) * 160
              const dx = Math.cos(angle) * dist
              const dy = Math.sin(angle) * dist - 60
              const colors = ['#dfff00', '#00ffd5', '#60a5fa', '#c084fc', '#fb7185', '#fbbf24']
              const size = 4 + hash(i * 11 + seed) * 6
              const delay = hash(i * 23 + seed) * 150
              const rot = (hash(i * 7 + seed) - 0.5) * 720
              return (
                <div
                  key={i}
                  className="process-confetti"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    width: size,
                    height: size * 0.6,
                    borderRadius: 1,
                    background: colors[i % colors.length],
                    '--confetti-dx': `${dx}px`,
                    '--confetti-dy': `${dy}px`,
                    '--confetti-rot': `${rot}deg`,
                    animationDelay: `${delay}ms`,
                  } as React.CSSProperties}
                />
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
