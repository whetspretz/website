import { DESIGN_PROJECTS } from '@/lib/constants'
import type { DesignProject } from '@/types/apps'

export function getProjectById(id: string): DesignProject | undefined {
  return DESIGN_PROJECTS.find(p => p.id === id)
}

export function getNextProject(currentId: string): DesignProject {
  const idx = DESIGN_PROJECTS.findIndex(p => p.id === currentId)
  return DESIGN_PROJECTS[(idx + 1) % DESIGN_PROJECTS.length]
}

export function getProjectIndex(id: string): number {
  return DESIGN_PROJECTS.findIndex(p => p.id === id)
}
