import { ShimmerVideo } from '@/components/ui/ShimmerVideo'

const VIDEOS = [
  '/projects/shelfspace/1_onboarding.mp4',
  '/projects/shelfspace/3_onboarding.mp4',
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
          <ShimmerVideo
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
