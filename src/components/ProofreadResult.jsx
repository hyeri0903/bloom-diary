import { useState } from 'react'
import GrammarList from './GrammarList'
import VocabList from './VocabList'

const TABS = [
  { id: 'corrected', label: 'Corrected Text' },
  { id: 'grammar',   label: 'Grammar' },
  { id: 'vocabulary', label: 'Vocabulary' },
]

/**
 * Finds all correction phrases in the text and returns an array of segments:
 * [{ text: string, highlighted: boolean }, ...]
 */
function buildHighlightedSegments(text, grammar, vocabulary) {
  // Collect all corrected phrases
  const phrases = [
    ...(grammar ?? []).map((g) => g.corrected),
    ...(vocabulary ?? []).map((v) => v.suggestion),
  ].filter(Boolean)

  if (phrases.length === 0) return [{ text, highlighted: false }]

  // Find all match ranges [start, end) for each phrase
  const ranges = []
  for (const phrase of phrases) {
    let idx = 0
    while (idx < text.length) {
      const pos = text.indexOf(phrase, idx)
      if (pos === -1) break
      ranges.push([pos, pos + phrase.length])
      idx = pos + phrase.length
    }
  }

  if (ranges.length === 0) return [{ text, highlighted: false }]

  // Sort and merge overlapping ranges
  ranges.sort((a, b) => a[0] - b[0])
  const merged = [ranges[0]]
  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1]
    if (ranges[i][0] < last[1]) {
      last[1] = Math.max(last[1], ranges[i][1])
    } else {
      merged.push(ranges[i])
    }
  }

  // Build segments
  const segments = []
  let cursor = 0
  for (const [start, end] of merged) {
    if (cursor < start) segments.push({ text: text.slice(cursor, start), highlighted: false })
    segments.push({ text: text.slice(start, end), highlighted: true })
    cursor = end
  }
  if (cursor < text.length) segments.push({ text: text.slice(cursor), highlighted: false })

  return segments
}

export default function ProofreadResult({ result, level, fillHeight = false }) {
  const [activeTab, setActiveTab] = useState('corrected')

  if (!result) {
    return (
      <div className={`flex flex-col items-center justify-center text-center py-16 gap-3 ${fillHeight ? 'h-full' : ''}`}>
        <p className="font-display text-bloom-ink text-lg uppercase tracking-wider">Proofread Result</p>
        <p className="text-sm text-bloom-muted font-sans">Write your diary and click <strong className="text-bloom-ink">Submit for Review</strong></p>
      </div>
    )
  }

  const grammarCount = result.grammar?.length ?? 0
  const vocabCount = result.vocabulary?.length ?? 0
  const segments = buildHighlightedSegments(
    result.corrected_text ?? '',
    result.grammar,
    result.vocabulary,
  )

  return (
    <div className={`flex flex-col ${fillHeight ? 'h-full' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-bloom-ink uppercase tracking-wide text-base">Proofread Result</h2>
        <span className="px-2.5 py-1 bg-bloom-ink text-bloom-bg text-xs font-display tracking-wider rounded-full">
          {level} Level
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex border-b-2 border-bloom-ink mb-4">
        {TABS.map((tab) => {
          const badge =
            tab.id === 'grammar' ? grammarCount :
            tab.id === 'vocabulary' ? vocabCount : null

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-sans font-medium border-b-2 -mb-0.5 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'border-bloom-ink text-bloom-ink'
                  : 'border-transparent text-bloom-muted hover:text-bloom-ink'
              }`}
            >
              {tab.label}
              {badge !== null && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold border ${
                  badge === 0 ? 'border-[#1A6B3A] text-[#1A6B3A]' :
                  tab.id === 'grammar' ? 'border-[#CC2233] text-[#CC2233]' : 'border-[#B85C00] text-[#B85C00]'
                }`}>
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Tab content — overflow-y-scroll keeps scrollbar gutter reserved, preventing width shift when switching tabs */}
      <div className={fillHeight ? 'flex-1 overflow-y-scroll min-h-0 w-full' : ''}>
        {activeTab === 'corrected' && (
          <div className="bg-bloom-bg border-2 border-bloom-ink rounded-xl px-4 py-3 text-sm text-bloom-ink leading-relaxed whitespace-pre-wrap font-sans">
            {segments.map((seg, i) =>
              seg.highlighted ? (
                <mark key={i} className="bg-bloom-hover text-[#CC2233] font-semibold rounded px-0.5">
                  {seg.text}
                </mark>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
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
