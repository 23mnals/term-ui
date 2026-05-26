import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps asset paths relative so the build works on GitHub Pages
// (any sub-path) when combined with the HashRouter.
export default defineConfig({
  base: './',
  plugins: [react()],
})
