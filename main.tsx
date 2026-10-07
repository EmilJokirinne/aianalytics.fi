import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Tuotannossa sivu on esirenderöity (prerender.mjs), joten React liittyy valmiiseen HTML:ään.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
