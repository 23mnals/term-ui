import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Library build — produces dist-lib/term-ui.js (ESM) + dist-lib/term-ui.css.
 * React / react-dom / react-router-dom are externalised so the consumer's
 * copies are reused (peer deps).
 */
export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/lib.js'),
      formats: ['es'],
      fileName: () => 'term-ui.js',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-dom/client',
        'react-dom/server',
        'react-router-dom',
        'react-router-dom/server',
      ],
      output: {
        assetFileNames: (asset) => {
          if (asset.name && asset.name.endsWith('.css')) return 'term-ui.css'
          return asset.name || '[name][extname]'
        },
      },
    },
  },
})
