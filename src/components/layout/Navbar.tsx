import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-wide">
          ⚔️ Fate Characters
        </Link>
      </div>
    </header>
  )
}