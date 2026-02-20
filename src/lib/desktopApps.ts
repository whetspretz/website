import type { AppId } from '@/lib/desktopTypes'

export interface AppConfig {
  id: AppId
  label: string
  windowTitle: string
  defaultSize: { width: number; height: number }
  defaultPosition: { x: number; y: number }
}

export const APP_REGISTRY: Record<AppId, AppConfig> = {
  projects: {
    id: 'projects',
    label: 'projects',
    windowTitle: 'projects',
    defaultSize: { width: 500, height: 400 },
    defaultPosition: { x: 200, y: 120 },
  },
  about: {
    id: 'about',
    label: 'about',
    windowTitle: 'about',
    defaultSize: { width: 450, height: 520 },
    defaultPosition: { x: 300, y: 100 },
  },
  terminal: {
    id: 'terminal',
    label: 'terminal',
    windowTitle: 'terminal',
    defaultSize: { width: 520, height: 360 },
    defaultPosition: { x: 250, y: 150 },
  },
  links: {
    id: 'links',
    label: 'links',
    windowTitle: 'links',
    defaultSize: { width: 400, height: 350 },
    defaultPosition: { x: 350, y: 130 },
  },
  trash: {
    id: 'trash',
    label: 'trash',
    windowTitle: 'trash',
    defaultSize: { width: 500, height: 400 },
    defaultPosition: { x: 400, y: 180 },
  },
  music: {
    id: 'music',
    label: 'music player',
    windowTitle: 'music player',
    defaultSize: { width: 420, height: 340 },
    defaultPosition: { x: 220, y: 140 },
  },
  writing: {
    id: 'writing',
    label: 'my writing',
    windowTitle: 'my writing',
    defaultSize: { width: 480, height: 400 },
    defaultPosition: { x: 260, y: 100 },
  },
  painter: {
    id: 'painter',
    label: 'painter',
    windowTitle: 'painter',
    defaultSize: { width: 500, height: 420 },
    defaultPosition: { x: 180, y: 120 },
  },
  'painting-viewer': {
    id: 'painting-viewer',
    label: 'painting',
    windowTitle: 'painting',
    defaultSize: { width: 420, height: 380 },
    defaultPosition: { x: 300, y: 130 },
  },
  tamagotchi: {
    id: 'tamagotchi',
    label: 'zoltar',
    windowTitle: 'zoltar',
    defaultSize: { width: 380, height: 520 },
    defaultPosition: { x: 300, y: 80 },
  },
  doitforher: {
    id: 'doitforher',
    label: 'Do T for her',
    windowTitle: 'Do T for her',
    defaultSize: { width: 480, height: 420 },
    defaultPosition: { x: 280, y: 100 },
  },
}

export const DESKTOP_ICONS: AppId[] = ['projects', 'about', 'terminal', 'links', 'trash', 'music', 'writing', 'painter']
