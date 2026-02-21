import { useRef, useCallback } from 'react'

interface StickyNoteProps {
  onClose: () => void
}

export function StickyNote({ onClose }: StickyNoteProps): React.JSX.Element {
  const noteRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, origX: 0, origY: 0 })
  const posRef = useRef<{ x: number; y: number } | null>(null)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    // Don't drag from the close button
    if ((e.target as HTMLElement).closest('button')) return
    e.preventDefault()
    const el = noteRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    if (!posRef.current) {
      posRef.current = { x: rect.left, y: rect.top }
    }

    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      origX: posRef.current.x,
      origY: posRef.current.y,
    }

    const onMouseMove = (ev: MouseEvent): void => {
      if (!dragRef.current.dragging) return
      const dx = ev.clientX - dragRef.current.startX
      const dy = ev.clientY - dragRef.current.startY
      const newX = dragRef.current.origX + dx
      const newY = dragRef.current.origY + dy
      posRef.current = { x: newX, y: newY }
      if (noteRef.current) {
        noteRef.current.style.left = `${newX}px`
        noteRef.current.style.top = `${newY}px`
        noteRef.current.style.bottom = 'auto'
      }
    }

    const onMouseUp = (): void => {
      dragRef.current.dragging = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }, [])

  return (
    <div
      ref={noteRef}
      className="fixed z-[4]"
      style={{
        bottom: '3.5rem',
        left: '2rem',
        animation: 'stickyNoteIn 0.4s ease-out forwards',
        cursor: 'grab',
      }}
      onMouseDown={onMouseDown}
    >
      <div
        style={{
          width: 220,
          padding: '20px 18px 16px',
          background: '#fef9c3',
          boxShadow: '2px 4px 16px rgba(0,0,0,0.25)',
          transform: 'rotate(-2deg)',
          position: 'relative',
          fontFamily: "'JetBrains Mono', monospace",
          color: '#1a1a1a',
          userSelect: 'none',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 6,
            right: 8,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#888',
            lineHeight: 1,
            padding: '2px 4px',
          }}
          aria-label="Close note"
        >
          ×
        </button>

        {/* To-do header */}
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            marginBottom: 8,
          }}
        >
          TO-DO
        </div>

        {/* Checklist */}
        <div style={{ fontSize: '11px', lineHeight: 1.7 }}>
          <div>☑ design</div>
          <div>☑ code</div>
          <div>☑ ship something sick</div>
        </div>

        {/* Divider */}
        <div
          style={{
            margin: '10px 0',
            borderTop: '1px solid rgba(0,0,0,0.15)',
          }}
        />

        {/* Bio */}
        <div style={{ fontSize: '9.5px', lineHeight: 1.6, color: '#444' }}>
          <div>Design engineer</div>
          <div style={{ marginTop: 4, color: '#777', fontSize: '9px' }}>
            Previously: WeWork, Ro, Alto,
          </div>
          <div style={{ color: '#777', fontSize: '9px' }}>
            and Big Whale Labs.
          </div>
        </div>

        {/* Tiny creature */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
          <svg
            viewBox="0 0 60 70"
            width="36"
            height="42"
            className="guardian-float"
            style={{ display: 'block' }}
          >
            {/* Legs */}
            <line x1={24} y1={52} x2={20} y2={65} stroke="rgba(0,0,0,0.2)" strokeWidth={1} strokeDasharray="2 2" />
            <line x1={36} y1={52} x2={40} y2={65} stroke="rgba(0,0,0,0.2)" strokeWidth={1} strokeDasharray="2 2" />
            <circle cx={20} cy={66} r={1.5} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth={0.8} />
            <circle cx={40} cy={66} r={1.5} fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth={0.8} />

            {/* Body hexagon */}
            <polygon
              points={Array.from({ length: 6 }, (_, i) => {
                const angle = (Math.PI / 3) * i - Math.PI / 2
                return `${30 + 12 * Math.cos(angle)},${48 + 12 * Math.sin(angle)}`
              }).join(' ')}
              fill="none"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth={0.8}
            />
            <circle cx={30} cy={48} r={2} fill="rgba(0,0,0,0.35)" />

            {/* Neck */}
            <line x1={30} y1={35} x2={30} y2={36} stroke="rgba(0,0,0,0.15)" strokeWidth={0.8} />

            {/* Head circles */}
            <circle cx={30} cy={22} r={14} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={0.8} />
            <circle cx={30} cy={22} r={10} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth={0.5} />
            <circle cx={30} cy={22} r={6} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={0.4} />

            {/* Eyes */}
            <g className="guardian-eye-blink" style={{ transformOrigin: '30px 21px' }}>
              <ellipse cx={25} cy={21} rx={3} ry={2} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={0.6} />
              <circle cx={25} cy={21} r={1.2} fill="rgba(0,0,0,0.4)" />
              <ellipse cx={35} cy={21} rx={3} ry={2} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={0.6} />
              <circle cx={35} cy={21} r={1.2} fill="rgba(0,0,0,0.4)" />
            </g>

            {/* Mouth */}
            <line x1={27} y1={27} x2={33} y2={27} stroke="rgba(0,0,0,0.2)" strokeWidth={0.6} strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}
