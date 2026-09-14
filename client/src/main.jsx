import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Vite event fired when a dynamically imported asset chunk fails (e.g. after a new production deployment)
if (typeof window !== 'undefined') {
  window.addEventListener('vite:preloadError', (event) => {
    console.warn('[QRLoop] Vite preloadError detected (new deployment). Reloading page...', event);
    const lastReload = window.sessionStorage.getItem('qrloop_vite_reload');
    const now = Date.now();
    if (!lastReload || now - parseInt(lastReload, 10) > 15000) {
      window.sessionStorage.setItem('qrloop_vite_reload', now.toString());
      window.location.reload();
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
