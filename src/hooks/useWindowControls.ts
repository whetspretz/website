import { useContext } from 'react'
import { WindowControlsContext } from '@/lib/WindowControlsContext'
import type { WindowControlsContextValue } from '@/lib/WindowControlsContext'

export function useWindowControls(): WindowControlsContextValue {
  const ctx = useContext(WindowControlsContext)
  if (!ctx) throw new Error('useWindowControls must be used within a Window')
  return ctx
}
