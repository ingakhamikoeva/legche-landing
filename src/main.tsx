import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
// Шрифты (кириллица): только нужные начертания — бюджет скорости.
// Всё без засечек (правка Инги 04.07): Golos Text для текста и заголовков.
import '@fontsource/golos-text/400.css';
import '@fontsource/golos-text/600.css';
import '@fontsource/golos-text/700.css';
import './index.css';
import App from './App';

const rootEl = document.getElementById('root')!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Боевая сборка пререндерена (SEO) — оживляем готовый HTML;
// предпросмотр и dev-режим рендерятся с нуля как раньше
if (rootEl.hasChildNodes()) hydrateRoot(rootEl, app);
else createRoot(rootEl).render(app);
