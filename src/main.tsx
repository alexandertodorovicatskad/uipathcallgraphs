import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Import the correct App entry (TSX). App.jsx is present but empty in this repo.
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
