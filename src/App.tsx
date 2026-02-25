import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useCharacterStore } from './store/characterStore'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import CreateCharacterPage from './pages/CreateCharacterPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import EditCharacterPage from './pages/EditCharacterPage'
import CreateNpcPage from './pages/CreateNpcPage'
import EditNpcPage from './pages/EditNpcPage'

function App() {
  const loadAll = useCharacterStore(state => state.loadAll)

  useEffect(() => {
    loadAll()
  }, [loadAll])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="character/create" element={<CreateCharacterPage />} />
        <Route path="character/:id" element={<CharacterDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="character/:id/edit" element={<EditCharacterPage />} />
        <Route path="npc/create" element={<CreateNpcPage />} />
        <Route path="npc/:id/edit" element={<EditNpcPage />} />
      </Route>
    </Routes>
  )
}

export default App