import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      minify: mode === 'production',
      rollupOptions: {
        output: {
          manualChunks: mode === 'production' ? undefined : (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
