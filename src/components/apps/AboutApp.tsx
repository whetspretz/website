import { ABOUT_SLIDES } from '@/lib/aboutSlides'
import { ProcessSlide } from './ProcessSlide'
import { CoreStrengthsGraphic } from './CoreStrengthsGraphic'
import { ProcessFlowGraphic } from './ProcessFlowGraphic'
import { LookingForNextGraphic } from './LookingForNextGraphic'
import { Slideshow } from '@/components/slides/Slideshow'

const COMPONENT_MAP = {
  process: ProcessSlide,
  'core-strengths': CoreStrengthsGraphic,
  'process-flow': ProcessFlowGraphic,
  'looking-for-next': LookingForNextGraphic,
}

export function AboutApp(): React.JSX.Element {
  return <Slideshow slides={ABOUT_SLIDES} componentMap={COMPONENT_MAP} />
}
