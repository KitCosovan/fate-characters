import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="text-center py-16">
      <p className="text-5xl mb-4">🌀</p>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Страница не найдена</h1>
      <p className="text-gray-400 mb-6">Кажется, ты попал в зону без аспектов</p>
      <Link to="/" className="text-indigo-600 hover:underline font-medium">
        Вернуться на главную
      </Link>
    </div>
  )
}