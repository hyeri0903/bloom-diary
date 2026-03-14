import { useState } from 'react'
import { useEntries } from '../hooks/useEntries'
import EntryCard from '../components/EntryCard'
import ProofreadResult from '../components/ProofreadResult'

export default function HistoryPage() {
  const { entries, deleteEntry } = useEntries()
  const [selected, setSelected] = useState(null)

  const handleDelete = (id) => {
    deleteEntry(id)
    if (selected?.id === id) setSelected(null)
  }

  if (entries.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-400">
        <span className="text-5xl block mb-4">📭</span>
        <p className="text-lg font-medium text-gray-500">No entries yet</p>
        <p className="text-sm mt-1">Go to <strong>Write</strong> to create your first diary entry.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-8rem)]">
        {/* Left — Entry list */}
        <section>
          <h2 className="text-base font-semibold text-gray-800 mb-4">
            {entries.length} {entries.length === 1 ? 'Entry' : 'Entries'}
          </h2>
          <div className="flex flex-col gap-3">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => setSelected(entry)}
                className={`text-left w-full rounded-xl transition-all ${
                  selected?.id === entry.id ? 'ring-2 ring-indigo-500' : ''
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
        <section className="bg-white border border-gray-200 rounded-2xl p-5 overflow-y-auto">
          {selected ? (
            <div className="flex flex-col gap-4">
              {/* Original text */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Original Entry</h3>
                <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selected.body}
                </div>
              </div>
              {/* Feedback */}
              <ProofreadResult result={selected.result} level={selected.level} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-16 gap-3">
              <span className="text-4xl">👆</span>
              <p className="text-sm">Select an entry on the left to see its feedback</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
