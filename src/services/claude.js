/**
 * AI service layer — all Groq API calls go here.
 *
 * Phase 1: calls Groq API directly from the browser using VITE_GROQ_API_KEY.
 * Phase 2: replace the fetch below with a call to your own backend endpoint
 *          (e.g. POST /api/review) so the API key stays server-side.
 *
 * To switch to Phase 2, only this file needs to change.
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = 'llama-3.3-70b-versatile'

function buildPrompt(text, level) {
  return `You are an English writing coach. Proofread the diary entry below for a ${level} level English learner.

Return ONLY a valid JSON object with this exact structure (no markdown, no explanation):
{
  "corrected_text": "<full corrected diary text>",
  "grammar": [
    { "original": "", "corrected": "", "explanation": "" }
  ],
  "vocabulary": [
    { "original": "", "suggestion": "", "note": "" }
  ]
}

Rules:
- Correct only errors appropriate for ${level} level
- Keep the writer's voice and personal meaning
- At B1/B2: focus on clear, common errors only — do not over-correct
- At C1/C2: also improve style, naturalness, and word choice
- grammar array: list each grammar issue found (empty array if none)
- vocabulary array: list word/phrase improvements (empty array if none)
- corrected_text: the full rewritten diary with all corrections applied

Diary entry (level: ${level}):
"""
${text}
"""`
}

/**
 * Phase 1: direct browser → Groq API call.
 *
 * Phase 2 replacement:
 *   const res = await fetch('/api/review', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ text, level }),
 *   })
 *   return res.json()
 */
export async function getAIFeedback(text, level) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY

  if (!apiKey) {
    throw new Error('VITE_GROQ_API_KEY is not set. Add it to your .env file.')
  }

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: buildPrompt(text, level) }],
      max_tokens: 2048,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const err = await response.json().catch(() => ({}))
    throw new Error(err?.error?.message || `API error: ${response.status}`)
  }

  const data = await response.json()
  const raw = data.choices?.[0]?.message?.content

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('AI returned an invalid response. Please try again.')
  }
}
