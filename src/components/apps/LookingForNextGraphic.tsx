const SECTIONS = [
  {
    header: 'Full-Stack Product Ownership',
    body: "I'm looking for an IC role where design and engineering are fully blended and the best idea ships fastest, regardless of title. With 15 years across product, brand, and front end \u2014 now working as a design engineer with Claude Code \u2014 I'm most energized when I can move fluidly from concept to production: designing systems, writing UI, shaping motion and copy, and vibe-coding prototypes into real product.",
  },
  {
    header: 'Builder-Dense, Low-Ceremony Teams',
    body: "I thrive in environments where everyone contributes directly to the product. Projects like Shelfspace \u2014 where PM, engineering, and design all actively produce code \u2014 feel like the future: high ownership, fast iteration, and shared momentum over rigid role boundaries.",
  },
  {
    header: 'Expanding the Design Frontier',
    body: "I'm excited to push beyond traditional design workflows and help invent new ways of building software. I'm looking for a team of deeply hands-on builders where I can apply my range (design, front end, motion, copy, and AI-assisted development) to create products that couldn't exist under older, more siloed models.",
  },
]

export function LookingForNextGraphic(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center p-8 overflow-auto">
      <div style={{ maxWidth: 680 }} className="flex flex-col gap-8">
        {SECTIONS.map((s) => (
          <div key={s.header}>
            <div className="flex items-center gap-2.5 mb-2">
              <svg width="14" height="14" viewBox="0 0 14 14">
                <rect
                  x="7" y="0" width="9" height="9"
                  rx="1.5"
                  transform="rotate(45 7 0)"
                  fill="#60a5fa"
                />
              </svg>
              <span
                className="font-sans font-bold text-white"
                style={{ fontSize: '1.1rem' }}
              >
                {s.header}
              </span>
            </div>
            <p
              className="font-mono text-white/70 leading-relaxed"
              style={{ fontSize: '0.85rem', margin: 0 }}
            >
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
