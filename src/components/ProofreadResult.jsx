import GrammarList from './GrammarList'
import VocabList from './VocabList'

export default function ProofreadResult({ result, level }) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-16 gap-3">
        <span className="text-5xl">✍️</span>
        <p className="text-base font-medium text-gray-500">Your proofread result will appear here</p>
        <p className="text-sm">Write your diary and click <strong>Submit for Review</strong></p>
      </div>
    )
  }

  const grammarCount = result.grammar?.length ?? 0
  const vocabCount = result.vocabulary?.length ?? 0

  return (
    <div className="flex flex-col gap-6">
      {/* Level badge */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Proofread Result</h2>
        <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
          {level} Level
        </span>
      </div>

      {/* Summary badges */}
      <div className="flex gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${grammarCount === 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {grammarCount} grammar {grammarCount === 1 ? 'issue' : 'issues'}
        </span>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${vocabCount === 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {vocabCount} vocabulary {vocabCount === 1 ? 'suggestion' : 'suggestions'}
        </span>
      </div>

      {/* Corrected text */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs">✓</span>
          Corrected Text
        </h3>
        <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {result.corrected_text}
        </div>
      </section>

      {/* Grammar */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs">G</span>
          Grammar Corrections
        </h3>
        <GrammarList items={result.grammar} />
      </section>

      {/* Vocabulary */}
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <span className="w-5 h-5 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-xs">V</span>
          Vocabulary Suggestions
        </h3>
        <VocabList items={result.vocabulary} />
      </section>
    </div>
  )
}
