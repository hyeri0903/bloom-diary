import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkClass = (path) =>
    `px-4 py-1.5 text-sm font-display uppercase tracking-wider transition-colors rounded-full border-2 ${
      pathname === path
        ? 'bg-bloom-ink text-bloom-bg border-bloom-ink'
        : 'text-bloom-ink border-transparent hover:border-bloom-ink'
    }`

  return (
    <header className="bg-bloom-bg border-b-2 border-bloom-ink sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-display text-bloom-ink text-lg uppercase tracking-tight">
          Bloom Diary
        </Link>
        <nav className="flex gap-2">
          <Link to="/" className={linkClass('/')}>Write</Link>
          <Link to="/history" className={linkClass('/history')}>History</Link>
        </nav>
      </div>
    </header>
  )
}
