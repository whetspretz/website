import { TRASH_ENTRIES } from '@/lib/caseStudies'
import type { TrashItem } from '@/lib/caseStudies'

export function TrashApp(): React.JSX.Element {
  const items = TRASH_ENTRIES.filter((e): e is TrashItem => e.kind === 'trash-item')

  return (
    <div className="font-mono">
      <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <span className="text-white uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>
          Older Projects
        </span>
        <span className="text-white" style={{ fontSize: '0.6rem' }}>
          {items.length} items
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
          <a
            key={entry.slug}
            href={entry.pdfSrc}
            download
            className="flex items-center gap-3 py-3 cursor-pointer hover:bg-white/5 transition-colors px-2 -mx-2 text-white no-underline"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', textDecoration: 'none' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="2" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" className="text-white" />
              <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1" className="text-white" />
              <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1" className="text-white" />
              <line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1" className="text-white" />
            </svg>
            <span className="text-white flex-1">{entry.title}</span>
            <span className="text-white" style={{ fontSize: '0.65rem' }}>
              {entry.tag}
            </span>
          </a>
        )
      })}
    </div>
  )
}
