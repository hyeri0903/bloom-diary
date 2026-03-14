/**
 * Entry storage hook — all diary CRUD operations go here.
 *
 * Phase 1: uses localStorage.
 * Phase 2: replace each function body with fetch('/api/entries', ...) calls.
 *
 * To switch to Phase 2, only this file needs to change.
 */

import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'english_diary_entries'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useEntries() {
  const [entries, setEntries] = useState(loadFromStorage)

  // Persist to localStorage on every change
  useEffect(() => {
    saveToStorage(entries)
  }, [entries])

  const createEntry = useCallback((title, body, level) => {
    const entry = {
      id: uuidv4(),
      title: title.trim() || 'Untitled',
      body,
      level,
      createdAt: new Date().toISOString(),
      result: null,
    }
    setEntries((prev) => [entry, ...prev])
    return entry
  }, [])

  const updateResult = useCallback((id, result) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, result } : e))
    )
  }, [])

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }, [])

  const getEntry = useCallback(
    (id) => entries.find((e) => e.id === id) ?? null,
    [entries]
  )

  return { entries, createEntry, updateResult, deleteEntry, getEntry }
}
