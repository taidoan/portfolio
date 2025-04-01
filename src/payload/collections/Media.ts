import type { CollectionConfig } from 'payload';
import { anyone, authenticated } from '@/payload/access';

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*', 'video/*', 'application/pdf'],
  },
};
