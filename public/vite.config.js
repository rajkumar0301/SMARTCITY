import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist', // ✔️ Output folder for production build (Vercel uses this)
  },

  server: {
    fs: {
      allow: ['..'], // ✔️ Allows file system access above root (optional, only if needed)
    },
  },

  resolve: {
    alias: {
      '@': '/src', // ✔️ Shortcut for imports (like import X from '@/components/X')
    },
  },
})
