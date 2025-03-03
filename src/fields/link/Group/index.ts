import type { ArrayField, Field } from 'payload';
import { link } from '@/fields/Link';

export const linkGroup = (): ArrayField => {
  const generatedLinkGroup: Field = {
    name: 'linksGroup',
    type: 'array',
    fields: [link()],
    admin: {
      initCollapsed: true,
    },
    label: false,
  };

  return generatedLinkGroup;
};
