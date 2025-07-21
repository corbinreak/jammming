import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['precious-grackle-holy.ngrok-free.app'],
    port: 5174
  },
})
