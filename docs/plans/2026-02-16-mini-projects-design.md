# Mini Projects — Scrollable Project Pages

## Problem

The portfolio currently only supports slide-based case studies (one slide at a time, arrow navigation). Some projects are better presented as a scrollable page with mixed content — images, text, headings, and custom components — like a traditional portfolio case study page.

## Decision

Add a new `MiniProject` kind (`kind: 'mini'`) to the existing `CaseStudyEntry` union. Mini projects use a `blocks` array instead of `slides`, and render in a new `MiniProjectView` component that displays all content in a single scrollable page.

## Data Types

### New block types (defined in `src/lib/slideTypes.ts`)

```typescript
interface ImageBlock {
  type: 'image'
  src: string
  alt: string
  caption?: string
}

interface ImageGridBlock {
  type: 'image-grid'
  columns: 2 | 3
  images: { src: string; alt: string; caption?: string }[]
}

interface TextBlock {
  type: 'text'
  content: string
}

interface HeadingBlock {
  type: 'heading'
  title: string
  subtitle?: string
}

interface ComponentBlock {
  type: 'component'
  componentId: string  // maps to existing COMPONENT_MAP
}

type MiniProjectBlock = ImageBlock | ImageGridBlock | TextBlock | HeadingBlock | ComponentBlock
```

### New entry type (defined in `src/lib/caseStudies.ts`)

```typescript
interface MiniProject {
  kind: 'mini'
  slug: string
  title: string
  tag: string
  year: string
  description: string
  blocks: MiniProjectBlock[]
  locked?: boolean
}

type CaseStudyEntry = CaseStudy | MiniProject | SectionDivider
```

Mini projects are defined in the same `CASE_STUDIES` array, interleaved with case studies and section dividers.

## Component Architecture

### ProjectsApp changes

ProjectsApp currently has two states: list view and slideshow. A third branch is added:

1. `activeSlug` is set on click (unchanged)
2. Matched entry is checked: `kind === 'project'` renders `<Slideshow />`, `kind === 'mini'` renders `<MiniProjectView />`
3. Clicking window title returns to list (unchanged)

### List view changes

Mini projects appear in the same list with a different icon — a page/document icon instead of the presentation/folder icon used for case studies. Same row layout otherwise (title on left, tag on right).

### New component: `MiniProjectView`

- Location: `src/components/slides/MiniProjectView.tsx`
- Receives `blocks` array and `componentMap`
- Renders a scrollable `<div>` with `overflow-y: auto`, full height
- Maps over blocks, rendering the appropriate sub-component per type

## Visual Styling

All styling uses existing design tokens. No new fonts or colors.

### Container
- `overflow-y: auto`, full height of window content area
- Horizontal padding: `px-8` (matches slide padding)
- Vertical gap between blocks: `48px`

### HeadingBlock
- Title: Clash Display, white, ~1.5rem
- Subtitle: JetBrains Mono, `rgba(255,255,255,0.5)`, ~0.8rem

### TextBlock
- JetBrains Mono, `rgba(255,255,255,0.7)`, ~0.85rem, line-height 1.7

### ImageBlock (full-width)
- `width: 100%`, `object-fit: cover`, `rounded-md`
- Optional caption: small mono text, `rgba(255,255,255,0.4)`

### ImageGridBlock (2-up or 3-up)
- CSS grid: `grid-cols-2` or `grid-cols-3`, gap `12px`
- Each image fills its cell, same rounded corners
- Per-image optional caption

### ComponentBlock
- Renders mapped component in a container with `min-height: 300px`
- Same `COMPONENT_MAP` lookup as slides use

## Files to Create/Modify

1. `src/lib/slideTypes.ts` — Add `MiniProjectBlock` types and export
2. `src/lib/caseStudies.ts` — Add `MiniProject` interface, update `CaseStudyEntry` union, add mini project entries to array
3. `src/components/slides/MiniProjectView.tsx` — New scrollable page renderer
4. `src/components/apps/ProjectsApp.tsx` — Add `kind === 'mini'` branch, pass componentMap to MiniProjectView, update list view icon for mini projects
