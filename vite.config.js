import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['65407de4d87e.ngrok-free.app'],
    port: 5174
  },
})
