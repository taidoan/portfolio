import type { ArrayField, Field } from 'payload';
import { Link } from './../index';

export const linkGroup = (): ArrayField => {
  const generatedLinkGroup: Field = {
    name: 'linksGroup',
    type: 'array',
    fields: [Link()],
    admin: {
      initCollapsed: true,
    },
    label: false,
  };

  return generatedLinkGroup;
};
