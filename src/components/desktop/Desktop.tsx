import { CatProvider } from '@/lib/CatContext'
import { DesktopProvider } from '@/lib/DesktopContext'
import { PaintingsProvider } from '@/lib/PaintingsContext'
import { TopBar } from '@/components/desktop/TopBar'
import { Taskbar } from '@/components/desktop/Taskbar'
import { HeroText } from '@/components/desktop/MWMonogram'
import { DesktopIconGrid } from '@/components/desktop/DesktopIconGrid'
import { CatOverlay } from '@/components/cats/CatOverlay'
import { WindowManager } from '@/components/desktop/WindowManager'

export function Desktop(): React.JSX.Element {
  return (
    <CatProvider>
      <DesktopProvider>
        <PaintingsProvider>
        <div
          className="w-screen h-screen relative overflow-hidden"
        >
          {/* Background image */}
          <div
            className="absolute inset-0 z-[0]"
            style={{
              background: "url('/windows-xp-iconic-hill-pig6ry6jnkq40poq.webp') center/cover no-repeat",
            }}
          />
          {/* SVG noise grain overlay */}
          <svg className="absolute inset-0 w-full h-full z-[1] pointer-events-none" style={{ opacity: 0.18 }}>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
          {/* Green gradient overlay — helps icons pop */}
          <div
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: 'linear-gradient(180deg, #dfff00 0%, transparent 60%)',
              opacity: 0.45,
            }}
          />
          <TopBar />
          <HeroText />
          <DesktopIconGrid />
          <WindowManager />
          <CatOverlay />
          {/* Spinning stamp */}
          <div
            className="fixed flex items-center justify-center z-[3]"
            style={{
              bottom: '3.5rem',
              right: '3rem',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '1px solid var(--color-ink)',
              backgroundColor: '#dfff00',
              animation: 'spin-slow 10s linear infinite',
            }}
          >
            <span
              className="font-sans uppercase text-ink text-center"
              style={{ fontSize: '10px', letterSpacing: '0.05em' }}
            >
              Since 2012
            </span>
          </div>
          <Taskbar />
        </div>
        </PaintingsProvider>
      </DesktopProvider>
    </CatProvider>
  )
}
