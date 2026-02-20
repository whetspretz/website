import { createContext, useContext, useState, useCallback } from 'react'

export interface SavedPainting {
  id: string
  dataUrl: string
  name: string
}

interface PaintingsContextValue {
  paintings: SavedPainting[]
  viewingId: string | null
  savePainting: (dataUrl: string) => string
  removePainting: (id: string) => void
  setViewingId: (id: string | null) => void
}

const PaintingsContext = createContext<PaintingsContextValue | null>(null)

let paintingCounter = 0

export function PaintingsProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [paintings, setPaintings] = useState<SavedPainting[]>([])
  const [viewingId, setViewingId] = useState<string | null>(null)

  const savePainting = useCallback((dataUrl: string): string => {
    paintingCounter++
    const id = `painting-${paintingCounter}`
    const name = `painting_${paintingCounter}.png`
    setPaintings(prev => [...prev, { id, dataUrl, name }])
    return id
  }, [])

  const removePainting = useCallback((id: string): void => {
    setPaintings(prev => prev.filter(p => p.id !== id))
    setViewingId(prev => prev === id ? null : prev)
  }, [])

  return (
    <PaintingsContext value={{ paintings, viewingId, savePainting, removePainting, setViewingId }}>
      {children}
    </PaintingsContext>
  )
}

export function usePaintings(): PaintingsContextValue {
  const ctx = useContext(PaintingsContext)
  if (!ctx) throw new Error('usePaintings must be used within PaintingsProvider')
  return ctx
}
