import { useDesktop } from '@/hooks/useDesktop'
import { Window } from '@/components/window/Window'
import { APP_REGISTRY } from '@/lib/desktopApps'
import { ProjectsApp } from '@/components/apps/ProjectsApp'
import { AboutApp } from '@/components/apps/AboutApp'
import { TerminalApp } from '@/components/apps/TerminalApp'
import { LinksApp } from '@/components/apps/LinksApp'
import { TrashApp } from '@/components/apps/TrashApp'
import { MusicApp } from '@/components/apps/MusicApp'
import { WritingApp } from '@/components/apps/WritingApp'
import { PainterApp } from '@/components/apps/PainterApp'
import { PaintingViewerApp } from '@/components/apps/PaintingViewerApp'
import { TamagotchiApp } from '@/components/apps/TamagotchiApp'
import { DoItForHerApp } from '@/components/apps/DoItForHerApp'
import type { AppId } from '@/lib/desktopTypes'

const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
  projects: ProjectsApp,
  about: AboutApp,
  terminal: TerminalApp,
  links: LinksApp,
  trash: TrashApp,
  music: MusicApp,
  writing: WritingApp,
  painter: PainterApp,
  'painting-viewer': PaintingViewerApp,
  tamagotchi: TamagotchiApp,
  doitforher: DoItForHerApp,
}

export function WindowManager(): React.JSX.Element {
  const { state } = useDesktop()

  return (
    <>
      {state.windows
        .filter(w => w.isOpen)
        .map(win => {
          const AppContent = APP_COMPONENTS[win.appId]
          const config = APP_REGISTRY[win.appId]
          return (
            <Window key={win.id} windowState={win} title={config.windowTitle}>
              <AppContent />
            </Window>
          )
        })}
    </>
  )
}
