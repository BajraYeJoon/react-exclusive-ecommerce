import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compression } from "vite-plugin-compression2";
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    compression({
      threshold: 10240,
    }),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
    
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
