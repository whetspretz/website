import { useState, useCallback, useRef, useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { Slide } from '@/lib/slideTypes'
import { SlideContent, type BlankSlideComponentMap } from './SlideViews'

interface SlideshowProps {
  slides: Slide[]
  componentMap?: BlankSlideComponentMap
  onNavigationReady?: (goToSlide: (index: number) => void) => void
}

export function Slideshow({ slides, componentMap, onNavigationReady }: SlideshowProps): React.JSX.Element {
  const isMobile = useIsMobile()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartRef = useRef<number | null>(null)

  const totalSlides = slides.length
  const currentSlide = slides[currentIndex]

  const goToSlide = useCallback(
    (newIndex: number) => {
      if (isTransitioning || newIndex === currentIndex) return
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex(newIndex)
        setTimeout(() => setIsTransitioning(false), 50)
      }, 200)
    },
    [isTransitioning, currentIndex],
  )

  const goNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) goToSlide(currentIndex + 1)
  }, [currentIndex, totalSlides, goToSlide])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) goToSlide(currentIndex - 1)
  }, [currentIndex, goToSlide])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') { goNext(); e.preventDefault() }
      if (e.key === 'ArrowLeft') { goPrev(); e.preventDefault() }
    },
    [goNext, goPrev],
  )

  // Swipe support
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartRef.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartRef.current
    touchStartRef.current = null
    if (dx < -50) goNext()
    else if (dx > 50) goPrev()
  }, [goNext, goPrev])

  // Expose goToSlide to parent
  useEffect(() => {
    onNavigationReady?.(goToSlide)
  }, [goToSlide, onNavigationReady])

  // Auto-focus container on mount so keyboard works immediately
  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  return (
    <div
      ref={containerRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative flex flex-col overflow-hidden font-mono outline-none"
      style={{
        margin: '-1.5rem',
        width: 'calc(100% + 3rem)',
        height: 'calc(100% + 3rem)',
        touchAction: 'pan-y',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        <div
          className="absolute inset-0 flex flex-col"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
            transition: 'opacity 200ms ease, transform 200ms ease',
          }}
        >
          <SlideContent slide={currentSlide} componentMap={componentMap} onNavigate={goToSlide} />
        </div>
      </div>

      {isMobile ? (
        /* Mobile: bottom navigation bar */
        <div
          className="shrink-0 flex items-center justify-between px-4"
          style={{
            height: 44,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(26,26,26,0.95)',
          }}
        >
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 font-mono text-white/60 disabled:opacity-20 cursor-pointer disabled:cursor-default bg-transparent border-none"
            style={{ fontSize: '0.65rem' }}
            aria-label="Previous slide"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            prev
          </button>
          <span className="font-mono text-white/40" style={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
            {currentIndex + 1} / {totalSlides}
          </span>
          <button
            onClick={goNext}
            disabled={currentIndex === totalSlides - 1}
            className="flex items-center gap-1.5 font-mono text-white/60 disabled:opacity-20 cursor-pointer disabled:cursor-default bg-transparent border-none"
            style={{ fontSize: '0.65rem' }}
            aria-label="Next slide"
          >
            next
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      ) : (
        /* Desktop: side arrows + bottom counter */
        <>
          <button
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-[#dfff00]/10 hover:border-[#dfff00]/30 disabled:opacity-20 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:border-white/10 disabled:hover:shadow-none"
            style={{ left: 16, boxShadow: 'none' }}
            onMouseEnter={(e) => {
              if (currentIndex > 0)
                e.currentTarget.style.boxShadow = '0 0 15px rgba(223, 255, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
            aria-label="Previous slide"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polyline points="9,2 4,7 9,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60" />
            </svg>
          </button>
          <button
            onClick={goNext}
            disabled={currentIndex === totalSlides - 1}
            className="absolute top-1/2 -translate-y-1/2 z-10 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-[#dfff00]/10 hover:border-[#dfff00]/30 disabled:opacity-20 disabled:cursor-default disabled:hover:bg-transparent disabled:hover:border-white/10 disabled:hover:shadow-none"
            style={{ right: 16, boxShadow: 'none' }}
            onMouseEnter={(e) => {
              if (currentIndex < totalSlides - 1)
                e.currentTarget.style.boxShadow = '0 0 15px rgba(223, 255, 0, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none'
            }}
            aria-label="Next slide"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <polyline points="5,2 10,7 5,12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60" />
            </svg>
          </button>
          <div
            className="absolute left-1/2 -translate-x-1/2 font-mono text-white/40"
            style={{ bottom: 16, fontSize: '0.65rem', letterSpacing: '0.15em' }}
          >
            {currentIndex + 1} / {totalSlides}
          </div>
        </>
      )}
    </div>
  )
}
