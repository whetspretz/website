import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { CASE_STUDIES } from '@/lib/caseStudies'
import type { CaseStudy, MiniProject } from '@/lib/caseStudies'
import { PasswordGate } from './PasswordGate'
import { Slideshow } from '@/components/slides/Slideshow'
import { MiniProjectView } from '@/components/slides/MiniProjectView'
import { useWindowControls } from '@/hooks/useWindowControls'
import { PigeonLayersSlide } from './PigeonLayersSlide'
import { OverwhelmedTraderGraphic } from './OverwhelmedTraderGraphic'
import { PigeonHubGraphic } from './PigeonHubGraphic'
import { ChatSimplicityGraphic } from './ChatSimplicityGraphic'
import { ShelfspaceGraphic } from './ShelfspaceGraphic'
import { TasteDiscoveryGraphic } from './TasteDiscoveryGraphic'
import { MoodSpinnerGraphic } from './MoodSpinnerGraphic'
import { MoodOrbGraphic } from './MoodOrbGraphic'
import { SynthesisGraphic } from './SynthesisGraphic'
import { FourLayersGraphic } from './FourLayersGraphic'
import { TasteRevealGraphic } from './TasteRevealGraphic'
import { DesignPrinciplesGraphic } from './DesignPrinciplesGraphic'
import { OnboardingVideos } from './OnboardingVideos'
import { ArchetypeVideos } from './ArchetypeVideos'
import { BookOrbitGraphic } from './BookOrbitGraphic'
import { ProcessFlowGraphic } from './ProcessFlowGraphic'
import { ToolkitMapGraphic } from './ToolkitMapGraphic'
import { PowerUpGraphic } from './PowerUpGraphic'
import { CoreStrengthsGraphic } from './CoreStrengthsGraphic'
import { PigeonJourneyGraphic } from './PigeonJourneyGraphic'
import { HypothesisGraphic } from './HypothesisGraphic'
import { Day1JourneyGraphic } from './Day1JourneyGraphic'
import { ReengagementTimelineGraphic } from './ReengagementTimelineGraphic'
import { VoiceToneGraphic } from './VoiceToneGraphic'
import { WireframeGlobe } from './WireframeGlobe'
import { WireframeShapes } from './WireframeShapes'
import { VoiceChatGraphic } from './VoiceChatGraphic'
import { ChatToInterfaceGraphic } from './ChatToInterfaceGraphic'
import { IntentToInterfaceGraphic } from './IntentToInterfaceGraphic'
import { BrandTensionGraphic } from './BrandTensionGraphic'
import { BrandLayersGraphic } from './BrandLayersGraphic'
import { AnonymousOnboardingGraphic } from './AnonymousOnboardingGraphic'

const COMPONENT_MAP = {
  'pigeon-layers': PigeonLayersSlide,
  'overwhelmed-trader': OverwhelmedTraderGraphic,
  'pigeon-hub': PigeonHubGraphic,
  'chat-simplicity': ChatSimplicityGraphic,
  'shelfspace-graphic': ShelfspaceGraphic,
  'taste-discovery': TasteDiscoveryGraphic,
  'mood-spinner': MoodSpinnerGraphic,
  'mood-orb': MoodOrbGraphic,
  'synthesis': SynthesisGraphic,
  'four-layers': FourLayersGraphic,
  'taste-reveal': TasteRevealGraphic,
  'design-principles': DesignPrinciplesGraphic,
  'onboarding-videos': OnboardingVideos,
  'archetype-videos': ArchetypeVideos,
  'book-orbit': BookOrbitGraphic,
  'process-flow': ProcessFlowGraphic,
  'toolkit-map': ToolkitMapGraphic,
  'power-up': PowerUpGraphic,
  'core-strengths': CoreStrengthsGraphic,
  'pigeon-journey': PigeonJourneyGraphic,
  'hypothesis': HypothesisGraphic,
  'day1-journey': Day1JourneyGraphic,
  'reengagement-timeline': ReengagementTimelineGraphic,
  'voice-tone': VoiceToneGraphic,
  'wireframe-globe': WireframeGlobe,
  'wireframe-shapes': WireframeShapes,
  'voice-chat': VoiceChatGraphic,
  'chat-to-interface': ChatToInterfaceGraphic,
  'intent-to-interface': IntentToInterfaceGraphic,
  'brand-tension': BrandTensionGraphic,
  'brand-layers': BrandLayersGraphic,
  'anonymous-onboarding': AnonymousOnboardingGraphic,
}

const PREVIEW_W = 360
const PREVIEW_H = 240

