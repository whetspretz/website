import { usePaintings } from '@/lib/PaintingsContext'

export function PaintingViewerApp(): React.JSX.Element {
  const { paintings, viewingId } = usePaintings()
  const painting = paintings.find(p => p.id === viewingId)

  if (!painting) {
    return (
      <div className="font-mono flex items-center justify-center h-full">
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}>
          no painting selected
        </span>
      </div>
    )
  }

  return (
    <div className="font-mono flex flex-col h-full">
      <div
        className="flex items-center justify-between pb-2 mb-2 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em' }}>
          {painting.name}
        </span>
      </div>
      <div className="flex-1 min-h-0 flex items-center justify-center">
        <img
          src={painting.dataUrl}
          alt={painting.name}
          className="max-w-full max-h-full"
          style={{ borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>
    </div>
  )
}
