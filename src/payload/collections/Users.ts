import type { CollectionConfig } from 'payload';
import { authenticated } from '@/payload/access';

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
    admin: authenticated,
  },
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
    },
  ],
};
