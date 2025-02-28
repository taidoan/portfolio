import type { CollectionConfig } from 'payload';
import { authenticated, authenticatedOrPublished } from '@/access';

export const Services: CollectionConfig = {
  slug: 'services',
  access: {
    read: authenticatedOrPublished,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
  ],
};
