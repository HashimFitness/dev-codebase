import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensures the app is accessible on all network interfaces
    port: 5173,      // Port for the dev server (useful for testing if needed)
  },
  build: {
    outDir: 'dist', // Directory where the production files will be generated
  },
});
