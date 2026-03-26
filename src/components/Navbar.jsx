import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const { pathname } = useLocation()

  const linkClass = (path) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      pathname === path
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
    }`

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold text-gray-900">
          <span className="text-xl">📓</span>
          <span>Bloom English Diary</span>
        </Link>
        <nav className="flex gap-1">
          <Link to="/" className={linkClass('/')}>
            Write
          </Link>
          <Link to="/history" className={linkClass('/history')}>
            History
          </Link>
        </nav>
      </div>
    </header>
  )
}
