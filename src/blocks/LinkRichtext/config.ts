import { Block } from 'payload';
import { link } from '@/fields/Link';

export const LinksBlockRichtext: Block = {
  slug: 'links-richtext',
  interfaceName: 'LinksBlockRichtextProps',
  fields: [link()],
  labels: {
    singular: 'Button Link',
    plural: 'Button Links',
  },
};
