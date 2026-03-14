export default function VocabList({ items }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-green-600 flex items-center gap-1.5">
        <span>✓</span> Vocabulary looks good for this level!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="bg-amber-50 border border-amber-100 rounded-lg p-3">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
            <span className="text-amber-700 font-medium">"{item.original}"</span>
            <span className="text-gray-400">→</span>
            <span className="text-indigo-700 font-medium">"{item.suggestion}"</span>
          </div>
          <p className="text-xs text-gray-500">{item.note}</p>
        </li>
      ))}
    </ul>
  )
}
