import { useState, useEffect, useRef } from 'react'

const M_POINTS: [number, number][] = [[1, 19], [1, 3], [10, 13], [19, 3], [19, 19]]
const W_POINTS: [number, number][] = [[1, 3], [5, 19], [10, 7], [15, 19], [19, 3]]
const DEPTH_X = 2.5
const DEPTH_Y = 2.5

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function getPoints(t: number): [number, number][] {
  return M_POINTS.map((m, i) => [
    lerp(m[0], W_POINTS[i][0], t),
    lerp(m[1], W_POINTS[i][1], t),
  ])
}

function toPath(pts: [number, number][]): string {
  return `M ${pts.map(p => `${p[0]},${p[1]}`).join(' ')}`
}

export function MWLogo(): React.JSX.Element {
  const [hovered, setHovered] = useState(false)
  const [t, setT] = useState(0)
  const [wiggle, setWiggle] = useState(0)
  const rafRef = useRef(0)
  const startRef = useRef(0)

  useEffect(() => {
    startRef.current = performance.now()
    const tick = (now: number) => {
      const elapsed = (now - startRef.current) / 1000
      setT((Math.sin(elapsed * 0.9) + 1) / 2)
      setWiggle(elapsed)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const front = getPoints(t)
  const back: [number, number][] = front.map(([x, y]) => [x + DEPTH_X, y + DEPTH_Y])

  const frontPath = toPath(front)
  const backPath = toPath(back)

  // Wiggle rotation on hover (fast subtle oscillation)
  const wiggleAngle = hovered ? Math.sin(wiggle * 12) * 2.5 : 0

  return (
    <svg
      width="32"
      height="26"
      viewBox="-1 0 24 24"
      fill="none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        cursor: 'default',
        filter: hovered ? 'drop-shadow(0 0 8px rgba(223,255,0,0.3))' : 'none',
        transform: `rotate(${wiggleAngle}deg)`,
        transition: hovered ? 'filter 200ms ease' : 'filter 200ms ease, transform 300ms ease',
      }}
    >
      <defs>
        <linearGradient id="mw-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#dfff00">
            <animate attributeName="stop-color" values="#dfff00;#00ffd5;#60a5fa;#c084fc;#fb7185;#dfff00" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="33%" stopColor="#00ffd5">
            <animate attributeName="stop-color" values="#00ffd5;#60a5fa;#c084fc;#fb7185;#dfff00;#00ffd5" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="66%" stopColor="#60a5fa">
            <animate attributeName="stop-color" values="#60a5fa;#c084fc;#fb7185;#dfff00;#00ffd5;#60a5fa" dur="3s" repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#c084fc">
            <animate attributeName="stop-color" values="#c084fc;#fb7185;#dfff00;#00ffd5;#60a5fa;#c084fc" dur="3s" repeatCount="indefinite" />
          </stop>
        </linearGradient>
      </defs>

      {/* Depth edges */}
      {front.map(([fx, fy], i) => (
        <line
          key={i}
          x1={fx} y1={fy}
          x2={back[i][0]} y2={back[i][1]}
          stroke={hovered ? 'url(#mw-rainbow)' : 'rgba(255,255,255,0.12)'}
          strokeWidth="0.8"
          strokeLinecap="round"
          strokeOpacity={hovered ? 0.3 : 1}
        />
      ))}
      {/* Back face */}
      <path
        d={backPath}
        stroke={hovered ? 'url(#mw-rainbow)' : 'rgba(255,255,255,0.2)'}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity={hovered ? 0.35 : 1}
      />
      {/* Front face */}
      <path
        d={frontPath}
        stroke={hovered ? 'url(#mw-rainbow)' : 'rgba(255,255,255,0.85)'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
