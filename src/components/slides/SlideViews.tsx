import type { IntroSlide, ImageSlide, ColumnsSlide, BlankSlide, SplitSlide, TitleSlide, TocSlide, QuoteSlide, Slide, InlineDividerStyle } from '@/lib/slideTypes'
import { RichText } from './RichText'
import { TimelineSlideView } from './TimelineSlide'

export type BlankSlideComponentMap = Record<string, React.ComponentType>

function InlineDivider({ style }: { style: InlineDividerStyle }): React.JSX.Element {
  if (style === 'rainbow') {
    return (
      <div className="my-5 mx-auto" style={{ width: 100 }}>
        <svg
          viewBox="0 0 400 20"
          preserveAspectRatio="none"
          className="w-full slide-divider-rainbow"
          style={{ height: 12 }}
        >
          <defs>
            <linearGradient id="rainbow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#dfff00" />
              <stop offset="20%" stopColor="#00ffd5" />
              <stop offset="40%" stopColor="#60a5fa" />
              <stop offset="60%" stopColor="#c084fc" />
              <stop offset="80%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#dfff00" />
            </linearGradient>
          </defs>
          <path
            d="M0,10 Q25,2 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10"
            fill="none"
            stroke="url(#rainbow-grad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  }
  return (
    <div
      className="w-full max-w-lg my-5"
      style={{
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.15) 70%, transparent)',
      }}
    />
  )
}

function DotLeader({ label, value }: { label: string; value: string }): React.JSX.Element {
  return (
    <div className="flex items-baseline gap-1 font-mono" style={{ fontSize: '0.75rem' }}>
      <span className="text-white/50 shrink-0">{label}</span>
      <span
        className="flex-1 overflow-hidden whitespace-nowrap text-white/15 select-none"
        aria-hidden="true"
      >
        {'·'.repeat(200)}
      </span>
      <span className="text-white/70 shrink-0 text-right">{value}</span>
    </div>
  )
}

