import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // This will work with docker container
        target: 'http://django:8000/',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
