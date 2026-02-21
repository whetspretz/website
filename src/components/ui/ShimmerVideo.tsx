import { useState } from 'react'

interface ShimmerVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {}

export function ShimmerVideo({
  className,
  style,
  onCanPlay,
  ...props
}: ShimmerVideoProps): React.JSX.Element {
  const [ready, setReady] = useState(false)

  return (
    <div className="shimmer-skeleton" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!ready && <div className="shimmer-placeholder" />}
      <video
        {...props}
        className={className}
        style={{
          ...style,
          opacity: ready ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        onCanPlay={(e) => {
          setReady(true)
          onCanPlay?.(e)
        }}
      />
    </div>
  )
}
