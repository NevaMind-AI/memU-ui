import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App'
import './index.css'
import { ThemeProviderWrapper } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProviderWrapper>
        <CssBaseline />
        <App />
      </ThemeProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>,
)

