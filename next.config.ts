import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const isNixpacksBuild = process.env.NIXPACKS_BUILD === 'true';

const nextConfig: NextConfig = {
  output: 'standalone',
  compiler: isProduction
    ? {
        reactRemoveProperties: { properties: ['^data-testid'] },
        removeConsole: { exclude: ['error', 'warn'] },
      }
    : undefined,
  turbopack: {
    resolveAlias: {
      '@abstracts': path.join(__dirname, 'styles/abstracts'),
      '@mixins': path.join(__dirname, 'styles/abstracts/mixins'),
      '@functions': path.join(__dirname, 'styles/abstracts/functions'),
      '@settings': path.join(__dirname, 'styles/abstracts/settings'),
    },
  },

  typescript: {
    ignoreBuildErrors: isNixpacksBuild,
  },
  eslint: {
    ignoreDuringBuilds: isNixpacksBuild,
  },

  poweredByHeader: false,

  images: {
    qualities: [40, 60, 80, 100],
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
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placeimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
        port: '',
      },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
