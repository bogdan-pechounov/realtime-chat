import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import codegen from 'vite-plugin-graphql-codegen'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react() /*, codegen()*/],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
