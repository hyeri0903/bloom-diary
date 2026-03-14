const LEVELS = [
  { id: 'B1', label: 'B1', desc: 'Intermediate' },
  { id: 'B2', label: 'B2', desc: 'Upper-Intermediate' },
  { id: 'C1', label: 'C1', desc: 'Advanced' },
  { id: 'C2', label: 'C2', desc: 'Mastery' },
]

export default function LevelSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">Your target level</p>
      <div className="flex gap-2 flex-wrap">
        {LEVELS.map((lv) => (
          <button
            key={lv.id}
            type="button"
            onClick={() => onChange(lv.id)}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold transition-all ${
              value === lv.id
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                : 'bg-white border-gray-300 text-gray-700 hover:border-indigo-400 hover:text-indigo-600'
            }`}
          >
            <span className="block">{lv.label}</span>
            <span className={`block text-xs font-normal ${value === lv.id ? 'text-indigo-200' : 'text-gray-400'}`}>
              {lv.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