export function ProjectsApp(): React.JSX.Element {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const { setOnTitleClick, setTitleExtra } = useWindowControls()
  const goToSlideRef = useRef<((index: number) => void) | null>(null)
  const projects = CASE_STUDIES.filter((e): e is CaseStudy => e.kind === 'project')
  const activeStudy = projects.find(s => s.slug === activeSlug)
  const activeMini = CASE_STUDIES.find((e): e is MiniProject => e.kind === 'mini' && e.slug === activeSlug)

  // Hover preview state
  const [hoveredHero, setHoveredHero] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const updatePreviewPos = useCallback(() => {
    const el = previewRef.current
    if (!el) return
    const { x, y } = mouseRef.current
    // Position to the right and above cursor, clamped to viewport
    let left = x + 24
    let top = y - PREVIEW_H / 2
    if (left + PREVIEW_W > window.innerWidth - 12) {
      left = x - PREVIEW_W - 24
    }
    top = Math.max(12, Math.min(top, window.innerHeight - PREVIEW_H - 12))
    el.style.left = `${left}px`
    el.style.top = `${top}px`
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent, hero: string) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    if (hero) {
      setHoveredHero(hero)
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updatePreviewPos)
    }
  }, [updatePreviewPos])

  const handleMouseLeave = useCallback(() => {
    setHoveredHero(null)
    cancelAnimationFrame(rafRef.current)
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const tocIndex = activeStudy?.slides.findIndex(s => s.type === 'toc') ?? -1

  const handleNavigationReady = useCallback((goToSlide: (index: number) => void) => {
    goToSlideRef.current = goToSlide
  }, [])

  useEffect(() => {
    if (activeStudy || activeMini) {
      setOnTitleClick(() => () => { setActiveSlug(null); setUnlocked(false) })
      if (activeStudy && tocIndex >= 0) {
        setTitleExtra({ label: 'Contents', onClick: () => goToSlideRef.current?.(tocIndex) })
      } else {
        setTitleExtra(undefined)
      }
    } else {
      setOnTitleClick(undefined)
      setTitleExtra(undefined)
    }
  }, [activeStudy, activeMini, tocIndex, setOnTitleClick, setTitleExtra])

  if (activeStudy) {
    if (activeStudy.locked && !unlocked) {
      return (
        <PasswordGate
          onUnlocked={() => setUnlocked(true)}
          onBack={() => setActiveSlug(null)}
        />
      )
    }

    return <Slideshow slides={activeStudy.slides} componentMap={COMPONENT_MAP} onNavigationReady={handleNavigationReady} />
  }

  if (activeMini) {
    if (activeMini.locked && !unlocked) {
      return (
        <PasswordGate
          onUnlocked={() => setUnlocked(true)}
          onBack={() => setActiveSlug(null)}
        />
      )
    }
    return <MiniProjectView blocks={activeMini.blocks} componentMap={COMPONENT_MAP} />
  }

  const FOLDER_COLORS = ['#dfff00', '#60a5fa', '#f472b6', '#34d399', '#fb923c', '#a78bfa', '#e879f9', '#fbbf24']
  let folderIndex = 0

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span className="text-white uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
          Case Studies
        </span>
        <span className="text-white" style={{ fontSize: '0.6rem' }}>
          {CASE_STUDIES.filter(e => e.kind !== 'divider').length} items
        </span>
      </div>
      {CASE_STUDIES.map((entry, i) => {
        if (entry.kind === 'divider') {
          return (
            <div
              key={`divider-${i}`}
              className="pt-5 pb-2 px-2 -mx-2"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span
                className="text-white/50 uppercase font-bold"
                style={{ fontSize: '0.55rem', letterSpacing: '0.12em' }}
              >
                {entry.label}
              </span>
            </div>
          )
        }
        const hero = entry.kind === 'project' ? entry.hero : ''
        const folderColor = entry.kind === 'project' ? FOLDER_COLORS[folderIndex++ % FOLDER_COLORS.length] : undefined
        return (
          <div
            key={entry.slug}
            onClick={() => setActiveSlug(entry.slug)}
            onMouseMove={hero ? (e) => handleMouseMove(e, hero) : undefined}
            onMouseLeave={hero ? handleMouseLeave : undefined}
            className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white/5 transition-colors px-2 -mx-2"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            {entry.kind === 'mini' ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="2" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" className="text-white" />
                <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1" className="text-white" />
                <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1" className="text-white" />
                <line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1" className="text-white" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2" y="4" width="12" height="10" stroke={folderColor} strokeWidth="1.5" />
                <rect x="2" y="3" width="6" height="3" stroke={folderColor} strokeWidth="1" />
              </svg>
            )}
            <span className="text-white flex-1">{entry.title}</span>
            {entry.locked && (
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="text-white/40 shrink-0">
                <rect x="3" y="8" width="10" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                <path d="M5 8V5a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            )}
            <span className="text-white" style={{ fontSize: '0.65rem' }}>
              {entry.tag}
            </span>
          </div>
        )
      })}

      {/* Hover preview — rendered via portal to escape window overflow */}
      {hoveredHero && createPortal(
        <div
          ref={previewRef}
          style={{
            position: 'fixed',
            width: PREVIEW_W,
            height: PREVIEW_H,
            pointerEvents: 'none',
            zIndex: 9999,
            borderRadius: 8,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            opacity: 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          <img
            src={hoveredHero}
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>,
        document.body,
      )}
    </div>
  )
}
