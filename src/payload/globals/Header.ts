import { GlobalConfig } from 'payload';
import { Link } from '@/payload/fields/Link';
import { anyone, authenticated } from '@/payload/access';
import { revalidateGlobal } from '@/payload/globals/hooks/revalidateGlobal';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Layout',
  },
  hooks: {
    afterChange: [revalidateGlobal('header')],
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Items',
      type: 'array',
      fields: [Link()],
      required: true,
    },
    {
      name: 'logoColor',
      label: 'Logo Colour',
      type: 'select',
      required: true,
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'accent', label: 'Accent' },
        { value: 'light', label: 'Light' },
        { value: 'slate', label: 'Slate' },
        { value: 'frosted-sage', label: 'Frosted Sage' },
        { value: 'urban-steel', label: 'Urban Steel' },
      ],
      defaultValue: 'secondary',
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
