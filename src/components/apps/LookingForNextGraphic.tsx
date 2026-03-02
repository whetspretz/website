const SECTIONS = [
  {
    header: 'Full-Stack Product Ownership',
    body: "I'm looking for an IC role where design and engineering are fully blended and the best idea ships fastest, regardless of title. With 15 years across product, brand, and front end \u2014 now working as a design engineer with Claude Code \u2014 I'm most energized when I can move fluidly from concept to production: designing systems, writing UI, shaping motion and copy, and vibe-coding prototypes into real product.",
  },
  {
    header: 'Frontier-Pushing Work',
    body: "I want to work on something interesting \u2014 a product or problem that brings a genuinely new perspective. Whether it\u2019s rethinking how people interact with AI, reimagining a broken industry, or building tools that didn\u2019t exist a year ago, I\u2019m drawn to teams that are pushing into uncharted territory rather than optimizing what already works.",
  },
  {
    header: 'Small-Team, High-Autonomy Culture',
    body: "Even inside a larger company, I do my best work in small, autonomous teams with real ownership. I\u2019m looking for a founding designer role \u2014 or something early enough that I can help shape the product, the culture, and the design practice as it grows. High trust, low bureaucracy, and the freedom to move fast.",
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
