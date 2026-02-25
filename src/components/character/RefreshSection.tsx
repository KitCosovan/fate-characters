interface RefreshSectionProps {
  refresh: number
  currentFatePoints: number
  onRefreshChange: (value: number) => void
  onFatePointsChange: (value: number) => void
}

export default function RefreshSection({
  refresh,
  currentFatePoints,
  onRefreshChange,
  onFatePointsChange,
}: RefreshSectionProps) {
  const Counter = ({
    label, value, onChange, min = 0
  }: { label: string; value: number; onChange: (v: number) => void; min?: number }) => (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-gray-600 transition-colors"
        >−</button>
        <span className="text-2xl font-bold text-indigo-700 w-8 text-center">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold text-gray-600 transition-colors"
        >+</button>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-bold text-gray-800">Fate Points</h2>
      <div className="flex gap-8 justify-center bg-indigo-50 rounded-xl py-4">
        <Counter label="Refresh" value={refresh} onChange={onRefreshChange} min={1} />
        <Counter label="Текущие очки" value={currentFatePoints} onChange={onFatePointsChange} />
      </div>
    </div>
  )
}