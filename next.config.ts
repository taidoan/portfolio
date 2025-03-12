import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'standalone',
  compiler: isProduction
    ? {
        reactRemoveProperties: { properties: ['^data-testid'] },
        removeConsole: {
          exclude: ['error'],
        },
      }
    : undefined,
  experimental: {
    turbo: {
      resolveAlias: {
        '@abstracts': path.join(__dirname, 'styles/abstracts'),
        '@mixins': path.join(__dirname, 'styles/abstracts/mixins'),
        '@functions': path.join(__dirname, 'styles/abstracts/functions'),
        '@settings': path.join(__dirname, 'styles/abstracts/settings'),
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        port: '',
      },
    ],
  },
};

export default withPayload(nextConfig);
