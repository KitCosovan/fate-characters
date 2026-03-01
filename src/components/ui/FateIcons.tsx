// src/components/ui/FateIcons.tsx
// Все иконки в стиле Fate Core — шестигранник, золото, геометрия

interface IconProps {
  size?: number
  color?: string
  className?: string
}

const defaultColor = 'var(--accent)'

// Обёртка — шестигранник как у favicon
function HexFrame({ size, color, children }: { size: number; color: string; children: React.ReactNode }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <polygon points="32,2 56,16 56,48 32,62 8,48 8,16" fill="var(--bg, #1a1410)" stroke={color} strokeWidth="2"/>
      <polygon points="32,8 50,19 50,45 32,56 14,45 14,19" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
      {children}
    </svg>
  )
}

// 🔥 Огонь — Книга Пепла / логотип
export function IconFire({ size = 24, color = defaultColor }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width={size} height={size}>
      <polygon points="32,2 56,16 56,48 32,62 8,48 8,16" fill="var(--bg, #1a1410)" stroke={color} strokeWidth="2"/>
      <polygon points="32,8 50,19 50,45 32,56 14,45 14,19" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3"/>
      {/* Flame shape */}
      <path d="M32 48 C22 48 18 40 20 33 C21 28 26 26 26 26 C24 32 28 34 30 30 C31 27 30 22 33 18 C35 22 33 27 36 29 C38 31 40 28 39 24 C43 28 46 34 44 40 C42 46 38 48 32 48Z" fill={color} opacity="0.9"/>
      <path d="M32 44 C27 44 25 40 26 36 C27 33 30 32 30 32 C29 35 31 37 33 34 C34 32 33 29 35 27 C36 30 35 33 37 34 C39 35 39 32 38 30 C41 33 42 38 40 41 C38 44 35 44 32 44Z" fill="var(--bg, #1a1410)" opacity="0.4"/>
    </svg>
  )
}

// ⚔️ Мечи — Fate Core
export function IconSwords({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      {/* Cross swords */}
      <line x1="20" y1="20" x2="44" y2="44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="44" y1="20" x2="20" y2="44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      {/* Handles */}
      <line x1="17" y1="26" x2="23" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="41" y1="20" x2="47" y2="26" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Center gem */}
      <circle cx="32" cy="32" r="3" fill={color}/>
    </HexFrame>
  )
}

// ⚡ Молния — Fate Accelerated
export function IconLightning({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <polygon points="36,14 26,33 32,33 28,50 42,28 35,28" fill={color}/>
      <circle cx="36" cy="14" r="2" fill={color} opacity="0.6"/>
      <circle cx="28" cy="50" r="2" fill={color} opacity="0.6"/>
    </HexFrame>
  )
}

// 🧙 Персонаж / маг
export function IconCharacter({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      {/* Hood/cloak silhouette */}
      <circle cx="32" cy="22" r="7" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M18 50 C18 38 24 34 32 34 C40 34 46 38 46 50" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Staff */}
      <line x1="44" y1="22" x2="44" y2="48" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <polygon points="44,16 41,22 47,22" fill={color}/>
    </HexFrame>
  )
}

// 👤 НПС / силуэт
export function IconNpc({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <circle cx="32" cy="23" r="8" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M16 52 C16 40 23 36 32 36 C41 36 48 40 48 52" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      {/* Question mark - unknown */}
      <circle cx="32" cy="23" r="3" fill={color} opacity="0.3"/>
    </HexFrame>
  )
}

// 🎭 Маски — пустой стейт
export function IconMasks({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      {/* Happy mask */}
      <path d="M20 28 C20 22 26 18 32 20 C35 21 37 24 37 28 C37 34 32 37 27 35 C23 33 20 31 20 28Z" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M24 30 C25 32 29 33 32 32" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Sad mask */}
      <path d="M28 36 C28 36 30 38 34 38 C38 38 42 36 44 32 C46 28 44 24 40 23 C37 22 34 24 33 27" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M35 42 C36 40 40 39 43 40" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </HexFrame>
  )
}

// 💾 Сохранить
export function IconSave({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <rect x="19" y="16" width="26" height="28" rx="2" fill="none" stroke={color} strokeWidth="2"/>
      <rect x="24" y="16" width="16" height="10" rx="1" fill="none" stroke={color} strokeWidth="1.5"/>
      <rect x="22" y="31" width="20" height="10" rx="1" fill="none" stroke={color} strokeWidth="1.5"/>
      <line x1="26" y1="34" x2="38" y2="34" stroke={color} strokeWidth="1" opacity="0.5"/>
      <line x1="26" y1="37" x2="34" y2="37" stroke={color} strokeWidth="1" opacity="0.5"/>
      <rect x="29" y="17" width="4" height="7" fill={color} opacity="0.5"/>
    </HexFrame>
  )
}

// 📥 Импорт
export function IconImport({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <polyline points="32,18 32,42" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <polyline points="24,35 32,43 40,35" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="20" y1="46" x2="44" y2="46" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </HexFrame>
  )
}

// 🔗 Поделиться
export function IconShare({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <circle cx="42" cy="22" r="5" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="22" cy="32" r="5" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="42" cy="42" r="5" fill="none" stroke={color} strokeWidth="2"/>
      <line x1="27" y1="29" x2="37" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="27" y1="35" x2="37" y2="39" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </HexFrame>
  )
}

// 🗑 Удалить
export function IconDelete({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <line x1="20" y1="22" x2="44" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 22 L26 44 C26 45 27 46 28 46 L36 46 C37 46 38 45 38 44 L38 22" fill="none" stroke={color} strokeWidth="2"/>
      <line x1="29" y1="28" x2="29" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="35" y1="28" x2="35" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M28 22 L28 19 C28 18 29 17 30 17 L34 17 C35 17 36 18 36 19 L36 22" fill="none" stroke={color} strokeWidth="2"/>
    </HexFrame>
  )
}

