import { useState, useCallback, useRef } from 'react'
import { CatContext } from '@/lib/catTypes'
import type { SpawnedCat } from '@/lib/catTypes'

export function CatProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [cats, setCats] = useState<SpawnedCat[]>([])
  const [showHeart, setShowHeart] = useState(false)
  const nextId = useRef(0)
  const heartTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const spawnCats = useCallback((): void => {
    const newCats = Array.from({ length: 3 }, () => ({
      id: nextId.current++,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 65,
      vanishing: false,
    }))
    setCats(prev => [...prev, ...newCats])
  }, [])

  const feedCats = useCallback((): void => {
    setCats(prev => prev.map(c => ({ ...c, vanishing: true })))
    setTimeout(() => { setCats([]) }, 500)

    if (heartTimer.current) clearTimeout(heartTimer.current)
    setShowHeart(true)
    heartTimer.current = setTimeout(() => { setShowHeart(false) }, 3000)
  }, [])

  return (
    <CatContext value={{ cats, showHeart, spawnCats, feedCats }}>
      {children}
    </CatContext>
  )
}
