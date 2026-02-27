import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import BottomNav from './BottomNav'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{
        flex: 1,
        maxWidth: '672px',
        margin: '0 auto',
        width: '100%',
        padding: '24px 16px',
      }}>
        <style>{`
          @media (max-width: 640px) {
            main { padding-bottom: 88px !important; }
          }
        `}</style>
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}