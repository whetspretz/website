# Mini Projects Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add scrollable "mini project" pages to the portfolio alongside existing slide-based case studies.

**Architecture:** New `MiniProject` kind in the `CaseStudyEntry` union with a `blocks` array of typed content blocks. A new `MiniProjectView` component renders all blocks in a scrollable page. `ProjectsApp` branches on `kind` to show either Slideshow or MiniProjectView.

**Tech Stack:** React 19, TypeScript strict, Tailwind v4, existing CSS design tokens.

---

### Task 1: Add block type definitions to slideTypes.ts

**Files:**
- Modify: `src/lib/slideTypes.ts:113` (end of file)

**Step 1: Add the 5 block interfaces and union type at the end of the file**

After the existing `Slide` type (line 113), add:

```typescript
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
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/lib/slideTypes.ts
git commit -m "feat: add MiniProjectBlock type definitions"
```

---

### Task 2: Add MiniProject interface to caseStudies.ts

**Files:**
- Modify: `src/lib/caseStudies.ts:1-20` (imports and type definitions)

**Step 1: Add MiniProjectBlock import**

Update line 1 from:
```typescript
import type { Slide } from './slideTypes'
```
to:
```typescript
import type { Slide, MiniProjectBlock } from './slideTypes'
```

**Step 2: Add MiniProject interface after SectionDivider (after line 18)**

```typescript
export interface MiniProject {
  kind: 'mini'
  slug: string
  title: string
  tag: string
  year: string
  description: string
  blocks: MiniProjectBlock[]
  locked?: boolean
}
```

**Step 3: Update the CaseStudyEntry union (line 20)**

Change from:
```typescript
export type CaseStudyEntry = CaseStudy | SectionDivider
```
to:
```typescript
export type CaseStudyEntry = CaseStudy | MiniProject | SectionDivider
```

**Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 5: Commit**

```bash
git add src/lib/caseStudies.ts
git commit -m "feat: add MiniProject type to CaseStudyEntry union"
```

---

### Task 3: Create MiniProjectView component

**Files:**
- Create: `src/components/slides/MiniProjectView.tsx`

**Step 1: Create the scrollable page renderer**

```tsx
import type { MiniProjectBlock } from '@/lib/slideTypes'
import type { BlankSlideComponentMap } from './SlideViews'

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
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-md"
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
              <img
                src={img.src}
                alt={img.alt}
                className="w-full rounded-md"
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
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/components/slides/MiniProjectView.tsx
git commit -m "feat: add MiniProjectView scrollable page component"
```

---

### Task 4: Update ProjectsApp to support mini projects

**Files:**
- Modify: `src/components/apps/ProjectsApp.tsx`

**Step 1: Update imports (lines 2-3)**

Change:
```typescript
import { CASE_STUDIES } from '@/lib/caseStudies'
import type { CaseStudy } from '@/lib/caseStudies'
```
to:
```typescript
import { CASE_STUDIES } from '@/lib/caseStudies'
import type { CaseStudy, MiniProject } from '@/lib/caseStudies'
import { MiniProjectView } from '@/components/slides/MiniProjectView'
```

**Step 2: Add activeMini lookup (after line 35)**

After the existing `activeStudy` line, add:
```typescript
const activeMini = CASE_STUDIES.find((e): e is MiniProject => e.kind === 'mini' && e.slug === activeSlug)
```

**Step 3: Update the activeStudy effect (lines 43-55)**

Replace the existing effect with one that handles both project types:
```typescript
useEffect(() => {
  if (activeStudy || activeMini) {
    setOnTitleClick(() => () => { setActiveSlug(null); setUnlocked(false) })
    if (activeStudy && tocIndex >= 0) {
      setTitleExtra({ label: 'Contents', onClick: () => goToSlideRef.current?.(tocIndex) })
    } else {
      setTitleExtra(undefined)
    }
  } else {
    setOnTitleClick(undefined)
    setTitleExtra(undefined)
  }
}, [activeStudy, activeMini, tocIndex, setOnTitleClick, setTitleExtra])
```

**Step 4: Add mini project render branch (after line 67)**

After the existing `if (activeStudy)` block that returns `<Slideshow />`, add:
```typescript
if (activeMini) {
  if (activeMini.locked && !unlocked) {
    return (
      <PasswordGate
        onUnlocked={() => setUnlocked(true)}
        onBack={() => setActiveSlug(null)}
      />
    )
  }
  return <MiniProjectView blocks={activeMini.blocks} componentMap={COMPONENT_MAP} />
}
```

