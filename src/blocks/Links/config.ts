import { Block } from 'payload';
import { link } from '@fields/Link';
import { GridAppearance } from '@/fields/GridAppearance';

export const LinksBlock: Block = {
  slug: 'links',
  interfaceName: 'LinksBlockProps',
  fields: [link(), GridAppearance()],
};
