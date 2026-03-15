// src/hooks/useLocalizedSkillName.ts
// Returns a localized skill name by skillId
import { useTranslation } from 'react-i18next'

// English skill name map (id → name)
const EN_SKILL_NAMES: Record<string, string> = {
  athletics: 'Athletics', burglary: 'Burglary', contacts: 'Contacts', crafts: 'Crafts',
  deceive: 'Deceive', drive: 'Drive', empathy: 'Empathy', fight: 'Fight',
  investigate: 'Investigate', lore: 'Lore', notice: 'Notice', physique: 'Physique',
  provoke: 'Provoke', rapport: 'Rapport', resources: 'Resources', shoot: 'Shoot',
  stealth: 'Stealth', will: 'Will', prayer: 'Prayer', travel: 'Travel', deals: 'Deals',
  // FAE approaches
  careful: 'Careful', clever: 'Clever', flashy: 'Flashy',
  forceful: 'Forceful', quick: 'Quick', sneaky: 'Sneaky',
}

export function useLocalizedSkillName() {
  const { i18n } = useTranslation()
  return (skillId: string, fallback: string): string => {
    if (i18n.language.startsWith('en')) {
      return EN_SKILL_NAMES[skillId] ?? fallback
    }
    return fallback
  }
}
