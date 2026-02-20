import { useState, useEffect, useRef, useCallback } from 'react'
import { TRASH_ENTRIES } from '@/lib/caseStudies'
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
}

export function TrashApp(): React.JSX.Element {
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)
  const { setOnTitleClick, setTitleExtra } = useWindowControls()
  const goToSlideRef = useRef<((index: number) => void) | null>(null)
  const projects = TRASH_ENTRIES.filter((e): e is CaseStudy => e.kind === 'project')
  const activeStudy = projects.find(s => s.slug === activeSlug)
  const activeMini = TRASH_ENTRIES.find((e): e is MiniProject => e.kind === 'mini' && e.slug === activeSlug)

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

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span className="text-white uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
          Recovered Files
        </span>
        <span className="text-white" style={{ fontSize: '0.6rem' }}>
          {TRASH_ENTRIES.filter(e => e.kind !== 'divider').length} items
        </span>
      </div>
      {TRASH_ENTRIES.map((entry, i) => {
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
        return (
          <div
            key={entry.slug}
            onClick={() => setActiveSlug(entry.slug)}
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
                <rect x="2" y="4" width="12" height="10" stroke="currentColor" strokeWidth="1.5" className="text-white" />
                <rect x="2" y="3" width="6" height="3" stroke="currentColor" strokeWidth="1" className="text-white" />
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
    </div>
  )
}
