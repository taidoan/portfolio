import { GlobalConfig } from 'payload';
import { Link } from '@/fields/Link';
import { anyone, authenticated } from '@/access';
import { revalidateGlobal } from '@/globals/hooks/revalidateGlobal';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: anyone,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateGlobal('footer')],
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
