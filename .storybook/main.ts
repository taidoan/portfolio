import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/experimental-nextjs-vite',
    options: {},
  },
  async viteFinal(config, { configType }) {
    const { mergeConfig } = await import('vite');

    config = mergeConfig(config, {
      '@': path.resolve(__dirname, '../src'),
      '@payload-config': path.resolve(__dirname, '../src/payload.config.ts'),
      '@config': path.resolve(__dirname, '../config'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@images': path.resolve(__dirname, '../public/assets/images'),
      '@pages': path.resolve(__dirname, '../src/styles/pages'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@utlities': path.resolve(__dirname, '../src/utlities'),
      '@scripts': path.resolve(__dirname, '../scripts'),
      '@abstracts': path.resolve(__dirname, '../src/styles/abstracts'),
      '@mixins': path.resolve(__dirname, '../src/styles/abstracts/mixins'),
      '@functions': path.resolve(__dirname, '../src/styles/abstracts/functions'),
      '@settings': path.resolve(__dirname, '../src/styles/abstracts/settings'),
    });

    return config;
  },
};
export default config;
