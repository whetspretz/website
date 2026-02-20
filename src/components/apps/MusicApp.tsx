export function MusicApp(): React.JSX.Element {
  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span className="text-white uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
          Now Playing
        </span>
        <span className="text-white" style={{ fontSize: '0.6rem' }}>3 tracks</span>
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-white">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
          <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
        </svg>
        <span className="text-white" style={{ fontSize: '0.75rem' }}>No track selected</span>
      </div>
      {['Track 01 — Ambient Loop', 'Track 02 — Lo-fi Beat', 'Track 03 — Synthwave'].map(name => (
        <div
          key={name}
          className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white/5 transition-colors px-2 -mx-2"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <span className="text-white" style={{ fontSize: '0.7rem' }}>&#9654;</span>
          <span className="text-white">{name}</span>
        </div>
      ))}
      <div className="mt-4 pt-3" style={{ borderTop: '1px dotted rgba(255,255,255,0.1)' }}>
        <span className="text-white" style={{ fontSize: '0.6rem' }}>
          placeholder content
        </span>
      </div>
    </div>
  )
}
