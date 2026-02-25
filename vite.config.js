import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: false,
    allowedHosts: 'all',
    middlewareMode: false,
    httpOnly: false
  },
  preview: {
    port: 3000,
    host: '0.0.0.0',
    open: false,
    allowedHosts: 'all'
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
