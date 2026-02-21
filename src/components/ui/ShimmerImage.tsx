import { useState } from 'react'

interface ShimmerImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function ShimmerImage({
  className,
  style,
  onLoad,
  onError,
  ...props
}: ShimmerImageProps): React.JSX.Element {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className="shimmer-skeleton" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {!loaded && !errored && <div className="shimmer-placeholder" />}
      <img
        {...props}
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        onLoad={(e) => {
          setLoaded(true)
          onLoad?.(e)
        }}
        onError={(e) => {
          setErrored(true)
          ;(e.target as HTMLImageElement).style.display = 'none'
          onError?.(e)
        }}
      />
    </div>
  )
}
