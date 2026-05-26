import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import { ThemeProvider } from './theme/ThemeProvider.jsx'
import { ToastProvider } from './components/ui/Toast.jsx'
import './styles/tokens.css'
import './styles/global.css'
import './components/ui/components.css'
import './components/site/site.css'
import './pages/pages.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
