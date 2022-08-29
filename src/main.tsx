import React from 'react';
import ReactDOM from 'react-dom/client';

import { AuthProvider } from '@contexts/AuthContext';
import App from '@src/App';

import '@styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
