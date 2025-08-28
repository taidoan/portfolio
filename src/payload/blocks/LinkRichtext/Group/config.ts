import { Block } from 'payload';
import { LinkGroup } from '@/payload/fields/Link/Group';

export const LinksGroupRichtextBlock: Block = {
  slug: 'links-group-richtext',
  interfaceName: 'LinksGroupRichtextProps',
  fields: [LinkGroup()],
  labels: {
    singular: 'Button Link Group',
    plural: 'Button Link Groups',
  },
};
