import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import './index.css';
import OptIn from './pages/OptIn.jsx';
import VSL from './pages/VSL.jsx';
import Schedule from './pages/Schedule.jsx';
import ThankYou from './pages/ThankYou.jsx';
import { LangProvider } from './lib/lang.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

// HashRouter is used so the site works on any shared host (Hostinger) without
// needing custom .htaccess rewrite rules for client-side routing.
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LangProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<OptIn />} />
          <Route path="/vsl" element={<VSL />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </LangProvider>
  </React.StrictMode>
);
