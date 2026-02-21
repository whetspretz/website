import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useDesktop } from '@/hooks/useDesktop'
import { useIsMobile } from '@/hooks/useIsMobile'
import { WindowTitleBar } from '@/components/window/WindowTitleBar'
import { WindowControlsContext } from '@/lib/WindowControlsContext'
import type { TitleExtra } from '@/lib/WindowControlsContext'
import type { WindowState } from '@/lib/desktopTypes'

interface WindowProps {
  windowState: WindowState
  title: string
  children: React.ReactNode
}

type ResizeDir = 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w' | 'nw'
const RESIZE_DIRS: ResizeDir[] = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']

const CURSOR_MAP: Record<ResizeDir, string> = {
  n: 'ns-resize', ne: 'nesw-resize', e: 'ew-resize', se: 'nwse-resize',
  s: 'ns-resize', sw: 'nesw-resize', w: 'ew-resize', nw: 'nwse-resize',
}

const MIN_W = 300
const MIN_H = 200
const TASKBAR_H = 40

function getHandleStyle(dir: ResizeDir): React.CSSProperties {
  const E = 6
  const base: React.CSSProperties = { position: 'absolute', zIndex: 10, cursor: CURSOR_MAP[dir] }
  const map: Record<ResizeDir, React.CSSProperties> = {
    n:  { top: -E/2, left: E, right: E, height: E, ...base },
    ne: { top: -E/2, right: -E/2, width: E*2, height: E*2, ...base },
    e:  { top: E, right: -E/2, bottom: E, width: E, ...base },
    se: { bottom: -E/2, right: -E/2, width: E*2, height: E*2, ...base },
    s:  { bottom: -E/2, left: E, right: E, height: E, ...base },
    sw: { bottom: -E/2, left: -E/2, width: E*2, height: E*2, ...base },
    w:  { top: E, left: -E/2, bottom: E, width: E, ...base },
    nw: { top: -E/2, left: -E/2, width: E*2, height: E*2, ...base },
  }
  return map[dir]
}

