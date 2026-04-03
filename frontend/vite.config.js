import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Must match the GitHub repo name so Pages serves assets from the correct sub-path
  base: '/Cos-with-VisaProUK/',
  build: {
    // Copy 404.html into dist so GitHub Pages redirects unknown routes to React Router
    rollupOptions: {
      input: {
        main: 'index.html',
      },
    },
  },
})
