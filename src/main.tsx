// src/main.tsx
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n'  // ← инициализация i18n до рендера приложения

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister())
  })
  caches.keys().then(keys => {
    keys.forEach(key => caches.delete(key))
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>
)
