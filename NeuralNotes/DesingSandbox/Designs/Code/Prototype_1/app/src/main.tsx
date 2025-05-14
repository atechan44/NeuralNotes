import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import './index.css'
// import App from './App.tsx'

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <h1>MAIN.TSX TESTİ - BU GÖRÜNÜYOR MU?</h1>
    </StrictMode>,
  )
} else {
  console.error("Root element 'root' not found in the DOM.")
}
