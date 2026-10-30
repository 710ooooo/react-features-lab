import { StrictMode } from 'react'
// React 18: ReactDOM.render は非推奨になり createRoot へ (Concurrent 機能の前提)
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
