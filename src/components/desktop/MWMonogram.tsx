import { useCats } from '@/lib/useCats'

export function HeroText(): React.JSX.Element {
  const words = ['LIVE,', 'LAUGH,', 'DESIGN.']
  const { cats, feedCats, showHeart } = useCats()
  const hasCats = cats.length > 0 && !cats[0]?.vanishing

  return (
    <div className="absolute inset-0 flex items-end md:items-center justify-center pointer-events-none z-[1] pb-16 md:pb-0">
      <div className="flex flex-col items-center">
        <h1
          className="text-ink relative flex flex-col items-center select-none"
          style={{
            fontFamily: "'Playfair Display Variable', 'Playfair Display', Georgia, serif",
            fontSize: 'clamp(3rem, 10vw, 12rem)',
            lineHeight: 0.8,
            letterSpacing: '-0.06em',
            fontWeight: 400,
            textAlign: 'center',
            opacity: 0.7,
          }}
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
                {word}
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
