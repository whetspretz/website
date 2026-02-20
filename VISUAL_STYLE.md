# Terminal Retro — Interactive Component Visual Style

Use this reference when building interactive visualizations, diagrams, or data-display components for the slide system. This style is used by `ProcessSlide`, `TimelineSlide`, and `PasswordGate` (guardian creature).

## Colors

| Token | Value | Usage |
|-------|-------|-------|
| Background | inherited (dark, `#1a1a1a` window bg) | Component fills the slide area |
| White/90 | `rgba(255,255,255,0.9)` | Active labels, primary text |
| White/70 | `rgba(255,255,255,0.7)` | Hover states, secondary active |
| White/50 | `rgba(255,255,255,0.5)` | Inactive labels, icons |
| White/30 | `rgba(255,255,255,0.3)` | Tick marks, year labels, faint text |
| White/18 | `rgba(255,255,255,0.18)` | Track lines, primary guides |
| White/12 | `rgba(255,255,255,0.12)` | Secondary guide lines |
| White/08 | `rgba(255,255,255,0.08)` | Tertiary guides |
| White/06 | `rgba(255,255,255,0.06)` | Active block fills |
| White/03 | `rgba(255,255,255,0.03)` | Inactive block fills |
| White/02 | `rgba(255,255,255,0.02)` | Very subtle fills |
| Accent | `#dfff00` | Present indicators, success states |
| Blue accent | `#60a5fa` | Detail panel bullet markers |
| Detail bg | `rgba(5,5,5,0.95)` | Floating panel background |
| Detail border | `#222` | Floating panel border |
| Active node fill | `#fff` (or `#111` inactive) | Circle node fills |
| Rainbow palette | `#dfff00, #00ffd5, #60a5fa, #c084fc, #fb7185, #fbbf24` | Confetti, shimmer effects |

## Typography

- **Font**: `'JetBrains Mono', monospace` (exclusively)
- **Sizes**: `9px` (tick labels), `10px` (node labels), `0.55rem` (step counters), `0.7-0.85rem` (detail panel text), `0.9-1.1rem` (sequencer numbers)
- **Labels**: uppercase, `letter-spacing: 0.12em`
- **Weights**: `400` (normal), `700` (active/bold)

## Decorative Elements

### Dot Grid Background
```css
.process-dot-grid {
  background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 8px 8px;
}
```

### Corner Brackets
```html
<div class="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/15" />
<div class="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/15" />
<div class="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/15" />
<div class="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/15" />
```

### CRT Scanline Overlay
```html
<div class="absolute inset-0 pointer-events-none z-20" style={{
  background: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.04) 50%)',
  backgroundSize: '100% 2px',
}} />
```

### Guide Lines (SVG)
- Primary: `stroke="rgba(255,255,255,0.18)" strokeDasharray="4 6"`
- Secondary: `stroke="rgba(255,255,255,0.12)" strokeDasharray="3 8"`
- Active arrows: `strokeWidth="1.5"`, solid, `rgba(255,255,255,0.5)`
- Inactive arrows: `strokeWidth="1"`, dashed `"4 4"`, `rgba(255,255,255,0.15)`

## SVG Strokes

| State | strokeWidth | stroke color | dasharray |
|-------|------------|--------------|-----------|
| Active outline | 1.2-1.5 | `#fff` | none |
| Inactive outline | 0.8-1.0 | `rgba(255,255,255,0.25-0.4)` | none |
| Active connection | 1.5 | `rgba(255,255,255,0.5)` | none |
| Inactive connection | 1.0 | `rgba(255,255,255,0.15)` | `4 4` |
| Guide line (primary) | 1.0 | `rgba(255,255,255,0.18)` | `4 6` |
| Guide line (secondary) | 1.0 | `rgba(255,255,255,0.12)` | `3 8` |
| Creature limbs | 1.5 | dim color | `4 3` |

## Animations

### Reusable CSS Classes (defined in `src/styles/index.css`)

