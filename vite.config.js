import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import fs from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-index-to-404',
      closeBundle() {
        // Copy index.html to 404.html for SPA routing
        const indexPath = resolve(__dirname, 'dist/index.html')
        const notFoundPath = resolve(__dirname, 'dist/404.html')

        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath)
          console.log('Created 404.html from index.html for SPA routing')
        }
      }
    }
  ],
  base: '/',
  server: {
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    },
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
