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
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{entry.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{date}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
            {entry.level}
          </span>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
            title="Delete entry"
          >
            ×
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{entry.body}</p>

      {hasResult ? (
        <div className="flex gap-2">
          <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs rounded-full">
            {grammarCount} grammar
          </span>
          <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-xs rounded-full">
            {vocabCount} vocab
          </span>
        </div>
      ) : (
        <span className="text-xs text-gray-400 italic">No feedback yet</span>
      )}
    </div>
  )
}
