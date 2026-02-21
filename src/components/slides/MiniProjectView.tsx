import type { MiniProjectBlock } from '@/lib/slideTypes'
import type { BlankSlideComponentMap } from './SlideViews'
import { ShimmerImage } from '@/components/ui/ShimmerImage'

interface MiniProjectViewProps {
  blocks: MiniProjectBlock[]
  componentMap?: BlankSlideComponentMap
}

export function MiniProjectView({ blocks, componentMap }: MiniProjectViewProps): React.JSX.Element {
  return (
    <div className="h-full overflow-y-auto px-8 py-8">
      <div className="flex flex-col" style={{ gap: '48px' }}>
        {blocks.map((block, i) => (
          <BlockRenderer key={i} block={block} componentMap={componentMap} />
        ))}
      </div>
    </div>
  )
}

function BlockRenderer({ block, componentMap }: { block: MiniProjectBlock; componentMap?: BlankSlideComponentMap }): React.JSX.Element {
  switch (block.type) {
    case 'heading':
      return (
        <div>
          <h2 className="text-white" style={{ fontSize: '1.5rem', lineHeight: 1.3 }}>
            {block.title}
          </h2>
          {block.subtitle && (
            <p
              className="font-mono mt-2"
              style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}
            >
              {block.subtitle}
            </p>
          )}
        </div>
      )

    case 'text':
      return (
        <p
          className="font-mono"
          style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)' }}
        >
          {block.content}
        </p>
      )

    case 'image':
      return (
        <div>
          <ShimmerImage
            src={block.src}
            alt={block.alt}
            className="w-full rounded-md"
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
          {block.caption && (
            <p
              className="font-mono mt-2"
              style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}
            >
              {block.caption}
            </p>
          )}
        </div>
      )

    case 'image-grid':
      return (
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${block.columns}, 1fr)`, gap: '12px' }}
        >
          {block.images.map((img, j) => (
            <div key={j}>
              <ShimmerImage
                src={img.src}
                alt={img.alt}
                className="w-full rounded-md"
                loading="lazy"
                style={{ objectFit: 'cover' }}
              />
              {img.caption && (
                <p
                  className="font-mono mt-1"
                  style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}
                >
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )

    case 'component': {
      const Component = componentMap?.[block.componentId]
      return (
        <div style={{ minHeight: '300px' }}>
          {Component ? <Component /> : null}
        </div>
      )
    }
  }
}
