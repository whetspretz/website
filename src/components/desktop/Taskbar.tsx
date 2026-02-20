import { useState } from 'react'
import { useDesktop } from '@/hooks/useDesktop'
import { useClock, useBattery } from '@/hooks/useClock'
import { APP_REGISTRY } from '@/lib/desktopApps'
import { MWLogo } from './MWLogo'

export function Taskbar(): React.JSX.Element {
  const { state, focusWindow } = useDesktop()
  const time = useClock()
  const battery = useBattery()
  const [copied, setCopied] = useState(false)

  const openWindows = state.windows.filter(w => w.isOpen)

  return (
    <div
      className="absolute top-0 left-0 w-full h-10 flex items-center justify-between px-4 z-[1001]"
      style={{ background: '#1a1a1a' }}
    >
      {/* Left side: logo + open window buttons */}
      <div className="flex items-center gap-3">
        <MWLogo />
        {openWindows.map(win => (
          <button
            key={win.id}
            onClick={() => focusWindow(win.id)}
            className="font-mono text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors"
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.05em',
              padding: '0.2rem 0.6rem',
              lineHeight: 1,
            }}
          >
            {APP_REGISTRY[win.appId].windowTitle}
          </button>
        ))}
      </div>

      {/* Right side: contact + battery + clock */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span
            className="inline-block rounded-full"
            style={{
              width: 8,
              height: 8,
              background: '#dfff00',
              boxShadow: '0 0 6px #dfff00',
              animation: 'pulse-dot 1.5s ease-in-out infinite',
            }}
          />
          <span className="font-mono text-white" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
            available for work
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => {
              navigator.clipboard.writeText('matthew.whetsell@gmail.com')
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="font-mono uppercase text-black bg-white border border-white rounded-lg cursor-pointer hover:brightness-90 transition-all font-bold"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.1em',
              padding: '0.25rem 0.75rem',
              lineHeight: 1,
            }}
          >
            slide into my DMs
          </button>
          {copied && (
            <span
              className="absolute left-1/2 font-mono font-bold whitespace-nowrap"
              style={{ fontSize: '0.55rem', color: '#000', top: '100%', marginTop: 10, transform: 'translateX(-50%)' }}
            >
              copied my email addy
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="relative"
            style={{ width: 20, height: 10, border: '1px solid rgba(255,255,255,0.5)', borderRadius: 2 }}
          >
            <div
              style={{
                position: 'absolute',
                left: 1,
                top: 1,
                height: 'calc(100% - 2px)',
                width: `${battery}%`,
                background: battery <= 15 ? '#ef4444' : '#dfff00',
                borderRadius: 1,
                transition: 'width 3s linear, background 0.3s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -3,
                top: 2,
                width: 2,
                height: 6,
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '0 1px 1px 0',
              }}
            />
          </div>
          <span
            className="font-mono text-white/50"
            style={{ fontSize: '0.6rem' }}
          >
            {battery}%
          </span>
        </div>
        <span
          className="font-mono text-white/50"
          style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}
        >
          {time}
        </span>
      </div>
    </div>
  )
}
