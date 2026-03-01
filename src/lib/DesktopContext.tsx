import { useReducer, useCallback } from 'react'
import { DesktopContext } from '@/lib/desktopTypes'
import type { DesktopState, DesktopAction, AppId } from '@/lib/desktopTypes'
import { APP_REGISTRY } from '@/lib/desktopApps'

const initialState: DesktopState = {
  windows: [],
  nextZIndex: 10,
  activeWindowId: null,
  showHidden: false,
}

function desktopReducer(state: DesktopState, action: DesktopAction): DesktopState {
  switch (action.type) {
    case 'OPEN_WINDOW': {
      const existing = state.windows.find(w => w.appId === action.appId)
      if (existing) {
        // Already open — just focus it
        const newZ = state.nextZIndex
        return {
          ...state,
          windows: state.windows.map(w =>
            w.id === existing.id ? { ...w, isOpen: true, zIndex: newZ } : w
          ),
          nextZIndex: newZ + 1,
          activeWindowId: existing.id,
        }
      }
      const app = APP_REGISTRY[action.appId]
      const id = `${action.appId}-${Date.now()}`
      // Clamp size/position to viewport
      const vpW = window.innerWidth
      const vpH = window.innerHeight
      const isMobileVp = vpW < 768
      const pad = 8
      const taskbarH = 40

      // Mobile: all windows fullscreen
      // Desktop: projects/about expanded, others use defaults
      const expanded = isMobileVp || action.appId === 'projects' || action.appId === 'about'
      const margin = isMobileVp ? 0 : 24
      const topOffset = isMobileVp ? 0 : taskbarH + margin
      const width = expanded ? vpW - margin * 2 : Math.min(app.defaultSize.width, vpW - pad * 2)
      const height = expanded ? vpH - topOffset - margin : Math.min(app.defaultSize.height, vpH - taskbarH - pad * 2)
      const x = expanded ? margin : Math.max(pad, Math.min(app.defaultPosition.x, vpW - width - pad))
      const y = expanded ? topOffset : Math.max(pad, Math.min(app.defaultPosition.y, vpH - height - taskbarH - pad))
      const newWindow = {
        id,
        appId: action.appId,
        isOpen: true,
        position: { x, y },
        size: { width, height },
        zIndex: state.nextZIndex,
      }
      return {
        ...state,
        windows: [...state.windows, newWindow],
        nextZIndex: state.nextZIndex + 1,
        activeWindowId: id,
      }
    }
    case 'CLOSE_WINDOW': {
      return {
        ...state,
        windows: state.windows.filter(w => w.id !== action.windowId),
        activeWindowId: state.activeWindowId === action.windowId ? null : state.activeWindowId,
      }
    }
    case 'FOCUS_WINDOW': {
      const newZ = state.nextZIndex
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, zIndex: newZ } : w
        ),
        nextZIndex: newZ + 1,
        activeWindowId: action.windowId,
      }
    }
    case 'MOVE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId ? { ...w, position: action.position } : w
        ),
      }
    }
    case 'RESIZE_WINDOW': {
      return {
        ...state,
        windows: state.windows.map(w =>
          w.id === action.windowId
            ? { ...w, size: action.size, ...(action.position ? { position: action.position } : {}) }
            : w
        ),
      }
    }
    case 'CLOSE_ALL_WINDOWS':
      return { ...initialState }
    case 'REVEAL_HIDDEN':
      return { ...state, showHidden: true }
    default:
      return state
  }
}

export function DesktopProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  const [state, dispatch] = useReducer(desktopReducer, initialState)

  const openApp = useCallback((appId: AppId): void => {
    dispatch({ type: 'OPEN_WINDOW', appId })
  }, [])

  const closeWindow = useCallback((windowId: string): void => {
    dispatch({ type: 'CLOSE_WINDOW', windowId })
  }, [])

  const focusWindow = useCallback((windowId: string): void => {
    dispatch({ type: 'FOCUS_WINDOW', windowId })
  }, [])

  const revealHidden = useCallback((): void => {
    dispatch({ type: 'REVEAL_HIDDEN' })
  }, [])

  return (
    <DesktopContext value={{ state, dispatch, openApp, closeWindow, focusWindow, revealHidden }}>
      {children}
    </DesktopContext>
  )
}
