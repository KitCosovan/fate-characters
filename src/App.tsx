// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useCharacterStore } from './store/characterStore'
import { useCampaignStore } from './store/campaignStore'
import { useAuthStore } from './store/authStore'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import CreateCharacterPage from './pages/CreateCharacterPage'
import CharacterDetailPage from './pages/CharacterDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import EditCharacterPage from './pages/EditCharacterPage'
import CreateNpcPage from './pages/CreateNpcPage'
import EditNpcPage from './pages/EditNpcPage'
import EncyclopediaPage from './pages/EncyclopediaPage'
import AuthPage from './pages/AuthPage'
import CampaignRoomPage from './pages/CampaignRoomPage'
import JoinCampaignPage from './pages/JoinCampaignPage'

function App() {
  const loadCharacters = useCharacterStore(state => state.loadAll)
  const loadCampaigns  = useCampaignStore(state => state.loadAll)
  const syncCharacters = useCharacterStore(state => state.syncWithRemote)
  const syncCampaigns  = useCampaignStore(state => state.syncWithRemote)
  const initAuth       = useAuthStore(state => state.init)

  useEffect(() => {
    loadCharacters()
    loadCampaigns()
    initAuth().then(() => {
      const user = useAuthStore.getState().user
      if (user) {
        syncCharacters(user.id)
        syncCampaigns(user.id)
      }
    })
  }, [])

  return (
    <Routes>
      <Route path="/auth"              element={<AuthPage />} />
      <Route path="/join"              element={<JoinCampaignPage />} />
      <Route path="/join/:code"        element={<JoinCampaignPage />} />
      <Route path="/campaign/:id/room" element={<CampaignRoomPage />} />
      <Route path="/" element={<Layout />}>
        <Route index                       element={<HomePage />} />
        <Route path="character/create"     element={<CreateCharacterPage />} />
        <Route path="character/:id"        element={<CharacterDetailPage />} />
        <Route path="character/:id/edit"   element={<EditCharacterPage />} />
        <Route path="npc/create"           element={<CreateNpcPage />} />
        <Route path="npc/:id/edit"         element={<EditNpcPage />} />
        <Route path="encyclopedia"         element={<EncyclopediaPage />} />
        <Route path="*"                    element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
