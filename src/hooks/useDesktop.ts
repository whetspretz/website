import { useContext } from 'react'
import { DesktopContext } from '@/lib/desktopTypes'
import type { DesktopContextValue } from '@/lib/desktopTypes'

export function useDesktop(): DesktopContextValue {
  const ctx = useContext(DesktopContext)
  if (!ctx) throw new Error('useDesktop must be used within DesktopProvider')
  return ctx
}
