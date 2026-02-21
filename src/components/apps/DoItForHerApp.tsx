import { ShimmerImage } from '@/components/ui/ShimmerImage'

export function DoItForHerApp(): React.JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <ShimmerImage
        src="/doitforher.webp"
        alt="Do T for her"
        className="max-w-full max-h-full object-contain"
        loading="lazy"
      />
    </div>
  )
}
