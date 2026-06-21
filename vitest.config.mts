import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  test: {
    include: [
      'lib/contracts/**/*.test.ts',
      'tests/unit/**/*.test.ts',
      'tests/unit/**/*.test.cjs',
      'tests/integration/**/*.test.ts',
      'tests/integration/**/*.test.cjs',
      'tests/property/**/*.test.ts',
      'tests/property/**/*.test.cjs',
      'tests/session/**/*.test.ts',
      'tests/session/**/*.test.cjs',
      'tests/react/**/*.test.tsx',
      'tests/react/**/*.test.ts',
    ],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['tests/setup.ts', 'tests/react/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['lib/contracts/**/*.ts', 'app/**/*.ts', 'lib/**/*.ts'],
      exclude: [
        'lib/contracts/**/*.test.ts',
        'tests/**',
      ],
    },
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
