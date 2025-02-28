import { Plugin } from 'payload';
import { s3Storage } from '@payloadcms/storage-s3';

export const plugins: Plugin[] = [
  s3Storage({
    collections: {
      media: {
        prefix: 'media',
        disableLocalStorage: true,
      },
    },
    bucket: process.env.R2_BUCKET!,
    config: {
      endpoint: process.env.R2_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
      region: 'auto',
      forcePathStyle: true,
    },
  }),
];
