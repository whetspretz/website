const VIDEOS = [
  '/projects/shelfspace/onboarding_opening_archetype.mp4',
  '/projects/shelfspace/onboarding_reveal_arch.mp4',
]

export function ArchetypeVideos(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 p-4">
      {VIDEOS.map((src, i) => (
        <div key={i} className="h-full overflow-hidden" style={{ borderRadius: 24 }}>
          <video src={src} autoPlay loop muted playsInline className="h-full object-cover" />
        </div>
      ))}
    </div>
  )
}
