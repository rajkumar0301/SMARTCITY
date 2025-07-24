import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: 'dist', // where the production build will be saved (used by Vercel)
  },

  server: {
    fs: {
      allow: ['..'], // allows access to folders above this project root
    },
  },

  resolve: {
    alias: {
      '@': '/src', // allows you to import like: import x from '@/components/X'
    },
  },
})
