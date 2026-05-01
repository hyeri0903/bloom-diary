export default function EntryCard({ entry, onDelete }) {
  const date = new Date(entry.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const grammarCount = entry.result?.grammar?.length ?? 0
  const vocabCount = entry.result?.vocabulary?.length ?? 0
  const hasResult = !!entry.result

  return (
    <div className="bg-bloom-surface border-2 border-bloom-ink rounded-xl p-4 hover:bg-bloom-hover transition-colors">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-bloom-ink text-sm truncate">{entry.title}</h3>
          <p className="text-xs text-bloom-muted font-sans mt-0.5">{date}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 bg-bloom-ink text-bloom-bg text-xs font-display tracking-wide rounded-full">
            {entry.level}
          </span>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-bloom-muted hover:text-[#CC2233] transition-colors text-lg leading-none cursor-pointer"
            title="Delete entry"
          >
            ×
          </button>
        </div>
      </div>

      <p className="text-sm text-bloom-muted font-sans line-clamp-2 mb-3">{entry.body}</p>

      {hasResult ? (
        <div className="flex gap-2">
          <span className="px-2 py-0.5 border border-[#CC2233] text-[#CC2233] text-xs rounded-full font-sans">
            {grammarCount} grammar
          </span>
          <span className="px-2 py-0.5 border border-[#B85C00] text-[#B85C00] text-xs rounded-full font-sans">
            {vocabCount} vocab
          </span>
        </div>
      ) : (
        <span className="text-xs text-bloom-muted font-sans italic">No feedback yet</span>
      )}
    </div>
  )
}
