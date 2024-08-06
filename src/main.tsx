import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.js';

import './i18n.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>
);
