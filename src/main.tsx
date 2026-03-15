// src/main.tsx
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n'  // ← инициализация i18n до рендера приложения

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>
)
