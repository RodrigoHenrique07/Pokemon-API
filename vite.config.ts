import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [
    react(),

  ],
  server: {
    port: 8000,
    watch: {
      usePolling: true,
    },
    strictPort: true,
    host: true
  },
  root: './',
  build: {
    outDir: './dist',
  },
  resolve:{
    alias: {
      '@' : path.resolve(__dirname, './src'),
      '@components' : path.resolve(__dirname, './src/components'),
      '@context' : path.resolve(__dirname, './src/context'),
      '@models' : path.resolve(__dirname, './src/models'),
      '@pages' : path.resolve(__dirname, './src/pages'),
      '@styles' : path.resolve(__dirname, './src/styles'),
      '@assets' : path.resolve(__dirname, './src/assets'),
      '@routes' : path.resolve(__dirname, './src/routes'),
      '@utils' : path.resolve(__dirname, './src/utils'),
      '@mock' : path.resolve(__dirname, './src/mock'),
      '@config' : path.resolve(__dirname, './src/config')
    }
  }
});
