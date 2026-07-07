import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/shared/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary
    fallback={
      <div style={{ padding: 24, fontFamily: 'system-ui', color: '#e8eaf6', background: '#0a0b14', minHeight: '100vh' }}>
        <h1>LLM Visualiser failed to load</h1>
        <p>Please hard-refresh the page (Cmd+Shift+R).</p>
      </div>
    }
  >
    <App />
  </ErrorBoundary>
)