export function Window({ windowState, title, children }: WindowProps): React.JSX.Element {
  const { dispatch, focusWindow } = useDesktop()
  const isMobile = useIsMobile()
  const [onTitleClick, setOnTitleClick] = useState<(() => void) | undefined>(undefined)
  const [titleExtra, setTitleExtra] = useState<TitleExtra | undefined>(undefined)
  const windowControls = useMemo(() => ({ setOnTitleClick, setTitleExtra }), [])

  // Local visual state — always synced from context, plus live drag/resize offsets
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeOffset, setResizeOffset] = useState({ dw: 0, dh: 0, dx: 0, dy: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)

  const dragStartRef = useRef({ mouseX: 0, mouseY: 0 })
  const resizeStartRef = useRef({ mouseX: 0, mouseY: 0, w: 0, h: 0 })
  const resizeDirRef = useRef<ResizeDir>('se')
  const resizeOffsetRef = useRef({ dw: 0, dh: 0, dx: 0, dy: 0 })
  const rafRef = useRef(0)

  // Drag handlers
  const onDragStart = useCallback((e: React.MouseEvent): void => {
    e.preventDefault()
    dragStartRef.current = { mouseX: e.clientX, mouseY: e.clientY }
    setDragOffset({ x: 0, y: 0 })
    setIsDragging(true)
    focusWindow(windowState.id)
  }, [windowState.id, focusWindow])

  useEffect(() => {
    if (!isDragging) return

    const onMove = (e: MouseEvent): void => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rawX = windowState.position.x + (e.clientX - dragStartRef.current.mouseX)
        const rawY = windowState.position.y + (e.clientY - dragStartRef.current.mouseY)
        const maxX = Math.max(0, window.innerWidth - windowState.size.width)
        const maxY = Math.max(TASKBAR_H, window.innerHeight - windowState.size.height - TASKBAR_H)
        setDragOffset({
          x: Math.max(0, Math.min(rawX, maxX)) - windowState.position.x,
          y: Math.max(TASKBAR_H, Math.min(rawY, maxY)) - windowState.position.y,
        })
      })
    }

    const onUp = (e: MouseEvent): void => {
      setIsDragging(false)
      cancelAnimationFrame(rafRef.current)
      const rawX = windowState.position.x + (e.clientX - dragStartRef.current.mouseX)
      const rawY = windowState.position.y + (e.clientY - dragStartRef.current.mouseY)
      const maxX = Math.max(0, window.innerWidth - windowState.size.width)
      const maxY = Math.max(TASKBAR_H, window.innerHeight - windowState.size.height - TASKBAR_H)
      dispatch({
        type: 'MOVE_WINDOW',
        windowId: windowState.id,
        position: {
          x: Math.max(0, Math.min(rawX, maxX)),
          y: Math.max(TASKBAR_H, Math.min(rawY, maxY)),
        },
      })
      setDragOffset({ x: 0, y: 0 })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.body.style.cursor = 'grabbing'
    document.body.style.userSelect = 'none'

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      cancelAnimationFrame(rafRef.current)
    }
  }, [isDragging, dispatch, windowState.id, windowState.position, windowState.size])

  // Resize handlers
  const onResizeStart = useCallback((dir: ResizeDir, e: React.MouseEvent): void => {
    e.preventDefault()
    e.stopPropagation()
    resizeDirRef.current = dir
    resizeStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      w: windowState.size.width,
      h: windowState.size.height,
    }
    setResizeOffset({ dw: 0, dh: 0, dx: 0, dy: 0 })
    setIsResizing(true)
    focusWindow(windowState.id)
  }, [windowState.id, windowState.size, focusWindow])

  useEffect(() => {
    if (!isResizing) return

    const onMove = (e: MouseEvent): void => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const mx = e.clientX - resizeStartRef.current.mouseX
        const my = e.clientY - resizeStartRef.current.mouseY
        const dir = resizeDirRef.current
        let dw = 0, dh = 0, dx = 0, dy = 0
        const sw = resizeStartRef.current.w
        const sh = resizeStartRef.current.h

        if (dir.includes('e')) dw = mx
        if (dir.includes('w')) { dw = -mx; dx = mx }
        if (dir.includes('s')) dh = my
        if (dir.includes('n')) { dh = -my; dy = my }

        // Enforce minimum
        if (sw + dw < MIN_W) { dw = MIN_W - sw; if (dir.includes('w')) dx = sw - MIN_W }
        if (sh + dh < MIN_H) { dh = MIN_H - sh; if (dir.includes('n')) dy = sh - MIN_H }

        // Clamp to viewport
        const vpW = window.innerWidth
        const vpH = window.innerHeight - TASKBAR_H
        if (dir.includes('e') && windowState.position.x + sw + dw > vpW) {
          dw = vpW - windowState.position.x - sw
        }
        if (dir.includes('s') && windowState.position.y + sh + dh > vpH) {
          dh = vpH - windowState.position.y - sh
        }
        if (dir.includes('w') && windowState.position.x + dx < 0) {
          dw = windowState.position.x
          dx = -windowState.position.x
        }
        if (dir.includes('n') && windowState.position.y + dy < 0) {
          dh = windowState.position.y
          dy = -windowState.position.y
        }

        resizeOffsetRef.current = { dw, dh, dx, dy }
        setResizeOffset({ dw, dh, dx, dy })
      })
    }

    const onUp = (): void => {
      setIsResizing(false)
      cancelAnimationFrame(rafRef.current)
      const { dw, dh, dx, dy } = resizeOffsetRef.current
      dispatch({
        type: 'RESIZE_WINDOW',
        windowId: windowState.id,
        size: {
          width: Math.max(MIN_W, windowState.size.width + dw),
          height: Math.max(MIN_H, windowState.size.height + dh),
        },
        position: {
          x: windowState.position.x + dx,
          y: windowState.position.y + dy,
        },
      })
      setResizeOffset({ dw: 0, dh: 0, dx: 0, dy: 0 })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
    document.body.style.cursor = CURSOR_MAP[resizeDirRef.current]
    document.body.style.userSelect = 'none'

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      cancelAnimationFrame(rafRef.current)
    }
  }, [isResizing, dispatch, windowState.id, windowState.size, windowState.position])

  // Computed visual position/size (context base + live offsets)
  const vx = windowState.position.x + dragOffset.x + resizeOffset.dx
  const vy = Math.max(TASKBAR_H, windowState.position.y + dragOffset.y + resizeOffset.dy)
  const vw = Math.max(MIN_W, windowState.size.width + resizeOffset.dw)
  const vh = Math.max(MIN_H, windowState.size.height + resizeOffset.dh)

  if (isMobile) {
    return (
      <div
        className="fixed top-10 left-0 right-0 bottom-0 flex flex-col"
        style={{
          zIndex: windowState.zIndex,
          background: '#1a1a1a',
          animation: 'windowOpen 0.2s ease-out',
        }}
        onMouseDown={() => focusWindow(windowState.id)}
      >
        <WindowTitleBar
          title={title}
          isDragging={false}
          onTitleClick={onTitleClick}
          titleExtra={titleExtra}
          onClose={() => dispatch({ type: 'CLOSE_WINDOW', windowId: windowState.id })}
          onExpand={() => {}}
          onMouseDown={() => {}}
          disableDrag
        />
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ color: '#ffffff', fontSize: '0.85rem', lineHeight: 1.6 }}
        >
          <WindowControlsContext.Provider value={windowControls}>
            {children}
          </WindowControlsContext.Provider>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed flex flex-col group"
      style={{
        left: vx,
        top: vy,
        width: vw,
        height: vh,
        zIndex: windowState.zIndex,
        background: '#1a1a1a',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '4px 4px 20px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        transition: isDragging || isResizing ? 'none' : 'box-shadow 0.2s ease',
        animation: 'windowOpen 0.2s ease-out',
      }}
      onMouseDown={() => focusWindow(windowState.id)}
    >
      <WindowTitleBar
        title={title}
        isDragging={isDragging}
        onTitleClick={onTitleClick}
        titleExtra={titleExtra}
        onClose={() => dispatch({ type: 'CLOSE_WINDOW', windowId: windowState.id })}
        onExpand={() => {
          const margin = 24
          const topOffset = TASKBAR_H + margin
          dispatch({
            type: 'RESIZE_WINDOW',
            windowId: windowState.id,
            size: {
              width: window.innerWidth - margin * 2,
              height: window.innerHeight - topOffset - margin,
            },
            position: { x: margin, y: topOffset },
          })
        }}
        onMouseDown={onDragStart}
      />

      <div
        className="flex-1 overflow-x-hidden overflow-y-auto p-6"
        style={{ color: '#ffffff', fontSize: '0.85rem', lineHeight: 1.6 }}
      >
        <WindowControlsContext.Provider value={windowControls}>
          {children}
        </WindowControlsContext.Provider>
      </div>

      {RESIZE_DIRS.map(dir => (
        <div
          key={dir}
          onMouseDown={(e) => onResizeStart(dir, e)}
          style={getHandleStyle(dir)}
        />
      ))}
    </div>
  )
}
