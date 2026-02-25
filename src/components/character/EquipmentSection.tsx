import type { EquipmentSlot } from '../../types'
import { generateId } from '../../utils'

interface EquipmentSectionProps {
  equipment: EquipmentSlot[]
  totalSlots: number
  onChange: (equipment: EquipmentSlot[]) => void
}

const TYPE_LABELS = {
  weapon: '⚔️ Оружие',
  armor: '🛡️ Броня',
  resource: '🎒 Ресурс',
  relic: '✨ Реликвия',
  empty: '— пусто —',
}

const TYPE_COLORS = {
  weapon: 'bg-red-50 border-red-200',
  armor: 'bg-blue-50 border-blue-200',
  resource: 'bg-green-50 border-green-200',
  relic: 'bg-yellow-50 border-yellow-200',
  empty: 'bg-gray-50 border-gray-200',
}

export default function EquipmentSection({ equipment, totalSlots, onChange }: EquipmentSectionProps) {
  const usedSlots = equipment.filter(e => e.type !== 'empty').reduce((sum, e) => sum + e.slots, 0)

  const updateItem = (id: string, fields: Partial<EquipmentSlot>) => {
    onChange(equipment.map(e => e.id === id ? { ...e, ...fields } : e))
  }

  const clearItem = (id: string) => {
    onChange(equipment.map(e => e.id === id
      ? { ...e, name: '', slots: 1, freeInvokes: 0, type: 'empty' as const }
      : e
    ))
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Снаряжение</h2>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium
          ${usedSlots > totalSlots ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
          {usedSlots} / {totalSlots} слотов
        </span>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-800">
        Снаряжение игнорирует правило одного бонуса. Оружие занимает слотов = урону. Броня = бесплатные призывы для защиты.
      </div>

      <div className="flex flex-col gap-2">
        {equipment.map((item, index) => (
          <div key={item.id} className={`rounded-xl border p-3 flex flex-col gap-2 transition-colors
            ${TYPE_COLORS[item.type]}`}>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 w-5">{index + 1}.</span>
              <select
                value={item.type}
                onChange={e => updateItem(item.id, {
                  type: e.target.value as EquipmentSlot['type'],
                  name: '',
                  freeInvokes: 0,
                })}
                className="text-xs border border-gray-300 rounded-lg px-2 py-1 bg-white outline-none focus:ring-2 focus:ring-indigo-400"
              >
                {Object.entries(TYPE_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
              {item.type !== 'empty' && (
                <button
                  onClick={() => clearItem(item.id)}
                  className="ml-auto text-xs text-gray-400 hover:text-red-500"
                >✕</button>
              )}
            </div>

            {item.type !== 'empty' && (
              <>
                <input
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Название предмета (аспект)"
                  value={item.name}
                  onChange={e => updateItem(item.id, { name: e.target.value })}
                />
                <div className="flex gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">Слоты:</span>
                    <select
                      value={item.slots}
                      onChange={e => updateItem(item.id, { slots: Number(e.target.value) })}
                      className="text-xs border border-gray-300 rounded px-1.5 py-1 bg-white outline-none"
                    >
                      {[1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  {(item.type === 'armor' || item.type === 'resource' || item.type === 'relic') && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-500">Призывы:</span>
                      <select
                        value={item.freeInvokes}
                        onChange={e => updateItem(item.id, { freeInvokes: Number(e.target.value) })}
                        className="text-xs border border-gray-300 rounded px-1.5 py-1 bg-white outline-none"
                      >
                        {[0, 1, 2, 3].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}