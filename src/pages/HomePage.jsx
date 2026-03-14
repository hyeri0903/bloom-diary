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
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex justify-between items-start gap-3">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="shrink-0 text-red-400 hover:text-red-600">✕</button>
        </div>
      )}

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-8rem)]">
        {/* Left — Editor */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col">
          <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span>✏️</span> Your Diary
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
        <section className="bg-white border border-gray-200 rounded-2xl p-5 overflow-y-auto">
          <ProofreadResult
            result={currentEntry?.result ?? null}
            level={currentEntry?.level}
          />
        </section>
      </div>
    </div>
  )
}
