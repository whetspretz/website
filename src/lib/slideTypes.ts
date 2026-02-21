export interface AnnotatedWord {
  word: string
  popupText?: string
  popupImage?: string
  popupImageAlt?: string
}

export type RichSegment = string | AnnotatedWord
export type RichParagraph = string | RichSegment[]

export interface ColumnItem {
  imageSrc: string
  imageAlt: string
  header?: string
  text: RichParagraph
}

export interface IntroSlideMeta {
  label: string
  value: string
}

export type InlineDividerStyle = 'subtle' | 'rainbow'

export interface IntroSlide {
  type: 'intro'
  title: string
  subtitle: RichParagraph[]
  avatarSrc?: string
  logoSrc?: string
  meta?: IntroSlideMeta[]
  tags?: string[]
  dividers?: {
    afterSubtitle?: InlineDividerStyle
    afterTags?: InlineDividerStyle
    afterMeta?: InlineDividerStyle
  }
}

export interface ImageSlide {
  type: 'image'
  title: string
  imageSrc?: string
  imageAlt?: string
  videoSrc?: string
  linkUrl?: string
  header?: RichParagraph
  caption?: RichParagraph
}

export interface ColumnsSlide {
  type: 'columns'
  title: string
  columns: [ColumnItem, ColumnItem, ColumnItem]
}

export interface BlankSlide {
  type: 'blank'
  title: string
  componentId?: string
}

export interface SplitSlide {
  type: 'split'
  title: string
  imagePosition: 'left' | 'right'
  imageSrc?: string
  videoSrc?: string
  imageAlt?: string
  componentId?: string
  bullets: RichParagraph[]
  caption?: RichParagraph
}

export interface TimelineEntry {
  label: string
  sublabel?: string
  startYear: number
  startMonth?: number
  endYear?: number
  endMonth?: number
  details?: string[]
}

export interface TimelineSlide {
  type: 'timeline'
  title: string
  entries: TimelineEntry[]
  caption?: string
}

export interface TitleSlide {
  type: 'title'
  title: string
  caption?: string
}

export interface TocEntry {
  label: string
  slideIndex: number
}

export interface TocSlide {
  type: 'toc'
  title: string
  entries: TocEntry[]
}

export interface QuoteSlide {
  type: 'quote'
  text: string
  attribution?: string
}

export interface DualVideoSlide {
  type: 'dual-video'
  title: string
  leftSrc: string
  rightSrc: string
  leftCaption?: string
  rightCaption?: string
  caption?: string
}

export interface SectionItem {
  label: string
  text: RichParagraph
}

export interface SectionsSplitSlide {
  type: 'sections-split'
  title: string
  imagePosition: 'left' | 'right'
  imageSrc?: string
  videoSrc?: string
  imageAlt?: string
  sections: SectionItem[]
}

export type Slide = IntroSlide | ImageSlide | ColumnsSlide | BlankSlide | SplitSlide | TimelineSlide | TitleSlide | TocSlide | QuoteSlide | DualVideoSlide | SectionsSplitSlide

// --- Mini Project Block Types ---

export interface MiniImageBlock {
  type: 'image'
  src: string
  alt: string
  caption?: string
}

export interface MiniImageGridBlock {
  type: 'image-grid'
  columns: 2 | 3
  images: { src: string; alt: string; caption?: string }[]
}

export interface MiniTextBlock {
  type: 'text'
  content: string
}

export interface MiniHeadingBlock {
  type: 'heading'
  title: string
  subtitle?: string
}

export interface MiniComponentBlock {
  type: 'component'
  componentId: string
}

export type MiniProjectBlock = MiniImageBlock | MiniImageGridBlock | MiniTextBlock | MiniHeadingBlock | MiniComponentBlock
