import DiaryEditor from '../components/DiaryEditor'
import ProofreadResult from '../components/ProofreadResult'

export default function HomePage({
  title, setTitle,
  body, setBody,
  level, setLevel,
  loading,
  error, setError,
  currentEntry,
  onSubmit,
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 h-full">
      {/* Error banner */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-bloom-hover border-2 border-[#CC2233] text-[#CC2233] text-sm rounded-xl flex justify-between items-start gap-3">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="shrink-0 hover:opacity-60 transition-opacity">✕</button>
        </div>
      )}

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-8rem)]">
        {/* Left — Editor */}
        <section className="bg-bloom-surface border-2 border-bloom-ink rounded-2xl p-5 flex flex-col">
          <h2 className="font-display text-bloom-ink text-base uppercase tracking-wide mb-4">
            Your Diary
          </h2>
          <div className="flex-1 flex flex-col">
            <DiaryEditor
              title={title} setTitle={setTitle}
              body={body} setBody={setBody}
              level={level} setLevel={setLevel}
              loading={loading}
              onSubmit={onSubmit}
            />
          </div>
        </section>

        {/* Right — Result */}
        <section className="bg-bloom-surface border-2 border-bloom-ink rounded-2xl p-5 overflow-y-auto">
          <ProofreadResult
            result={currentEntry?.result ?? null}
            level={currentEntry?.level}
          />
        </section>
      </div>
      <p className="text-center text-xs text-bloom-muted mt-4">© 2026 hazy. All rights reserved.</p>
    </div>
  )
}
