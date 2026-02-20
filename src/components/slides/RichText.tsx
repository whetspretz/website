import { useState, useEffect, useRef } from 'react'
import type { AnnotatedWord, RichParagraph } from '@/lib/slideTypes'

function ImagePopupOverlay({ annotation, onClose }: { annotation: AnnotatedWord; onClose: () => void }): React.JSX.Element {
  return (
    <div
      className="annotation-popup"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(4px)',
        cursor: 'pointer',
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: '85vw',
          maxHeight: '80vh',
          padding: '0.5rem',
          background: '#111',
          border: '1px solid rgba(96, 165, 250, 0.2)',
          borderRadius: 12,
          boxShadow: '0 8px 60px rgba(0,0,0,0.8), 0 0 30px rgba(96, 165, 250, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={annotation.popupImage!}
          alt={annotation.popupImageAlt ?? ''}
          className="rounded"
          style={{ maxWidth: '85vw', maxHeight: '78vh', objectFit: 'contain', display: 'block' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        {annotation.popupText && (
          <span
            className="text-white/70 block font-mono text-center"
            style={{ fontSize: '0.75rem', lineHeight: 1.5, padding: '0.5rem 0.25rem 0.25rem' }}
          >
            {annotation.popupText}
          </span>
        )}
      </div>
    </div>
  )
}

function AnnotatedSpan({ annotation }: { annotation: AnnotatedWord }): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const popupRef = useRef<HTMLSpanElement>(null)
  const hasImage = !!annotation.popupImage

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent): void => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Reposition text-only popup to stay in view
  useEffect(() => {
    if (!isOpen || hasImage || !popupRef.current) return
    const popup = popupRef.current
    const rect = popup.getBoundingClientRect()

    if (rect.right > window.innerWidth - 8) {
      const overflow = rect.right - window.innerWidth + 12
      popup.style.transform = `translateX(calc(-50% - ${overflow}px))`
    } else if (rect.left < 8) {
      const overflow = 8 - rect.left
      popup.style.transform = `translateX(calc(-50% + ${overflow}px))`
    }

    if (rect.bottom > window.innerHeight - 8) {
      popup.style.top = 'auto'
      popup.style.bottom = '100%'
      popup.style.marginTop = '0'
      popup.style.marginBottom = '8px'
    }
  }, [isOpen, hasImage])

  return (
    <span
      ref={wrapperRef}
      className="relative inline"
      onMouseEnter={() => !hasImage && setIsOpen(true)}
      onMouseLeave={() => !hasImage && setIsOpen(false)}
    >
      <span
        className="annotated-word"
        onClick={() => setIsOpen((v) => !v)}
      >
        {annotation.word}
      </span>

      {/* Image popups: full-screen overlay */}
      {isOpen && hasImage && (
        <ImagePopupOverlay annotation={annotation} onClose={() => setIsOpen(false)} />
      )}

      {/* Text-only popups: small tooltip */}
      {isOpen && !hasImage && (
        <span
          ref={popupRef}
          className="annotation-popup absolute z-50 block font-mono"
          style={{
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: 8,
            background: '#111',
            border: '1px solid rgba(96, 165, 250, 0.2)',
            borderRadius: 8,
            padding: '0.75rem',
            maxWidth: 280,
            minWidth: 180,
            boxShadow: '0 4px 24px rgba(0,0,0,0.5), 0 0 12px rgba(96, 165, 250, 0.1)',
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(false) }}
            className="absolute top-1 right-2 text-white/40 hover:text-white cursor-pointer"
            style={{ fontSize: '0.7rem', background: 'none', border: 'none', lineHeight: 1 }}
            aria-label="Close"
          >
            &times;
          </button>
          {annotation.popupText && (
            <span
              className="text-white/70 block"
              style={{ fontSize: '0.7rem', lineHeight: 1.5 }}
            >
              {annotation.popupText}
            </span>
          )}
        </span>
      )}
    </span>
  )
}

export function RichText({ paragraph }: { paragraph: RichParagraph }): React.JSX.Element {
  if (typeof paragraph === 'string') {
    return <>{paragraph}</>
  }
  return (
    <>
      {paragraph.map((segment, i) =>
        typeof segment === 'string' ? (
          <span key={i}>{segment}</span>
        ) : (
          <AnnotatedSpan key={i} annotation={segment} />
        ),
      )}
    </>
  )
}
