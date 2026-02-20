export interface SocialLink {
  platform: 'twitter' | 'linkedin' | 'github' | 'youtube' | 'tiktok' | 'instagram' | 'threads' | 'substack'
  url: string
  label: string
}

export interface DesignProject {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  client: string
  service: string
  focus: string
  category: string
  year: string
  tags: string[]
  thumbnail: string
  images: string[]
  color: string
  bgColor: string
}
