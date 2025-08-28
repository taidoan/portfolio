import type { StorybookConfig } from '@storybook/nextjs-vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    'storybook-addon-pseudo-states',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
    '@storybook/addon-docs',
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      server: {
        proxy: {
          '/assets': 'http://localhost:3000',
        },
      },
      define: { 'process.env': {}, global: 'globalThis' },
      optimizeDeps: {
        esbuildOptions: {
          plugins: [
            NodeGlobalsPolyfillPlugin({
              buffer: true,
              process: true,
            }),
          ],
        },
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          '@payload-config': path.resolve(__dirname, '../src/payload.config.ts'),
          '@config': path.resolve(__dirname, '../config'),
          '@components': path.resolve(__dirname, '../src/components'),
          '@images': path.resolve(__dirname, '../public/assets/images'),
          '@pages': path.resolve(__dirname, '../src/styles/pages'),
          '@styles': path.resolve(__dirname, '../src/styles'),
          '@utilities': path.resolve(__dirname, '../src/utilities'),
          '@scripts': path.resolve(__dirname, '../scripts'),
          '@abstracts': path.resolve(__dirname, '../src/styles/abstracts'),
          '@mixins': path.resolve(__dirname, '../src/styles/abstracts/mixins'),
          '@functions': path.resolve(__dirname, '../src/styles/abstracts/functions'),
          '@settings': path.resolve(__dirname, '../src/styles/abstracts/settings'),
          '@mocks': path.resolve(__dirname, '../src/mocks'),
          '@lib': path.resolve(__dirname, '../src/lib'),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [
              path.resolve(__dirname, '../src/styles'),
              path.resolve(__dirname, '../src/styles/abstracts'),
              path.resolve(__dirname, '../src/styles/abstracts/mixins'),
              path.resolve(__dirname, '../src/styles/abstracts/functions'),
              path.resolve(__dirname, '../src/styles/abstracts/settings'),
            ],
          },
        },
      },
    });
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
