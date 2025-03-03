import { Block } from 'payload';
import { linkGroup } from '@/fields/Link/Group';

export const LinksGroupRichtextBlock: Block = {
  slug: 'links-group-richtext',
  interfaceName: 'LinksGroupRichtextProps',
  fields: [linkGroup()],
  labels: {
    singular: 'Button Link Group',
    plural: 'Button Link Groups',
  },
};
