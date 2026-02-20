import { createContext } from 'react'

export interface SpawnedCat {
  id: number
  x: number
  y: number
  vanishing: boolean
}

export interface CatContextValue {
  cats: SpawnedCat[]
  showHeart: boolean
  spawnCats: () => void
  feedCats: () => void
}

export const CatContext = createContext<CatContextValue | null>(null)
