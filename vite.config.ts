import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  server: {
    host: true,
    open: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components/'),
      constants: path.resolve(__dirname, './src/constants/'),
      features: path.resolve(__dirname, './src/features/'),
      types: path.resolve(__dirname, './src/types/'),
      models: path.resolve(__dirname, './src/models/'),
      utils: path.resolve(__dirname, './src/utils/'),
      hooks: path.resolve(__dirname, './src/hooks/'),
      slices: path.resolve(__dirname, './src/slices/'),
    },
  },
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  base: '/ddda-planner/',
});
