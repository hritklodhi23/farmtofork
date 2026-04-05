import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Optional proxy: uncomment to route /api requests to backend without needing VITE_API_URL
    // proxy: {
    //   '/api': 'http://localhost:5000',
    // },
  },
})
