import { useState, useEffect } from 'react'
import { themes, getTheme, type Theme } from '../styles/themes'

export function useTheme() {
  const [themeId, setThemeId] = useState<string>(() =>
    localStorage.getItem('theme') ?? 'light'
  )

  useEffect(() => {
    const theme = getTheme(themeId)
    const root = document.documentElement

    // Применяем все CSS переменные из темы
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    localStorage.setItem('theme', themeId)
  }, [themeId])

  return {
    themeId,
    theme: getTheme(themeId),
    themes,
    setTheme: setThemeId,
  }
}