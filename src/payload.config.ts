// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { resendAdapter } from '@payloadcms/email-resend';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { plugins } from './payload/plugins';
import { editor } from './lib/editor';

import { collections } from './payload/collections';
import { globals } from './payload/globals';
import { Users } from './payload/collections/Users';

import { AUTHOR_NAME } from './lib/constants';
import { NOREPLY_EMAIL } from './lib/constants';
import { getServerSideURL } from './lib/utilities/getURLs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: getServerSideURL(),
  csrf: [getServerSideURL()],
  cors: [getServerSideURL()],
  email: resendAdapter({
    defaultFromAddress: NOREPLY_EMAIL,
    defaultFromName: AUTHOR_NAME,
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      beforeDashboard: ['@/components/layout/Dashboard'],
      Nav: '@/components/layout/Admin/Nav#Nav',
      afterNavLinks: ['@/components/layout/Admin/Nav/afterNavLinks#Links'],
      header: ['@/components/layout/Admin/Header#AdminHeader'],
      views: {
        Metrics: {
          Component:
            '@/components/layout/Admin/Views/Metrics/cloudflare/index#CloudflareMetricsView',
          path: '/metrics/cloudflare',
          meta: {
            title: 'Cloudflare Metrics',
            description: 'Cloudflare R2 Storage usage data and analytics',
          },
        },
        imagekit: {
          Component: '@/components/layout/Admin/Views/Metrics/imagekit/index#ImagekitMetricsView',
          path: '/metrics/imagekit',
          meta: {
            title: 'ImageKit Metrics',
            description: 'ImageKit usage data and analytics',
          },
        },
      },
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          label: 'Mobile',
          width: 375,
          height: 667,
        },
        {
          name: 'tablet',
          label: 'Tablet',
          width: 768,
          height: 1024,
        },
        {
          name: 'laptop',
          label: 'Laptop',
          width: 1024,
          height: 1366,
        },
        {
          name: 'desktop',
          label: 'Desktop',
          width: 1440,
          height: 2560,
        },
      ],
    },
  },
  collections: collections,
  globals: globals,
  editor: editor,
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [...plugins],
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
});
