import type { Scar } from '../../types'

interface ScarsSectionProps {
  scars: Scar[]
  maxScars: number
  onChange: (scars: Scar[]) => void
}

const SCAR_LABELS = ['Шрам 1', 'Шрам 2', 'Шрам 3']

export default function ScarsSection({ scars, maxScars, onChange }: ScarsSectionProps) {
  const updateScar = (index: number, value: string) => {
    const updated = scars.map((s, i) => i === index ? { ...s, value } : s)
    onChange(updated)
  }

  const filledCount = scars.filter(s => s.value.trim()).length

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Шрамы</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">{filledCount} / {maxScars}</span>
          {filledCount >= maxScars && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
              ⚠️ Четвёртый — конец
            </span>
          )}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
        Шрам заменяет аспект персонажа навсегда. При 4-м шраме персонаж становится Тьмой.
        Шрамы игнорируют правило одного бонуса — каждый даёт +2 независимо.
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: maxScars }).map((_, i) => {
          const scar = scars[i]
          return (
            <div key={i} className={`rounded-xl border p-3 flex flex-col gap-2 transition-colors
              ${scar?.value ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full
                  ${scar?.value ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-500'}`}>
                  {SCAR_LABELS[i]}
                </span>
              </div>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none
                  focus:ring-2 focus:ring-red-400 focus:border-red-400 bg-white"
                placeholder='«Я [описание], поэтому [бонус], но [обратная сторона]»'
                value={scar?.value ?? ''}
                onChange={e => updateScar(i, e.target.value)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}