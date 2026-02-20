import { useCallback } from 'react'
import { useDesktop } from '@/hooks/useDesktop'
import { usePaintings } from '@/lib/PaintingsContext'
import { DesktopIcon } from '@/components/desktop/DesktopIcon'
import {
  FolderIcon,
  AboutIcon,
  TerminalIcon,
  GlobeIcon,
  TrashIcon,
  MusicIcon,
  WritingIcon,
  PaintIcon,
  HeartIcon,
} from '@/components/desktop/RetroIcons'
import type { AppId } from '@/lib/desktopTypes'

function PaintingThumbnail({ dataUrl }: { dataUrl: string }): React.JSX.Element {
  return (
    <div style={{ width: 48, height: 48, border: '2px solid rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden' }}>
      <img src={dataUrl} alt="painting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

export function DesktopIconGrid(): React.JSX.Element {
  const { openApp } = useDesktop()
  const { paintings, setViewingId, removePainting } = usePaintings()

  const leftIcons: { id: AppId; icon: React.ReactNode; label: string }[] = [
    { id: 'projects', icon: <FolderIcon />, label: 'projects' },
    { id: 'about', icon: <AboutIcon />, label: 'about' },
    { id: 'tamagotchi', icon: <img src="/cat-running.gif" alt="meow" style={{ width: '48px', height: '48px' }} />, label: 'meow' },
  ]

  const doItForHer = { id: 'doitforher' as AppId, icon: <HeartIcon />, label: 'Do T for her' }

  const rightIcons: { id: AppId; icon: React.ReactNode; label: string }[] = [
    { id: 'links', icon: <GlobeIcon />, label: 'links' },
    { id: 'music', icon: <MusicIcon />, label: 'music player' },
    { id: 'writing', icon: <WritingIcon />, label: 'my writing' },
    { id: 'painter', icon: <PaintIcon />, label: 'painter' },
    { id: 'trash', icon: <TrashIcon />, label: 'trash' },
  ]

  const handleClick = (id: AppId): void => {
    openApp(id)
  }

  const handlePaintingClick = (paintingId: string): void => {
    setViewingId(paintingId)
    openApp('painting-viewer')
  }

  const handlePaintingDragEnd = useCallback((paintingId: string, dropPos: { x: number; y: number }): boolean => {
    const trashEl = document.querySelector('[data-icon-id="trash"]')
    if (!trashEl) return false
    const rect = trashEl.getBoundingClientRect()
    if (dropPos.x >= rect.left && dropPos.x <= rect.right && dropPos.y >= rect.top && dropPos.y <= rect.bottom) {
      removePainting(paintingId)
      return true
    }
    return false
  }, [removePainting])

  return (
    <>
      {/* Left column of icons */}
      <div
        className="absolute left-6 flex flex-col gap-2 z-[5]"
        style={{ top: '4.5rem' }}
      >
        {leftIcons.map(item => (
          <DesktopIcon
            key={item.id}
            icon={item.icon}
            label={item.label}
            onClick={() => handleClick(item.id)}
          />
        ))}
        {/* Saved paintings appear below left icons */}
        {paintings.map(p => (
          <DesktopIcon
            key={p.id}
            icon={<PaintingThumbnail dataUrl={p.dataUrl} />}
            label={p.name}
            onClick={() => handlePaintingClick(p.id)}
            onDragEnd={(dropPos) => handlePaintingDragEnd(p.id, dropPos)}
          />
        ))}
      </div>

      {/* Right icons — two-column grid, Do T for her in left col */}
      <div
        className="absolute right-6 grid grid-cols-2 gap-2 z-[5]"
        style={{ top: '4.5rem' }}
      >
        {/* Row 1: Do T for her (left) + terminal (right) */}
        <DesktopIcon
          icon={doItForHer.icon}
          label={doItForHer.label}
          onClick={() => handleClick(doItForHer.id)}
        />
        <DesktopIcon
          icon={<TerminalIcon />}
          label="terminal"
          onClick={() => handleClick('terminal')}
          iconId="terminal"
        />
        {/* Remaining icons in right column only */}
        {rightIcons.map(item => (
          <div key={item.id} className="col-start-2">
            <DesktopIcon
              icon={item.icon}
              label={item.label}
              onClick={() => handleClick(item.id)}
              iconId={item.id}
            />
          </div>
        ))}
      </div>
    </>
  )
}
