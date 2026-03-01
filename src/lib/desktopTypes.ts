import { createContext } from 'react'

export type AppId = 'projects' | 'about' | 'terminal' | 'links' | 'trash' | 'music' | 'writing' | 'painter' | 'painting-viewer' | 'tamagotchi' | 'doitforher'

export interface WindowState {
  id: string
  appId: AppId
  isOpen: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

export interface DesktopState {
  windows: WindowState[]
  nextZIndex: number
  activeWindowId: string | null
  showHidden: boolean
}

export type DesktopAction =
  | { type: 'OPEN_WINDOW'; appId: AppId }
  | { type: 'CLOSE_WINDOW'; windowId: string }
  | { type: 'FOCUS_WINDOW'; windowId: string }
  | { type: 'MOVE_WINDOW'; windowId: string; position: { x: number; y: number } }
  | { type: 'RESIZE_WINDOW'; windowId: string; size: { width: number; height: number }; position?: { x: number; y: number } }
  | { type: 'CLOSE_ALL_WINDOWS' }
  | { type: 'REVEAL_HIDDEN' }

export interface DesktopContextValue {
  state: DesktopState
  dispatch: React.Dispatch<DesktopAction>
  openApp: (appId: AppId) => void
  closeWindow: (windowId: string) => void
  focusWindow: (windowId: string) => void
  revealHidden: () => void
}

export const DesktopContext = createContext<DesktopContextValue | null>(null)
