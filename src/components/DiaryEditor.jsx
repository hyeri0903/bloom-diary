import { useState } from 'react'
import LevelSelector from './LevelSelector'

export default function DiaryEditor({ onSubmit, loading }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [level, setLevel] = useState('B2')

  const wordCount = body.trim() ? body.trim().split(/\s+/).length : 0

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!body.trim()) return
    onSubmit({ title, body, level })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
      {/* Title */}
      <input
        type="text"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
      />

      {/* Body */}
      <div className="flex-1 flex flex-col">
        <textarea
          placeholder="Write your diary entry here in English..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="flex-1 w-full px-3 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none leading-relaxed min-h-64"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{wordCount} words</p>
      </div>

      {/* Level selector */}
      <LevelSelector value={level} onChange={setLevel} />

      {/* Submit */}
      <button
        type="submit"
        disabled={!body.trim() || loading}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
