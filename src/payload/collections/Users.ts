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
    group: 'Settings',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
    },
    {
      name: 'knownAs',
      type: 'text',
      label: 'Known As',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
};
