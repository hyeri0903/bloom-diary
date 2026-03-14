import { useState } from 'react'
import GrammarList from './GrammarList'
import VocabList from './VocabList'

const TABS = [
  { id: 'corrected', label: 'Corrected Text' },
  { id: 'grammar',   label: 'Grammar' },
  { id: 'vocabulary', label: 'Vocabulary' },
]

export default function ProofreadResult({ result, level }) {
  const [activeTab, setActiveTab] = useState('corrected')

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
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">Proofread Result</h2>
        <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
          {level} Level
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-gray-200 mb-4">
        {TABS.map((tab) => {
          const badge =
            tab.id === 'grammar' ? grammarCount :
            tab.id === 'vocabulary' ? vocabCount : null

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {badge !== null && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                  badge === 0 ? 'bg-green-100 text-green-700' :
                  tab.id === 'grammar' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'corrected' && (
          <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {result.corrected_text}
          </div>
        )}
        {activeTab === 'grammar' && (
          <GrammarList items={result.grammar} />
        )}
        {activeTab === 'vocabulary' && (
          <VocabList items={result.vocabulary} />
        )}
      </div>
    </div>
  )
}
