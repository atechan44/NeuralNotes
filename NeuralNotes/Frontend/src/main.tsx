import React from 'react'
import ReactDOM from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'; // KALDIRILDI
import App from './App.tsx'

// Stil importları
import './styles/globals.css'

// i18n konfigürasyonu
import './i18n/i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter> // KALDIRILDI */}
      <App />
    {/* </BrowserRouter> // KALDIRILDI */}
  </React.StrictMode>
)
