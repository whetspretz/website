import type { TitleExtra } from '@/lib/WindowControlsContext'

interface WindowTitleBarProps {
  title: string
  isDragging: boolean
  disableDrag?: boolean
  onTitleClick?: () => void
  titleExtra?: TitleExtra
  onClose: () => void
  onExpand: () => void
  onMouseDown: (e: React.MouseEvent) => void
}

export function WindowTitleBar({ title, isDragging, disableDrag, onTitleClick, titleExtra, onClose, onExpand, onMouseDown }: WindowTitleBarProps): React.JSX.Element {
  return (
    <div
      className="h-10 md:h-9 flex justify-between items-center px-4 select-none"
      style={{
        cursor: disableDrag ? 'default' : isDragging ? 'grabbing' : 'grab',
        background: '#222',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
      onMouseDown={onMouseDown}
    >
      <div className="flex items-center gap-0">
        <span
          className={`font-mono text-white font-bold${onTitleClick ? ' cursor-pointer hover:text-[#dfff00] transition-colors' : ''}`}
          style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}
          onClick={onTitleClick ? (e) => { e.stopPropagation(); onTitleClick() } : undefined}
          onMouseDown={onTitleClick ? (e) => e.stopPropagation() : undefined}
        >
          {title}
        </span>
        {titleExtra && (
          <>
            <span className="font-mono text-white/20 mx-1.5" style={{ fontSize: '0.6rem' }}>·</span>
            <span
              className="font-mono text-white/50 cursor-pointer hover:text-[#dfff00] transition-colors"
              style={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}
              onClick={(e) => { e.stopPropagation(); titleExtra.onClick() }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              {titleExtra.label}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation()
            onExpand()
          }}
          className="hidden md:flex w-3.5 h-3.5 rounded-full border border-white/20 bg-transparent cursor-pointer transition-all duration-200 hover:bg-green-500 hover:border-green-500 items-center justify-center"
          style={{ fontSize: 0, lineHeight: 0 }}
          aria-label="Expand window"
        >
          <svg width="7" height="7" viewBox="0 0 7 7" className="opacity-0 group-hover:opacity-100">
            <polyline points="1,3 1,1 3,1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="6,4 6,6 4,6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          className="w-5 h-5 md:w-3.5 md:h-3.5 rounded-full border border-white/20 bg-transparent cursor-pointer transition-all duration-200 hover:bg-red-500 hover:border-red-500 flex items-center justify-center"
          style={{ fontSize: 0, lineHeight: 0 }}
          aria-label="Close window"
        >
          <svg width="7" height="7" viewBox="0 0 7 7" className="opacity-0 group-hover:opacity-100">
            <line x1="1" y1="1" x2="6" y2="6" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="1" x2="1" y2="6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}
