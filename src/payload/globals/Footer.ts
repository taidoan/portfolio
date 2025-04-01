import { GlobalConfig } from 'payload';
import { Link } from '@/payload/fields/Link';
import { anyone, authenticated } from '@/payload/access';
import { revalidateGlobal } from '@/payload/globals/hooks/revalidateGlobal';

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