**Step 5: Update list view to show different icon for mini projects (lines 78-118)**

In the `.map()` callback, after the divider check (line 94), the current code assumes all non-divider entries are case studies. Update the row to check the entry's kind and render a different icon:

Replace the existing SVG icon (lines 102-105):
```tsx
<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
  <rect x="2" y="4" width="12" height="10" stroke="currentColor" strokeWidth="1.5" className="text-white" />
  <rect x="2" y="3" width="6" height="3" stroke="currentColor" strokeWidth="1" className="text-white" />
</svg>
```

With a conditional icon:
```tsx
{entry.kind === 'mini' ? (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="3" y="2" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" className="text-white" />
    <line x1="5" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1" className="text-white" />
    <line x1="5" y1="8" x2="11" y2="8" stroke="currentColor" strokeWidth="1" className="text-white" />
    <line x1="5" y1="11" x2="9" y2="11" stroke="currentColor" strokeWidth="1" className="text-white" />
  </svg>
) : (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="4" width="12" height="10" stroke="currentColor" strokeWidth="1.5" className="text-white" />
    <rect x="2" y="3" width="6" height="3" stroke="currentColor" strokeWidth="1" className="text-white" />
  </svg>
)}
```

**Step 6: Update the header count to include mini projects (line 76)**

Change:
```tsx
<span className="text-white" style={{ fontSize: '0.6rem' }}>{projects.length} items</span>
```
to:
```tsx
<span className="text-white" style={{ fontSize: '0.6rem' }}>
  {CASE_STUDIES.filter(e => e.kind !== 'divider').length} items
</span>
```

**Step 7: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 8: Commit**

```bash
git add src/components/apps/ProjectsApp.tsx
git commit -m "feat: support mini projects in ProjectsApp list and view"
```

---

### Task 5: Add a test mini project entry

**Files:**
- Modify: `src/lib/caseStudies.ts` (end of the CASE_STUDIES array)

**Step 1: Add a test mini project to the array**

At the end of the `CASE_STUDIES` array, before the closing `]`, add:

```typescript
{
  kind: 'mini',
  slug: 'test-mini',
  title: 'Test Mini Project',
  tag: 'test',
  year: '2026',
  description: 'A test mini project to verify the scrollable page works.',
  blocks: [
    { type: 'heading', title: 'This is a mini project', subtitle: 'A scrollable page with mixed content blocks' },
    { type: 'text', content: 'This is a paragraph of text. Mini projects render as scrollable pages instead of slideshows. You can mix images, text, headings, and custom components freely.' },
    { type: 'heading', title: 'Image Examples' },
    { type: 'image', src: '/projects/shelfspace/moodring-img.webp', alt: 'Test image', caption: 'A full-width image with caption.' },
    { type: 'text', content: 'Below is a 2-up image grid:' },
    {
      type: 'image-grid',
      columns: 2,
      images: [
        { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid image 1', caption: 'First image' },
        { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid image 2', caption: 'Second image' },
      ],
    },
    { type: 'text', content: 'And a 3-up image grid:' },
    {
      type: 'image-grid',
      columns: 3,
      images: [
        { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid 1' },
        { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid 2' },
        { src: '/projects/shelfspace/moodring-img.webp', alt: 'Grid 3' },
      ],
    },
  ],
},
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 3: Verify in browser**

Open the portfolio, go to Projects, scroll to the bottom. Click "Test Mini Project". You should see:
- Scrollable page with heading, text, full-width image, 2-up grid, 3-up grid
- Clicking window title returns to list
- The test mini project shows a document icon (not folder icon) in the list

**Step 4: Commit**

```bash
git add src/lib/caseStudies.ts
git commit -m "feat: add test mini project entry"
```

---

### Summary of all files touched

| File | Action |
|------|--------|
| `src/lib/slideTypes.ts` | Add 5 block interfaces + `MiniProjectBlock` union |
| `src/lib/caseStudies.ts` | Add `MiniProject` interface, update `CaseStudyEntry`, add test entry |
| `src/components/slides/MiniProjectView.tsx` | New file — scrollable block renderer |
| `src/components/apps/ProjectsApp.tsx` | Import MiniProject/MiniProjectView, add render branch, update list icon and count |