| Class | Keyframe | Duration | Easing | Effect |
|-------|----------|----------|--------|--------|
| `process-icon-pulse` | `iconPulse` | 3s | ease-in-out | Scale 1→1.15→1 |
| `process-icon-spin` | `iconSpin` | 10s | linear | Rotate 0→360deg |
| `process-icon-spin-reverse` | `iconSpinReverse` | 12s | linear | Rotate 0→-360deg |
| `process-icon-blink` | `iconBlink` | 4s | ease-in-out | ScaleY 1→0.1→1 |
| `process-node-active` | `nodeGlow` | 2s | ease-in-out | Drop-shadow pulse |
| `process-item-enter` | `staggerFadeIn` | 0.2s | ease-out | Fade up (use with `animationDelay`) |
| `process-value-spin` | `valueSpin` | 8s | linear | Continuous rotation |
| `process-value-starburst path` | `valueShimmer` | 6s | ease-in-out | Rainbow color cycle |
| `process-confetti` | `confettiBurst` | 0.8s | ease-out | Radial burst + fade |
| `guardian-float` | `guardianFloat` | 3s | ease-in-out | TranslateY 0→-6px→0 |
| `guardian-eye-blink` | `guardianEyeBlink` | 6s | ease-in-out | ScaleY blink |
| `guardian-head-pulse` | `iconPulse` | 4s | ease-in-out | Scale breathing |
| `guardian-body-spin` | `iconSpin` | 15s | linear | Slow body rotation |
| `timeline-present-dot` | `iconPulse` | 3s | ease-in-out | Pulsing dot |
| `timeline-block-active rect` | `nodeGlow` | 2s | ease-in-out | Block glow |

### Timing guidelines
- Fast interactions: `0.15-0.3s` (stagger-in, hover, transitions)
- Medium loops: `2-4s` (pulse, float, blink, glow)
- Slow ambiance: `6-15s` (spin, shimmer, color cycle)

## Interactive Patterns

### Detail Panel (floating info card)
```typescript
style={{
  position: 'absolute',
  top: 12,
  right: 12,
  background: 'rgba(5,5,5,0.95)',
  border: '1px solid #222',
  borderRadius: 8,
  padding: '0.75rem 1rem',
  maxWidth: 220,
  minWidth: 160,
}}
```
- Title: bold, `0.85rem`, with blue `*` marker
- Sublabel: `0.7rem`, `white/50`
- Items: `0.75rem`, `white/60`, stagger-animated with `process-item-enter` + `animationDelay: i * 60ms`

### Click-to-Select Pattern
- Default: first item active
- Click changes active index
- Active state: brighter stroke/fill, glow animation, decorative elements appear
- Inactive: dimmed, thinner strokes
- Transitions: `transition-all duration-200` or `duration-300`

### Responsive (ResizeObserver)
- Detect width via `ResizeObserver` on container ref
- Breakpoint: ~400-500px
- Narrow: switch flex/layout direction to vertical
- Wide: horizontal layout

## Component Structure

All Terminal Retro components share this outer structure:
```tsx
<div className="flex flex-col h-full relative process-dot-grid">
  {/* CRT scanline overlay */}
  <div className="absolute inset-0 pointer-events-none z-20" style={{...}} />
  {/* Corner brackets (4x) */}
  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/15" />
  ...
  {/* Main content area */}
  <div ref={containerRef} className="flex-1 min-h-0 relative flex items-center justify-center px-4">
    <svg viewBox="..." preserveAspectRatio="xMidYMid meet">
      {/* SVG visualization */}
    </svg>
    {/* Detail panel (absolute positioned) */}
  </div>
  {/* Optional: sequencer/navigation bar at bottom */}
</div>
```

## Existing Components Using This Style
- `src/components/apps/ProcessSlide.tsx` — 5-step process diagram with dual layers
- `src/components/slides/TimelineSlide.tsx` — horizontal/vertical timeline blocks
- `src/components/apps/PasswordGate.tsx` — guardian creature with eyes + password form
