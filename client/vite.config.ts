import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src')},
        { find: '@features', replacement: path.resolve(__dirname, './src/features')},
        { find: '@pages', replacement: path.resolve(__dirname, './src/pages')},
      ]
    },
  }
})
