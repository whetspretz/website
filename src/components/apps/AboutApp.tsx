import { ABOUT_SLIDES } from '@/lib/aboutSlides'
import { ProcessSlide } from './ProcessSlide'
import { Slideshow } from '@/components/slides/Slideshow'

const COMPONENT_MAP = { process: ProcessSlide }

export function AboutApp(): React.JSX.Element {
  return <Slideshow slides={ABOUT_SLIDES} componentMap={COMPONENT_MAP} />
}
