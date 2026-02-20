const VIDEOS = [
  '/projects/shelfspace/1_onboarding.MOV',
  '/projects/shelfspace/3_onboarding.MOV',
]

export function OnboardingVideos(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 p-4">
      {VIDEOS.map((src, i) => (
        <div
          key={i}
          className="h-full overflow-hidden"
          style={{ borderRadius: 24 }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            className="h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
