import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: false,
    environment: 'jsdom',
    coverage: {
        reporter: ['text', 'json', 'html'],
      },
  }
})