function IntroSlideView({ slide }: { slide: IntroSlide }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-full px-12 py-8">
      {slide.logoSrc && (
        <img
          src={slide.logoSrc}
          alt={`${slide.title} logo`}
          className="mb-6 object-contain"
          style={{ maxHeight: 80, maxWidth: 300 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
      )}
      {slide.avatarSrc && (
        <div
          className="rounded-full mb-8 overflow-hidden slide-avatar-glow"
          style={{
            width: 160,
            height: 160,
            border: '2px solid rgba(223, 255, 0, 0.3)',
          }}
        >
          <img
            src={slide.avatarSrc}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </div>
      )}
      <h1
        className="text-white text-center mb-4"
        style={{
          fontFamily: "'Clash Display', Georgia, serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
        }}
      >
        {slide.title}
      </h1>
      {slide.subtitle.map((paragraph, i) => (
        <p
          key={i}
          className="text-white/60 text-center max-w-lg font-mono"
          style={{ fontSize: '0.85rem', lineHeight: 1.8, marginTop: i > 0 ? '0.75rem' : 0 }}
        >
          <RichText paragraph={paragraph} />
        </p>
      ))}
      {slide.dividers?.afterSubtitle && <InlineDivider style={slide.dividers.afterSubtitle} />}
      {slide.tags && slide.tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-5 max-w-lg">
          {slide.tags.map((tag, i) => (
            <span
              key={i}
              className="font-mono text-white/60 px-3 py-1 rounded-full"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.04em',
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {slide.dividers?.afterTags && <InlineDivider style={slide.dividers.afterTags} />}
      {slide.meta && slide.meta.length > 0 && (
        <div className="w-full max-w-lg mt-6 flex flex-col gap-1.5">
          {slide.meta.map((item, i) => (
            <DotLeader key={i} label={item.label} value={item.value} />
          ))}
        </div>
      )}
      {slide.dividers?.afterMeta && <InlineDivider style={slide.dividers.afterMeta} />}
    </div>
  )
}

function ImageSlideView({ slide }: { slide: ImageSlide }): React.JSX.Element {
  return (
    <div className="flex flex-col h-full p-8">
      <h2
        className="text-white mb-6 shrink-0"
        style={{
          fontFamily: "'Clash Display', Georgia, serif",
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 500,
        }}
      >
        {slide.title}
      </h2>
      <div
        className="flex-1 overflow-hidden min-h-0 flex items-center justify-center"
      >
        {slide.videoSrc ? (
          <video
            src={slide.videoSrc}
            className="w-full h-full object-contain"
            style={{ borderRadius: 24 }}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : slide.imageSrc ? (
          <img
            src={slide.imageSrc}
            alt={slide.imageAlt ?? ''}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        ) : null}
      </div>
      {slide.header && (
        <h3
          className="text-white text-center mt-4 shrink-0"
          style={{
            fontFamily: "'Clash Display', Georgia, serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            fontWeight: 400,
          }}
        >
          <RichText paragraph={slide.header} />
        </h3>
      )}
      {slide.caption && (
        <p
          className="text-white/60 text-center mt-3 font-mono"
          style={{ fontSize: '0.65rem' }}
        >
          <RichText paragraph={slide.caption} />
        </p>
      )}
    </div>
  )
}

function ColumnsSlideView({ slide }: { slide: ColumnsSlide }): React.JSX.Element {
  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto" style={{ containerType: 'inline-size' }}>
      <h2
        className="text-white mb-6 shrink-0"
        style={{
          fontFamily: "'Clash Display', Georgia, serif",
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 500,
        }}
      >
        {slide.title}
      </h2>
      <div className="flex-1 min-h-0 columns-slide-grid">
        {slide.columns.map((col, i) => (
          <div key={i} className="columns-slide-item">
            <div
              className="columns-slide-img rounded-lg overflow-hidden"
              style={{
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.03)',
              }}
            >
              <img
                src={col.imageSrc}
                alt={col.imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
            <div className="columns-slide-text">
              {col.header && (
                <p
                  className="text-white font-mono font-bold"
                  style={{ fontSize: '0.85rem', marginBottom: '0.35rem' }}
                >
                  {col.header}
                </p>
              )}
              <p
                className="text-white/70 font-mono"
                style={{ fontSize: '0.75rem', lineHeight: 1.6 }}
              >
                <RichText paragraph={col.text} />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SplitSlideView({ slide, componentMap }: { slide: SplitSlide; componentMap?: BlankSlideComponentMap }): React.JSX.Element {
  const Component = slide.componentId ? componentMap?.[slide.componentId] : undefined
  return (
    <div className="flex flex-col h-full p-8" style={{ containerType: 'inline-size' }}>
      <div
        className="split-slide-grid"
        style={{ flexDirection: slide.imagePosition === 'left' ? 'row' : 'row-reverse' }}
      >
        <div
          className="split-slide-image overflow-hidden flex items-center justify-center"
        >
          {Component ? (
            <Component />
          ) : slide.videoSrc || slide.imageSrc?.endsWith('.mp4') ? (
            <video
              src={slide.videoSrc ?? slide.imageSrc}
              className="w-full h-full object-contain"
              style={{ borderRadius: 12 }}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : slide.imageSrc ? (
            <img
              src={slide.imageSrc}
              alt={slide.imageAlt ?? ''}
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          ) : null}
        </div>
        <div className={`split-slide-text ${slide.imagePosition === 'left' ? 'pl-6 pr-10' : 'pl-10 pr-6'}`}>
          <h2
            className="text-white mb-5"
            style={{
              fontFamily: "'Clash Display', Georgia, serif",
              fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
              fontWeight: 500,
              lineHeight: 1.1,
            }}
          >
            {slide.title}
          </h2>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {slide.bullets.map((bullet, i) => (
              <li
                key={i}
                className="text-white/70 font-mono flex gap-2.5"
                style={{ fontSize: '0.9rem', lineHeight: 1.8 }}
              >
                <span className="text-white/30 shrink-0 select-none" aria-hidden="true">-</span>
                <span><RichText paragraph={bullet} /></span>
              </li>
            ))}
          </ul>
          {slide.caption && (
            <p
              className="text-white/60 font-mono mt-4"
              style={{ fontSize: '0.65rem' }}
            >
              <RichText paragraph={slide.caption} />
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function BlankSlideView({ slide, componentMap }: { slide: BlankSlide; componentMap?: BlankSlideComponentMap }): React.JSX.Element {
  const Component = slide.componentId ? componentMap?.[slide.componentId] : undefined
  return (
    <div className="flex flex-col h-full p-8">
      <h2
        className="text-white mb-4 shrink-0"
        style={{
          fontFamily: "'Clash Display', Georgia, serif",
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 500,
        }}
      >
        {slide.title}
      </h2>
      <div className="flex-1 min-h-0">
        {Component && <Component />}
      </div>
    </div>
  )
}

function TocSlideView({ slide, onNavigate }: { slide: TocSlide; onNavigate?: (index: number) => void }): React.JSX.Element {
  const CX = 150
  const CY = 150
  return (
    <div className="flex flex-col h-full p-8 relative process-dot-grid">
      {/* Corner brackets */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/10" />
      <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/10" />
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/10" />
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/10" />

      {/* Background decoration SVG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ opacity: 0.4 }}>
        <svg viewBox="0 0 300 300" className="w-full h-full" style={{ maxWidth: 300, maxHeight: 300 }} preserveAspectRatio="xMidYMid meet">
          <circle
            cx={CX} cy={CY} r={120}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.8}
            strokeDasharray="6 4"
            className="overwhelmed-spin-slow"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          <circle
            cx={CX} cy={CY} r={80}
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth={0.5}
            strokeDasharray="4 6"
            className="overwhelmed-spin-reverse"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          <circle
            cx={CX} cy={CY} r={40}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.5}
            className="overwhelmed-pulse"
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          <g className="process-icon-spin" style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <circle cx={CX + 120} cy={CY} r={1.5} fill="rgba(255,255,255,0.15)" />
            <circle cx={CX - 120} cy={CY} r={1} fill="rgba(255,255,255,0.1)" />
            <circle cx={CX} cy={CY - 120} r={1} fill="rgba(255,255,255,0.12)" />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <h2
          className="text-white mb-8 text-center"
          style={{
            fontFamily: "'Clash Display', Georgia, serif",
            fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
          }}
        >
          {slide.title}
        </h2>
        <div className="w-full max-w-md flex flex-col gap-2">
          {slide.entries.map((entry, i) => (
            <div
              key={i}
              className="flex items-baseline gap-1 font-mono process-item-enter"
              style={{ fontSize: '0.75rem', animationDelay: `${i * 80}ms` }}
            >
              <span className="text-white/50 shrink-0">{entry.label}</span>
              <span
                className="flex-1 overflow-hidden whitespace-nowrap text-white/15 select-none"
                aria-hidden="true"
              >
                {'·'.repeat(200)}
              </span>
              <button
                className="text-white/70 shrink-0 text-right cursor-pointer bg-transparent border-none font-mono hover:text-[#dfff00] transition-colors"
                style={{ fontSize: '0.75rem', padding: 0 }}
                onClick={() => onNavigate?.(entry.slideIndex)}
              >
                {String(entry.slideIndex + 1).padStart(2, '0')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TitleSlideView({ slide }: { slide: TitleSlide }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-full px-20">
      <h1
        className="text-white text-center"
        style={{
          fontFamily: "'Clash Display', Georgia, serif",
          fontSize: 'clamp(3rem, 8vw, 6rem)',
          fontWeight: 500,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
        }}
      >
        {slide.title}
      </h1>
      {slide.caption && (
        <p
          className="text-white/60 text-center font-mono mt-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
        >
          {slide.caption}
        </p>
      )}
    </div>
  )
}

function QuoteSlideView({ slide }: { slide: QuoteSlide }): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center h-full px-16">
      <p
        className="text-white text-center"
        style={{
          fontFamily: "'Clash Display', Georgia, serif",
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 400,
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
        }}
      >
        {slide.text}
      </p>
      {slide.attribution && (
        <p
          className="text-white/60 text-center font-mono mt-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}
        >
          {slide.attribution}
        </p>
      )}
    </div>
  )
}

export function SlideContent({ slide, componentMap, onNavigate }: { slide: Slide; componentMap?: BlankSlideComponentMap; onNavigate?: (index: number) => void }): React.JSX.Element {
  switch (slide.type) {
    case 'intro':
      return <IntroSlideView slide={slide} />
    case 'image':
      return <ImageSlideView slide={slide} />
    case 'columns':
      return <ColumnsSlideView slide={slide} />
    case 'split':
      return <SplitSlideView slide={slide} componentMap={componentMap} />
    case 'timeline':
      return <TimelineSlideView slide={slide} />
    case 'title':
      return <TitleSlideView slide={slide} />
    case 'toc':
      return <TocSlideView slide={slide} onNavigate={onNavigate} />
    case 'quote':
      return <QuoteSlideView slide={slide} />
    case 'blank':
      return <BlankSlideView slide={slide} componentMap={componentMap} />
  }
}