// ✏️ Редактировать
export function IconEdit({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <path d="M38 18 L46 26 L28 44 L18 46 L20 36 Z" fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
      <line x1="34" y1="22" x2="42" y2="30" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    </HexFrame>
  )
}

// 📖 Энциклопедия
export function IconBook({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <path d="M20 16 L20 48 C20 48 24 46 32 46 C40 46 44 48 44 48 L44 16 C44 16 40 14 32 14 C24 14 20 16 20 16Z" fill="none" stroke={color} strokeWidth="2"/>
      <line x1="32" y1="14" x2="32" y2="46" stroke={color} strokeWidth="1.5"/>
      <line x1="24" y1="22" x2="30" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="24" y1="27" x2="30" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="24" y1="32" x2="30" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="34" y1="22" x2="40" y2="22" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="34" y1="27" x2="40" y2="27" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      <line x1="34" y1="32" x2="40" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
    </HexFrame>
  )
}

// 🔍 Поиск
export function IconSearch({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <circle cx="28" cy="28" r="11" fill="none" stroke={color} strokeWidth="2.5"/>
      <line x1="36" y1="36" x2="46" y2="46" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </HexFrame>
  )
}

// ⬆️ Развитие навыков
export function IconAdvancement({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <polyline points="32,16 32,46" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <polyline points="22,26 32,16 42,26" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="22" y1="36" x2="42" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="22" y1="42" x2="42" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.3"/>
    </HexFrame>
  )
}

// ☀️ Светлая тема
export function IconSun({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <circle cx="32" cy="32" r="8" fill="none" stroke={color} strokeWidth="2"/>
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        const x1 = 32 + 11 * Math.cos(rad)
        const y1 = 32 + 11 * Math.sin(rad)
        const x2 = 32 + 15 * Math.cos(rad)
        const y2 = 32 + 15 * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2" strokeLinecap="round"/>
      })}
    </HexFrame>
  )
}

// 🌙 Тёмная тема
export function IconMoon({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <path d="M38 20 C30 20 24 26 24 34 C24 42 30 48 38 48 C34 48 28 44 28 36 C28 28 34 22 42 22 C41 21 40 20 38 20Z" fill={color}/>
      <circle cx="40" cy="26" r="2" fill={color} opacity="0.4"/>
      <circle cx="36" cy="20" r="1.5" fill={color} opacity="0.3"/>
    </HexFrame>
  )
}

// ✓ Галочка / Выбрано
export function IconCheck({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <polyline points="20,32 28,40 44,22" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </HexFrame>
  )
}

// ← Назад
export function IconBack({ size = 24, color = defaultColor }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width={size} height={size}>
      <polyline points="20,8 12,16 20,24" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}

// + Создать
export function IconPlus({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <line x1="32" y1="20" x2="32" y2="44" stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="20" y1="32" x2="44" y2="32" stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </HexFrame>
  )
}

// 🌀 Не найдено
export function IconNotFound({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <circle cx="32" cy="32" r="12" fill="none" stroke={color} strokeWidth="2"/>
      <path d="M32 20 C38 26 38 38 32 44 C26 38 26 26 32 20Z" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <line x1="20" y1="32" x2="44" y2="32" stroke={color} strokeWidth="1.5" opacity="0.5"/>
      <circle cx="32" cy="32" r="2.5" fill={color}/>
    </HexFrame>
  )
}

// 💡 Подсказка
export function IconTip({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <circle cx="32" cy="26" r="9" fill="none" stroke={color} strokeWidth="2"/>
      <line x1="32" y1="35" x2="32" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="28" y1="42" x2="36" y2="42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <line x1="29" y1="23" x2="29" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
      <line x1="32" y1="21" x2="32" y2="23" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
    </HexFrame>
  )
}

// 💀 Босс / череп
export function IconSkull({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <circle cx="32" cy="28" r="12" fill="none" stroke={color} strokeWidth="2"/>
      <circle cx="27" cy="26" r="3" fill={color}/>
      <circle cx="37" cy="26" r="3" fill={color}/>
      <path d="M26 34 L26 40 L38 40 L38 34" fill="none" stroke={color} strokeWidth="2"/>
      <line x1="32" y1="34" x2="32" y2="40" stroke={color} strokeWidth="1.5" opacity="0.6"/>
      <line x1="26" y1="37" x2="38" y2="37" stroke={color} strokeWidth="1.5" opacity="0.6"/>
    </HexFrame>
  )
}

// 💬 Переговорщик / речь
export function IconSpeech({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <path d="M18 20 L46 20 C47 20 48 21 48 22 L48 38 C48 39 47 40 46 40 L30 40 L24 47 L24 40 L18 40 C17 40 16 39 16 38 L16 22 C16 21 17 20 18 20Z" fill="none" stroke={color} strokeWidth="2"/>
      <line x1="23" y1="28" x2="41" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="23" y1="33" x2="36" y2="33" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
    </HexFrame>
  )
}

// 🐀 Мелкий враг / кинжал
export function IconDagger({ size = 24, color = defaultColor }: IconProps) {
  return (
    <HexFrame size={size} color={color}>
      <line x1="32" y1="14" x2="32" y2="46" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <polygon points="32,14 28,22 36,22" fill={color}/>
      <line x1="26" y1="34" x2="38" y2="34" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <rect x="30" y="42" width="4" height="4" rx="1" fill={color} opacity="0.6"/>
    </HexFrame>
  )
}
