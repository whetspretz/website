import { useContext } from 'react'
import { CatContext } from '@/lib/catTypes'
import type { CatContextValue } from '@/lib/catTypes'

const noop = (): void => {}
const defaultValue: CatContextValue = { cats: [], showHeart: false, spawnCats: noop, feedCats: noop }

export function useCats(): CatContextValue {
  return useContext(CatContext) ?? defaultValue
}
