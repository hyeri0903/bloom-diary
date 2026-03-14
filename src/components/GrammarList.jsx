export default function GrammarList({ items }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-green-600 flex items-center gap-1.5">
        <span>✓</span> No grammar issues found at this level. Great job!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="bg-red-50 border border-red-100 rounded-lg p-3">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
            <span className="line-through text-red-500 font-medium">{item.original}</span>
            <span className="text-gray-400">→</span>
            <span className="text-green-700 font-medium">{item.corrected}</span>
          </div>
          <p className="text-xs text-gray-500">{item.explanation}</p>
        </li>
      ))}
    </ul>
  )
}
