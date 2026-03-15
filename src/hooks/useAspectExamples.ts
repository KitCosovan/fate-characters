// src/hooks/useAspectExamples.ts
// Локализованные примеры аспектов — вместо статического aspectExamples.ts
import { useTranslation } from 'react-i18next'

export function useAspectExamples(): Record<string, string[]> {
  const { t } = useTranslation()
  return t('aspect_examples', { returnObjects: true }) as Record<string, string[]>
}
