export interface Theme {
  id: string
  name: string
  icon: string
  colors: {
    bg: string
    surface: string
    'surface-2': string
    'surface-3': string
    accent: string
    'accent-dim': string
    'accent-glow': string
    text: string
    'text-dim': string
    'text-muted': string
    danger: string
    'danger-dim': string
    success: string
    border: string
    'border-accent': string
    'input-bg': string
    'input-border': string
    'input-border-focus': string
    'input-text': string
    'input-placeholder': string
    'input-shadow-focus': string
  }
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: 'Светлая',
    icon: '☀️',
    colors: {
      bg: '#f7f5f2',
      surface: '#ffffff',
      'surface-2': '#f0ede8',
      'surface-3': '#e8e4de',
      accent: '#b8700a',
      'accent-dim': '#8f550a',
      'accent-glow': 'rgba(184,112,10,0.12)',
      text: '#1a1714',
      'text-dim': '#5a5248',
      'text-muted': '#9a9088',
      danger: '#c02030',
      'danger-dim': '#a01828',
      success: '#1a8040',
      border: 'rgba(0,0,0,0.08)',
      'border-accent': 'rgba(184,112,10,0.3)',
      'input-bg': '#ffffff',
      'input-border': 'rgba(0,0,0,0.14)',
      'input-border-focus': '#b8700a',
      'input-text': '#1a1714',
      'input-placeholder': '#b0a898',
      'input-shadow-focus': '0 0 0 3px rgba(184,112,10,0.12)',
    },
  },
  {
    id: 'dark',
    name: 'Тёмная',
    icon: '🌙',
    colors: {
      bg: '#111114',
      surface: '#1c1c22',
      'surface-2': '#252530',
      'surface-3': '#2e2e3a',
      accent: '#e8a020',
      'accent-dim': '#c47d10',
      'accent-glow': 'rgba(232,160,32,0.15)',
      text: '#f0ede8',
      'text-dim': '#b8b4c8',
      'text-muted': '#7a7690',
      danger: '#f04858',
      'danger-dim': '#c83040',
      success: '#40c878',
      border: 'rgba(255,255,255,0.09)',
      'border-accent': 'rgba(232,160,32,0.35)',
      'input-bg': '#1a1a20',
      'input-border': 'rgba(232,160,32,0.28)',
      'input-border-focus': 'rgba(232,160,32,0.85)',
      'input-text': '#f0ede8',
      'input-placeholder': 'rgba(232,160,32,0.32)',
      'input-shadow-focus': '0 0 0 3px rgba(232,160,32,0.12), inset 0 1px 0 rgba(232,160,32,0.05)',
    },
  },
  {
    id: 'fate-core',
    name: 'Fate Core',
    icon: '⚔️',
    colors: {
      bg: '#f0f4f8',
      surface: '#ffffff',
      'surface-2': '#e8eef5',
      'surface-3': '#d8e2ec',
      accent: '#2255bb',
      'accent-dim': '#1a3f99',
      'accent-glow': 'rgba(34,85,187,0.12)',
      text: '#0f1926',
      'text-dim': '#3a5070',
      'text-muted': '#8095b0',
      danger: '#c02030',
      'danger-dim': '#a01828',
      success: '#0a7840',
      border: 'rgba(34,85,187,0.1)',
      'border-accent': 'rgba(34,85,187,0.35)',
      'input-bg': '#ffffff',
      'input-border': 'rgba(34,85,187,0.2)',
      'input-border-focus': '#2255bb',
      'input-text': '#0f1926',
      'input-placeholder': '#a0b0c8',
      'input-shadow-focus': '0 0 0 3px rgba(34,85,187,0.12)',
    },
  },
  {
    id: 'fate-accelerated',
    name: 'Accelerated',
    icon: '⚡',
    colors: {
      bg: '#0a0e14',
      surface: '#111820',
      'surface-2': '#182030',
      'surface-3': '#1e2838',
      accent: '#00d4ff',
      'accent-dim': '#00a8cc',
      'accent-glow': 'rgba(0,212,255,0.15)',
      text: '#e0f0ff',
      'text-dim': '#80aad0',
      'text-muted': '#405070',
      danger: '#ff4060',
      'danger-dim': '#cc2040',
      success: '#00e890',
      border: 'rgba(0,212,255,0.1)',
      'border-accent': 'rgba(0,212,255,0.35)',
      'input-bg': '#0e1820',
      'input-border': 'rgba(0,212,255,0.25)',
      'input-border-focus': 'rgba(0,212,255,0.85)',
      'input-text': '#e0f0ff',
      'input-placeholder': 'rgba(0,212,255,0.28)',
      'input-shadow-focus': '0 0 0 3px rgba(0,212,255,0.12), inset 0 1px 0 rgba(0,212,255,0.05)',
    },
  },
  {
    id: 'book-of-ashes',
    name: 'Книга Пепла',
    icon: '🔥',
    colors: {
      bg: '#100a08',
      surface: '#1c1210',
      'surface-2': '#241816',
      'surface-3': '#2e201e',
      accent: '#e85020',
      'accent-dim': '#c03a10',
      'accent-glow': 'rgba(232,80,32,0.18)',
      text: '#f0e8e0',
      'text-dim': '#c0a090',
      'text-muted': '#705040',
      danger: '#ff3040',
      'danger-dim': '#cc2030',
      success: '#60c050',
      border: 'rgba(232,80,32,0.1)',
      'border-accent': 'rgba(232,80,32,0.4)',
      'input-bg': '#180e0c',
      'input-border': 'rgba(232,80,32,0.28)',
      'input-border-focus': 'rgba(232,80,32,0.85)',
      'input-text': '#f0e8e0',
      'input-placeholder': 'rgba(232,80,32,0.32)',
      'input-shadow-focus': '0 0 0 3px rgba(232,80,32,0.12), inset 0 1px 0 rgba(232,80,32,0.05)',
    },
  },
]

export const getTheme = (id: string): Theme =>
  themes.find(t => t.id === id) ?? themes[0]