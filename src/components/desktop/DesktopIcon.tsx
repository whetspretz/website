import { useRef, useState } from 'react'

interface DesktopIconProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  iconId?: string
  hint?: React.ReactNode
  onDragEnd?: (dropPos: { x: number; y: number }) => boolean | void
}

export function DesktopIcon({ icon, label, onClick, iconId, hint, onDragEnd }: DesktopIconProps): React.JSX.Element {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef(false)
  const startPos = useRef({ x: 0, y: 0 })
  const startOffset = useRef({ x: 0, y: 0 })

  const onPointerDown = (e: React.PointerEvent): void => {
    e.preventDefault()
    dragRef.current = false
    startPos.current = { x: e.clientX, y: e.clientY }
    startOffset.current = { x: offset.x, y: offset.y }

    const onMove = (ev: PointerEvent): void => {
      const dx = ev.clientX - startPos.current.x
      const dy = ev.clientY - startPos.current.y
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        dragRef.current = true
      }
      setOffset({ x: startOffset.current.x + dx, y: startOffset.current.y + dy })
    }

    const onUp = (ev: PointerEvent): void => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)

      if (dragRef.current && onDragEnd) {
        const handled = onDragEnd({ x: ev.clientX, y: ev.clientY })
        if (handled) {
          // Drop was handled (e.g. deleted) — reset offset
          setOffset({ x: 0, y: 0 })
          return
        }
      }
    }

    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
  }

  const handleClick = (): void => {
    if (!dragRef.current) {
      onClick()
    }
  }

  return (
    <div
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      onPointerDown={onPointerDown}
      onClick={handleClick}
      data-icon-id={iconId}
      className="desktop-icon relative flex flex-col items-center gap-1 cursor-pointer bg-transparent border-none text-ink p-2 group transition-all duration-200 hover:bg-ink/5 select-none rounded-[12px]"
    >
      <div className="w-12 h-12 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <span
        className="font-mono text-ink font-semibold"
        style={{ fontSize: '0.7rem', letterSpacing: '0.02em' }}
      >
        {label}
      </span>
      {hint && (
        <span
          className="hidden md:block absolute left-full top-1/2 -translate-y-1/2 ml-0.5 whitespace-nowrap font-mono text-ink hint-nudge pointer-events-none"
          style={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}
        >
          {hint}
        </span>
      )}
    </div>
  )
}
