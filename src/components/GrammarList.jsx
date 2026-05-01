export default function GrammarList({ items }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-[#1A6B3A] font-sans flex items-center gap-1.5">
        ✓ No grammar issues found at this level. Great job!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="bg-bloom-surface border-2 border-[#CC2233] rounded-xl p-3">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
            <span className="line-through text-[#CC2233] font-medium font-sans">{item.original}</span>
            <span className="text-bloom-muted">→</span>
            <span className="text-[#1A6B3A] font-medium font-sans">{item.corrected}</span>
          </div>
          <p className="text-xs text-bloom-muted font-sans">{item.explanation}</p>
        </li>
      ))}
    </ul>
  )
}
