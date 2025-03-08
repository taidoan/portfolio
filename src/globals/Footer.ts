import { GlobalConfig } from 'payload';
import { Link } from '@/fields/Link';
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
      fields: [Link()],
      required: true,
    },
  ],
};
