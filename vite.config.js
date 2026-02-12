import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Life-in-Weeks/',
  plugins: [react()],
  server: {
    open: true
  }
});
