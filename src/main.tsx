import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './Context/AuthProvider.tsx';
createRoot(document.getElementById('root')!).render(
   <>
    <AuthProvider>
      <App />
    </AuthProvider>
  </>,
)
