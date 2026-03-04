import type { NpcTemplate } from '../types'

const STORAGE_KEY = 'fate-custom-npc-templates'

export interface CustomNpcTemplate extends NpcTemplate {
  iconId: string
  isCustom: true
}

export function getCustomTemplates(): CustomNpcTemplate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveCustomTemplate(template: CustomNpcTemplate): void {
  const templates = getCustomTemplates()
  const existing = templates.findIndex(t => t.id === template.id)
  if (existing >= 0) {
    templates[existing] = template
  } else {
    templates.push(template)
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
}

export function deleteCustomTemplate(id: string): void {
  const templates = getCustomTemplates().filter(t => t.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
}
