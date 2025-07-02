import { GlobalConfig } from 'payload';
import { authenticated, anyone } from '@/payload/access';
import { revalidateGlobal } from '@/payload/globals/hooks/revalidateGlobal';

export const Breakpoints: GlobalConfig = {
  slug: 'breakpoints',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal('breakpoints')],
  },
  admin: {
    group: 'Layout',
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
