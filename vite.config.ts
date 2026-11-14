import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE: '/nama-repo/' untuk GitHub Pages (diisi otomatis oleh workflow),
// atau '/' untuk custom domain / pengembangan lokal.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
