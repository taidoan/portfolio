import { GlobalConfig } from 'payload';
import { link } from '@fields/link';
import { anyone, authenticated } from '@/access';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      fields: [link()],
      required: true,
    },
  ],
};
