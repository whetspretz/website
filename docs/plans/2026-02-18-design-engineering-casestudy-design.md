# Design Engineering Case Study — Design Doc

## Goal
Create "How I Approach Design Engineering" as a full slideshow case study (11 slides) in the portfolio. Explains the user's design engineering process, 6 tools used, and why this approach works.

## Slide Structure

| # | Type | Content |
|---|------|---------|
| 0 | `intro` | Title + meta + tags |
| 1 | `quote` | "A mockup is a promise. Code is the truth." |
| 2 | `split` | What design engineering is (static SVG + bullets) |
| 3 | `blank` | ProcessFlowGraphic (interactive) |
| 4 | `title` | "The Toolkit" |
| 5 | `columns` | Code-side: Superpowers, Beagle, Daydream |
| 6 | `columns` | Design-side: Figma MCP, Variant, Super Design |
| 7 | `blank` | ToolkitMapGraphic (interactive) |
| 8 | `split` | Key insight: tools compose into a system |
| 9 | `quote` | "These tools don't replace craft. They amplify it." |
| 10 | `split` | Summary: speed, quality, consistency |

## Interactive Graphics

### ProcessFlowGraphic
5-phase interactive SVG: Understand -> Design -> Prototype -> Build -> Ship. Click a phase to see description + which tools are active. Follows ProcessSlide.tsx pattern.

### ToolkitMapGraphic
Node diagram: 5 phases (top) connected to 6 tools (bottom). Click tool to see description + highlight connections. Click phase to highlight connected tools. Follows PigeonLayersSlide.tsx pattern.

### Tool-to-Phase Mapping
- Figma MCP: Design, Build
- Variant: Design, Prototype
- Super Design: Design, Prototype
- Superpowers: Prototype, Build
- Beagle: Build, Ship
- Daydream: Ship

## Files
- New: `src/components/apps/ProcessFlowGraphic.tsx`
- New: `src/components/apps/ToolkitMapGraphic.tsx`
- Modify: `src/lib/caseStudies.ts` (replace mini entry with project)
- Modify: `src/components/apps/ProjectsApp.tsx` (register in COMPONENT_MAP)
- Modify: `src/styles/index.css` (add animation classes)
