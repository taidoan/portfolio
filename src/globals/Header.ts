import { GlobalConfig } from 'payload';
import { Link } from '@/fields/Link';
import { anyone, authenticated } from '@/access';

export const Header: GlobalConfig = {
  slug: 'header',
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
