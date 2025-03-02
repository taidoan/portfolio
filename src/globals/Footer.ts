import { GlobalConfig } from 'payload';
import { link } from '@/fields/Link';
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
