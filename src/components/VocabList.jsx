export default function VocabList({ items }) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-[#1A6B3A] font-sans flex items-center gap-1.5">
        ✓ Vocabulary looks good for this level!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="bg-bloom-surface border-2 border-[#B85C00] rounded-xl p-3">
          <div className="flex flex-wrap items-center gap-2 text-sm mb-1">
            <span className="text-[#B85C00] font-medium font-sans">"{item.original}"</span>
            <span className="text-bloom-muted">→</span>
            <span className="text-bloom-ink font-medium font-sans">"{item.suggestion}"</span>
          </div>
          <p className="text-xs text-bloom-muted font-sans">{item.note}</p>
        </li>
      ))}
    </ul>
  )
}
