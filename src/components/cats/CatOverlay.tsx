import { useCats } from '@/lib/useCats'

export function CatOverlay(): React.JSX.Element {
  const { cats } = useCats()

  if (cats.length === 0) return <></>

  return (
    <div className="absolute inset-0 pointer-events-none z-[500]">
      {cats.map(cat => (
        <img
          key={cat.id}
          src="/cat-running.gif"
          alt=""
          style={{
            position: 'absolute',
            top: `${cat.y}%`,
            left: `${cat.x}%`,
            width: '40px',
            pointerEvents: 'none',
            animation: cat.vanishing
              ? 'catVanish 0.5s ease forwards'
              : 'catDrop 0.4s ease-out forwards',
          }}
        />
      ))}
    </div>
  )
}
