import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Default './' (path relatif) agar hasil build berjalan di subpath mana pun, termasuk
// GitHub Pages (/nama-repo/) dan 'npm run deploy' dari komputer sendiri.
// Workflow GitHub Actions mengisi VITE_BASE secara eksplisit.
export default defineConfig({
  base: process.env.VITE_BASE ?? './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
})
