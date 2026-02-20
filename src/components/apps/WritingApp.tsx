export function WritingApp(): React.JSX.Element {
  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span className="text-white uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
          Writing
        </span>
        <span className="text-white" style={{ fontSize: '0.6rem' }}>3 entries</span>
      </div>
      {['On Design Systems', 'Notes on Minimalism', 'Why I Build Things'].map((name, i) => (
        <div
          key={name}
          className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white/5 transition-colors px-2 -mx-2"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 2 H10 L12 4 V14 H4 Z" stroke="currentColor" strokeWidth="1.5" className="text-white" />
            <line x1="6" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1" className="text-white" />
            <line x1="6" y1="9.5" x2="10" y2="9.5" stroke="currentColor" strokeWidth="1" className="text-white" />
          </svg>
          <span className="text-white flex-1">{name}</span>
          <span className="text-white" style={{ fontSize: '0.65rem' }}>
            {['essay', 'notes', 'essay'][i]}
          </span>
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
