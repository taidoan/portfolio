// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { plugins } from './payload/plugins';
import { editor } from './lib/editor';

import { collections } from './payload/collections';
import { globals } from './payload/globals';
import { Users } from './payload/collections/Users';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.SERVER_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
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
