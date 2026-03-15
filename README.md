# English Diary with AI Proofreader

Write a diary entry in English, choose your CEFR level, and get instant AI-powered grammar and vocabulary feedback — powered by Claude.

▶️ Demo: https://bloom-english-diary.vercel.app/


---

## Features

- ✏️ Write diary entries in a clean split-view editor
- 🎯 Choose your level: **B1 / B2 / C1 / C2** (CEFR)
- 🤖 AI proofreads your entry at the chosen level
- ✅ Corrected full text
- 📌 Grammar corrections with explanations
- 💡 Vocabulary improvement suggestions
- 📋 History page to review past entries and feedback

---

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | React 18, Tailwind CSS v4, Vite   |
| Routing  | React Router v6                   |
| AI       | Claude API (`claude-sonnet-4-6`)  |
| Storage  | `localStorage` (Phase 1)          |

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd bloom-diary
npm install --legacy-peer-deps
```

### 2. Set up your API key

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com).

> ⚠️ **Phase 1 Note:** The API key is used directly in the browser. This is fine for local development and personal use. In Phase 2, this moves to a backend so the key stays secret.

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Top navigation bar
│   ├── DiaryEditor.jsx      # Left panel: textarea + level selector + submit
│   ├── LevelSelector.jsx    # B1/B2/C1/C2 toggle buttons
│   ├── ProofreadResult.jsx  # Right panel: corrected text + feedback sections
│   ├── GrammarList.jsx      # Grammar correction items
│   ├── VocabList.jsx        # Vocabulary suggestion items
│   └── EntryCard.jsx        # Entry preview card in History
├── pages/
│   ├── HomePage.jsx         # Main split-view write + review page
│   └── HistoryPage.jsx      # Past entries list + detail view
├── hooks/
│   └── useEntries.js        # All diary CRUD — swap this for backend in Phase 2
├── services/
│   └── claude.js            # All AI calls — swap this for backend in Phase 2
├── App.jsx
└── main.jsx
```

---

## CEFR Levels

| Level | Description         | AI behavior                              |
|-------|---------------------|------------------------------------------|
| B1    | Intermediate        | Correct common, clear errors only        |
| B2    | Upper-Intermediate  | Natural phrasing and common errors       |
| C1    | Advanced            | Nuanced expression and style             |
| C2    | Mastery             | Near-native refinements                  |

---

## Roadmap

### Phase 1 (current) — Frontend only

- [x] Split-view editor and result panel
- [x] Level selector (B1~C2)
- [x] Claude AI proofreading
- [x] Grammar and vocabulary feedback
- [x] Entry history with localStorage
- [ ] Diff highlighting (show exactly what changed)
- [ ] Export entry as PDF or text

### Phase 2 — Full-stack (Vercel + PostgreSQL)

| Area     | Change                                                  |
|----------|---------------------------------------------------------|
| Storage  | Replace `localStorage` → Vercel PostgreSQL              |
| API key  | Move from browser `.env` → backend env var (safe)       |
| Backend  | Add Express/Node.js server on Vercel Functions          |
| Auth     | Add user accounts (register / login / JWT)              |
| Deploy   | Vercel monorepo deployment                              |

**To migrate Phase 1 → Phase 2, only two files change:**

- `src/hooks/useEntries.js` — replace `localStorage` with `fetch('/api/entries', ...)`
- `src/services/claude.js` — replace direct Claude fetch with `fetch('/api/review', ...)`

All component and page code stays the same.

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
```
