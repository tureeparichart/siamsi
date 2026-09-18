import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Preload PhoKhunRam font for Sukhothai souvenir card
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.load('20px PhoKhunRam').catch(() => {});
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
