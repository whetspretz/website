import { useMemo } from 'react'
import { ABOUT_SLIDES } from '@/lib/aboutSlides'
import { useDesktop } from '@/hooks/useDesktop'
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
  const { state: { showHidden } } = useDesktop()
  const visibleSlides = useMemo(
    () => ABOUT_SLIDES.filter(s => !s.hidden || showHidden),
    [showHidden],
  )
  return <Slideshow slides={visibleSlides} componentMap={COMPONENT_MAP} />
}
