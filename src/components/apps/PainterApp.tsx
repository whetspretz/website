import { useRef, useEffect, useState, useCallback } from 'react'
import { usePaintings } from '@/lib/PaintingsContext'
import { useDesktop } from '@/hooks/useDesktop'

const COLORS = [
  { value: '#ffffff', label: 'white' },
  { value: '#ff3333', label: 'red' },
  { value: '#3388ff', label: 'blue' },
  { value: '#33cc66', label: 'green' },
  { value: '#ffdd00', label: 'yellow' },
  { value: '#ff66cc', label: 'pink' },
]

const CANVAS_BG = '#1a1a1a'

export function PainterApp(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDrawing = useRef(false)
  const lastPos = useRef<{ x: number; y: number } | null>(null)

  const [activeColor, setActiveColor] = useState('#ffffff')
  const [isEraser, setIsEraser] = useState(false)
  const [brushSize] = useState(4)

  const { savePainting, setViewingId } = usePaintings()
  const { openApp } = useDesktop()

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = CANVAS_BG
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Resize canvas to fill container
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width === 0 || height === 0) return

      // Save current drawing
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

      canvas.width = Math.floor(width)
      canvas.height = Math.floor(height)

      // Restore
      ctx.fillStyle = CANVAS_BG
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.putImageData(imageData, 0, 0)
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const getCanvasPos = useCallback((e: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const drawLine = useCallback((from: { x: number; y: number }, to: { x: number; y: number }) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = isEraser ? CANVAS_BG : activeColor
    ctx.lineWidth = isEraser ? brushSize * 3 : brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  }, [activeColor, isEraser, brushSize])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawing.current = true
    const pos = getCanvasPos(e)
    lastPos.current = pos
    // Draw a dot for single clicks
    drawLine(pos, pos)
  }, [getCanvasPos, drawLine])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || !lastPos.current) return
    const pos = getCanvasPos(e)
    drawLine(lastPos.current, pos)
    lastPos.current = pos
  }, [getCanvasPos, drawLine])

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false
    lastPos.current = null
  }, [])

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = CANVAS_BG
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dataUrl = canvas.toDataURL('image/png')
    const id = savePainting(dataUrl)
    setViewingId(id)
    openApp('painting-viewer')
  }, [savePainting, setViewingId, openApp])

  const handleEmail = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Download the image
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'painting.png'
    link.href = dataUrl
    link.click()

    // Open mailto
    window.open('mailto:matthew.whetsell@gmail.com?subject=A%20painting%20for%20you', '_blank')
  }, [])

  const selectColor = useCallback((color: string) => {
    setActiveColor(color)
    setIsEraser(false)
  }, [])

  return (
    <div className="font-mono flex flex-col h-full">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between pb-2 mb-2 shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex items-center gap-2">
          {COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => selectColor(color.value)}
              className="cursor-pointer transition-transform"
              style={{
                width: 18,
                height: 18,
                backgroundColor: color.value,
                border: activeColor === color.value && !isEraser
                  ? '2px solid #dfff00'
                  : '1px solid rgba(255,255,255,0.25)',
                borderRadius: 2,
                transform: activeColor === color.value && !isEraser ? 'scale(1.2)' : 'scale(1)',
              }}
              title={color.label}
            />
          ))}
          <button
            onClick={() => setIsEraser(!isEraser)}
            className="cursor-pointer px-2 py-0.5 uppercase"
            style={{
              fontSize: '0.55rem',
              letterSpacing: '0.08em',
              color: isEraser ? '#1a1a1a' : 'rgba(255,255,255,0.6)',
              backgroundColor: isEraser ? '#dfff00' : 'transparent',
              border: `1px solid ${isEraser ? '#dfff00' : 'rgba(255,255,255,0.2)'}`,
              borderRadius: 2,
            }}
          >
            eraser
          </button>
        </div>
        <button
          onClick={handleClear}
          className="cursor-pointer px-2 py-0.5 uppercase"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 2,
          }}
        >
          clear
        </button>
      </div>

      {/* Canvas */}
      <div ref={containerRef} className="flex-1 min-h-0 relative" style={{ cursor: isEraser ? 'cell' : 'crosshair' }}>
        <canvas
          ref={canvasRef}
          width={440}
          height={280}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0 w-full h-full"
          style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }}
        />
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center gap-2 pt-2 mt-2 shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
      >
        <button
          onClick={handleSave}
          className="cursor-pointer px-3 py-1 uppercase"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.08em',
            color: '#1a1a1a',
            backgroundColor: '#dfff00',
            border: 'none',
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          save to desktop
        </button>
        <button
          onClick={handleEmail}
          className="cursor-pointer px-3 py-1 uppercase"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 2,
            backgroundColor: 'transparent',
          }}
        >
          email to matt
        </button>
      </div>
    </div>
  )
}
