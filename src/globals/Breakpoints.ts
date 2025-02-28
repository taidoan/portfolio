import { GlobalConfig } from 'payload';
import { authenticated, anyone } from '@/access';

export const Breakpoints: GlobalConfig = {
  slug: 'breakpoints',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'breakpoints',
      label: 'Breakpoints',
      type: 'array',
      fields: [
        {
          type: 'text',
          name: 'name',
          required: true,
          label: 'Name',
        },
        {
          type: 'text',
          name: 'breakpoint',
          required: true,
          label: 'Breakpoint',
        },
      ],
    },
  ],
};
