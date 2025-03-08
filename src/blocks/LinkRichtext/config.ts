import { Block } from 'payload';
import { Link } from '@fields/Link';

export const LinksBlockRichtext: Block = {
  slug: 'links-richtext',
  interfaceName: 'LinksBlockRichtextProps',
  fields: [Link()],
  labels: {
    singular: 'Button Link',
    plural: 'Button Links',
  },
};
