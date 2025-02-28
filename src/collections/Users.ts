import type { CollectionConfig } from 'payload';
import { authenticated } from '@/access';

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
    useAsTitle: 'email',
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
