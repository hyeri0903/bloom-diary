import { useState } from 'react'
import EntryCard from '../components/EntryCard'
import ProofreadResult from '../components/ProofreadResult'

export default function HistoryPage({ entries, deleteEntry }) {
  const [selected, setSelected] = useState(null)

  const handleDelete = (id) => {
    deleteEntry(id)
    if (selected?.id === id) setSelected(null)
  }

  if (entries.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-bloom-ink text-2xl uppercase tracking-wider mb-3">No Histories Yet</p>
        <p className="text-sm text-bloom-muted font-sans">Go to <strong className="text-bloom-ink">Write</strong> to create your first diary entry.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-8rem)]">
        {/* Left — Entry list */}
        <section>
          <h2 className="font-display text-bloom-ink text-base uppercase tracking-wide mb-4">
            {entries.length} {entries.length === 1 ? 'History' : 'Histories'}
          </h2>
          <div className="flex flex-col gap-3">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelected(entry)}
                className={`text-left w-full rounded-xl transition-all cursor-pointer ${
                  selected?.id === entry.id ? 'ring-2 ring-bloom-ink' : ''
                }`}
              >
                <EntryCard
                  entry={entry}
                  onDelete={handleDelete}
                />
              </button>
            ))}
          </div>
        </section>

        {/* Right — Detail view */}
        <section className="bg-bloom-surface border-2 border-bloom-ink rounded-2xl p-5 overflow-y-auto">
          {selected ? (
            <div className="flex flex-col gap-4">
              {/* Original text */}
              <div>
                <h3 className="text-xs font-display uppercase tracking-wider text-bloom-muted mb-2">Original Entry</h3>
                <div className="bg-bloom-bg border-2 border-bloom-ink rounded-xl px-4 py-3 text-sm text-bloom-ink leading-relaxed whitespace-pre-wrap font-sans">
                  {selected.body}
                </div>
              </div>
              {/* Feedback */}
              <ProofreadResult result={selected.result} level={selected.level} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16 gap-3">
              <p className="font-display text-bloom-ink text-base uppercase tracking-wider">Select an Entry</p>
              <p className="text-sm text-bloom-muted font-sans">Pick an entry on the left to see its feedback</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
