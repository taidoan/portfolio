import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// More info at: https://storybook.js.org/docs/writing-tests/test-addon
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./scripts/tests.ts'],
  },
});
