import LevelSelector from './LevelSelector'

export default function DiaryEditor({
  title, setTitle,
  body, setBody,
  level, setLevel,
  loading,
  onSubmit,
}) {
  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!body.trim()) return
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full min-h-0">
      {/* Title */}
      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border-2 border-bloom-ink bg-bloom-bg rounded-lg text-bloom-ink placeholder-bloom-muted focus:outline-none focus:ring-2 focus:ring-bloom-ink focus:ring-offset-1 text-sm font-sans shrink-0"
      />

      {/* Body */}
      <div className="flex-1 flex flex-col min-h-0">
        <textarea
          placeholder="Write your diary entry here in English..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 w-full px-3 py-3 border-2 border-bloom-ink bg-bloom-bg rounded-lg text-bloom-ink placeholder-bloom-muted focus:outline-none focus:ring-2 focus:ring-bloom-ink focus:ring-offset-1 resize-none leading-relaxed font-sans min-h-0"
        />
        <p className="text-xs text-bloom-muted mt-1 text-right font-sans shrink-0">{wordCount} words</p>
      </div>

      {/* Level selector */}
      <LevelSelector value={level} onChange={setLevel} />

      {/* Submit */}
      <button
        type="submit"
        disabled={!body.trim() || loading}
        className="w-full py-3 bg-bloom-ink hover:opacity-80 disabled:opacity-30 text-bloom-bg font-display uppercase tracking-widest rounded-full transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-bloom-bg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Reviewing...
          </>
        ) : (
          'Submit for Review'
        )}
      </button>
    </form>
  )
}
