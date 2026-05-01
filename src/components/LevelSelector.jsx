const LEVELS = [
  { id: 'B1', label: 'B1', desc: 'Intermediate' },
  { id: 'B2', label: 'B2', desc: 'Upper-Intermediate' },
  { id: 'C1', label: 'C1', desc: 'Advanced' },
  { id: 'C2', label: 'C2', desc: 'Mastery' },
]

export default function LevelSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-xs font-display uppercase tracking-wider text-bloom-muted mb-2">Target Level</p>
      <div className="flex gap-2 flex-wrap">
        {LEVELS.map((lv) => (
          <button
            key={lv.id}
            type="button"
            onClick={() => onChange(lv.id)}
            className={`px-4 py-2 rounded-full border-2 text-sm transition-all cursor-pointer ${
              value === lv.id
                ? 'bg-bloom-ink border-bloom-ink text-bloom-bg'
                : 'bg-transparent border-bloom-ink text-bloom-ink hover:bg-bloom-hover'
            }`}
          >
            <span className="block font-display tracking-wide">{lv.label}</span>
            <span className={`block text-xs font-sans font-normal ${value === lv.id ? 'opacity-70' : 'text-bloom-muted'}`}>
              {lv.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
