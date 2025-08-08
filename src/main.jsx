import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LabProvider } from './context/LabContext'
import './index.css'
 
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LabProvider>
      <App />
    </LabProvider>
  </React.StrictMode>
)