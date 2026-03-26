import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'
import { useEntries } from './hooks/useEntries'
import { getAIFeedback } from './services/claude'
import { Analytics } from "@vercel/analytics/next"

export default function App() {
  // Write tab state — lifted here so it survives route changes
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [level, setLevel] = useState('B2')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentEntry, setCurrentEntry] = useState(null)

  const { createEntry, updateResult, entries, deleteEntry } = useEntries()

  const handleSubmit = async () => {
    if (!body.trim()) return
    setLoading(true)
    setError(null)
    setCurrentEntry(null)

    try {
      const entry = createEntry(title, body, level)
      const result = await getAIFeedback(body, level)
      updateResult(entry.id, result)
      setCurrentEntry({ ...entry, result })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  title={title} setTitle={setTitle}
                  body={body} setBody={setBody}
                  level={level} setLevel={setLevel}
                  loading={loading}
                  error={error} setError={setError}
                  currentEntry={currentEntry}
                  onSubmit={handleSubmit}
                />
              }
            />
            <Route
              path="/history"
              element={<HistoryPage entries={entries} deleteEntry={deleteEntry} />}
            />
          </Routes>
        </main>
      </div>
      <Analytics />
    </BrowserRouter>
  )
}
