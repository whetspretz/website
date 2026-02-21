import { useRef, useCallback } from 'react'
import { useCats } from '@/lib/useCats'

const REPEL_RADIUS = 120
const MAX_DISPLACEMENT = 12

export function HeroText(): React.JSX.Element {
  const words = ['LIVE,', 'LAUGH,', 'DESIGN.']
  const { cats, feedCats, showHeart } = useCats()
  const hasCats = cats.length > 0 && !cats[0]?.vanishing
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])
  const rafRef = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const refs = letterRefs.current
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i]
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = cx - e.clientX
        const dy = cy - e.clientY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < REPEL_RADIUS) {
          const strength = (1 - dist / REPEL_RADIUS) * MAX_DISPLACEMENT
          const angle = Math.atan2(dy, dx)
          el.style.transform = `translate(${Math.cos(angle) * strength}px, ${Math.sin(angle) * strength}px)`
        } else {
          el.style.transform = 'translate(0, 0)'
        }
      }
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    const refs = letterRefs.current
    for (let i = 0; i < refs.length; i++) {
      if (refs[i]) refs[i].style.transform = 'translate(0, 0)'
    }
  }, [])

  let letterIndex = 0

  return (
    <div className="absolute inset-0 flex items-end md:items-center justify-center pointer-events-none z-[1] pb-16 md:pb-0">
      <div className="flex flex-col items-center">
        <h1
          className="text-ink relative flex flex-col items-center select-none pointer-events-auto"
          style={{
            fontFamily: "'Playfair Display Variable', 'Playfair Display', Georgia, serif",
            fontSize: 'clamp(3rem, 10vw, 12rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
            fontWeight: 400,
            textAlign: 'center',
            opacity: 0.7,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {words.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <span
                className="block"
                style={{
                  animation: `slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s forwards`,
                  ...(i > 0 && { transform: 'translateY(100%)' }),
                }}
              >
                {word.split('').map((char) => {
                  const idx = letterIndex++
                  return (
                    <span
                      key={idx}
                      ref={(el) => { letterRefs.current[idx] = el }}
                      style={{
                        display: 'inline-block',
                        transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
              </span>
            </span>
          ))}
        </h1>
        {hasCats && (
          <button
            onClick={feedCats}
            className="pointer-events-auto font-mono uppercase cursor-pointer transition-transform hover:scale-105 mt-8 font-bold"
            style={{
              fontSize: '1rem',
              letterSpacing: '0.15em',
              padding: '0.75rem 2.5rem',
              lineHeight: 1,
              borderRadius: '8px',
              border: 'none',
              color: '#000',
              animation: 'btn-shimmer-bright 1.2s ease-in-out infinite',
              boxShadow: '0 0 20px rgba(223, 255, 0, 0.4), 0 0 40px rgba(223, 255, 0, 0.15)',
            }}
          >
            Feed cats
          </button>
        )}
        {showHeart && (
          <span
            className="pointer-events-none"
            style={{
              animation: 'heartPop 3s ease forwards',
              fontSize: '1.1rem',
              display: 'inline-block',
              marginTop: '0.5rem',
            }}
          >
            &hearts;
          </span>
        )}
      </div>
    </div>
  )
}
