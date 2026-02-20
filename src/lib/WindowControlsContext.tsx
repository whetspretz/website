import { createContext } from 'react'

export interface TitleExtra {
  label: string
  onClick: () => void
}

export interface WindowControlsContextValue {
  setOnTitleClick: (handler: (() => void) | undefined) => void
  setTitleExtra: (extra: TitleExtra | undefined) => void
}

export const WindowControlsContext = createContext<WindowControlsContextValue | null>(null)
