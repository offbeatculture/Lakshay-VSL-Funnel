import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the build works from any sub-folder on Hostinger.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2018',
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});
