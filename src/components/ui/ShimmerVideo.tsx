import { useState, useRef, useEffect, useCallback } from 'react'

interface ShimmerVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

export function ShimmerVideo({
  className,
  style,
  onCanPlay,
  muted,
  ...props
}: ShimmerVideoProps): React.JSX.Element {
  const [ready, setReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // React doesn't reliably set the muted attribute on initial render.
  // Use a ref to ensure it's applied, which is required for iOS autoplay.
  useEffect(() => {
    if (videoRef.current && muted) {
      videoRef.current.muted = true
    }
  }, [muted])

  const handleCanPlay = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    setReady(true)
    onCanPlay?.(e)
  }, [onCanPlay])

  return (
    <div className="shimmer-skeleton" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!ready && <div className="shimmer-placeholder" />}
      <video
        ref={videoRef}
        {...props}
        muted={muted}
        preload="metadata"
        className={className}
        style={{
          ...style,
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        onCanPlay={handleCanPlay}
      />
    </div>
  )
}
