/// <reference types="vitest" />
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/dynamic-grid/',
  plugins: [react(), tsConfigPaths(), ViteEjsPlugin(), visualizer()],
  build: {
    manifest: 'manifest.json',
    minify: false,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      input: 'src/index.ts',
      external: [
        '@nexus/*',
        'axios',
        'jotai',
        'react',
        'react-dom',
        'react-i18next'
      ],
      output: {
        entryFileNames: 'dynamic-grid.js',
        format: 'system',
        globals: {
          '@nexus/*': '@nexus/*',
          axios: 'axios',
          jotai: 'jotai',
          react: 'react',
          reactDOM: 'react-dom',
          react18next: 'react-i18next'
        }
      }
    }
  },
  test: {
    exclude: [...configDefaults.exclude],
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
    environment: 'happy-dom',
    coverage: {
      enabled: false,
      provider: 'v8',
      exclude: [
        ...(configDefaults?.coverage?.exclude ?? []),
        'node_modules/**',
        'src/test/**',
        'src/**/styles',
        'src/**/*.for-tests.*',
        'src/**/index.ts'
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  }
});
