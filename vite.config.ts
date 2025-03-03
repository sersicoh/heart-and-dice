import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@views': path.resolve(__dirname, './src/views'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
