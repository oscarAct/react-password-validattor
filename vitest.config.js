import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: false,
    environment: 'jsdom',
    coverage: {
        reporter: ['text', 'json', 'html'],
      },
    threads: false,
    deps: {
      inline: ['react-password-validattor']
    }
  }
})
