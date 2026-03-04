// src/components/npc/iconOptions.tsx
import {
  IconFire, IconSwords, IconLightning, IconCharacter, IconNpc,
  IconMasks, IconBook, IconTip, IconSkull, IconSpeech,
  IconDagger, IconCheck, IconAdvancement, IconNotFound, IconMoon,
  IconShare, IconSave, IconEdit, IconSearch, IconPlus,
} from '../ui/FateIcons'

export interface IconOption {
  id: string
  label: string
  component: React.ReactNode
}

export const ICON_OPTIONS: IconOption[] = [
  { id: 'swords',      label: 'Боец',      component: <IconSwords size={24} /> },
  { id: 'dagger',      label: 'Убийца',    component: <IconDagger size={24} /> },
  { id: 'skull',       label: 'Босс',      component: <IconSkull size={24} /> },
  { id: 'speech',      label: 'Говорун',   component: <IconSpeech size={24} /> },
  { id: 'masks',       label: 'Плут',      component: <IconMasks size={24} /> },
  { id: 'fire',        label: 'Фанатик',   component: <IconFire size={24} /> },
  { id: 'book',        label: 'Учёный',    component: <IconBook size={24} /> },
  { id: 'tip',         label: 'Советник',  component: <IconTip size={24} /> },
  { id: 'character',   label: 'Герой',     component: <IconCharacter size={24} /> },
  { id: 'npc',         label: 'Обычный',   component: <IconNpc size={24} /> },
  { id: 'lightning',   label: 'Быстрый',   component: <IconLightning size={24} /> },
  { id: 'check',       label: 'Союзник',   component: <IconCheck size={24} /> },
  { id: 'advancement', label: 'Лидер',     component: <IconAdvancement size={24} /> },
  { id: 'share',       label: 'Шпион',     component: <IconShare size={24} /> },
  { id: 'moon',        label: 'Тайный',    component: <IconMoon size={24} /> },
  { id: 'search',      label: 'Следопыт',  component: <IconSearch size={24} /> },
  { id: 'save',        label: 'Хранитель', component: <IconSave size={24} /> },
  { id: 'edit',        label: 'Писарь',    component: <IconEdit size={24} /> },
  { id: 'plus',        label: 'Торговец',  component: <IconPlus size={24} /> },
  { id: 'notfound',    label: 'Загадка',   component: <IconNotFound size={24} /> },
]

export function getIconComponent(iconId: string, size = 32): React.ReactNode {
  const map: Record<string, React.ReactNode> = {
    swords:      <IconSwords size={size} />,
    dagger:      <IconDagger size={size} />,
    skull:       <IconSkull size={size} />,
    speech:      <IconSpeech size={size} />,
    masks:       <IconMasks size={size} />,
    fire:        <IconFire size={size} />,
    book:        <IconBook size={size} />,
    tip:         <IconTip size={size} />,
    character:   <IconCharacter size={size} />,
    npc:         <IconNpc size={size} />,
    lightning:   <IconLightning size={size} />,
    check:       <IconCheck size={size} />,
    advancement: <IconAdvancement size={size} />,
    share:       <IconShare size={size} />,
    moon:        <IconMoon size={size} />,
    search:      <IconSearch size={size} />,
    save:        <IconSave size={size} />,
    edit:        <IconEdit size={size} />,
    plus:        <IconPlus size={size} />,
    notfound:    <IconNotFound size={size} />,
  }
  return map[iconId] ?? <IconNpc size={size} />
}
