import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// Мультистраничная сборка: лендинг + юридические страницы.
// nginx отдаёт /oferta → oferta.html, /privacy → privacy.html (см. README-DEPLOY.md)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        oferta: resolve(__dirname, 'oferta.html'),
        privacy: resolve(__dirname, 'privacy.html'),
      },
    },
  },
})
