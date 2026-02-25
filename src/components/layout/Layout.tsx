import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, maxWidth: '672px', margin: '0 auto', width: '100%', padding: '24px 16px' }}>
        <Outlet />
      </main>
    </div>
  )
}