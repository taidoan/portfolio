import { Block } from 'payload';
import { Link } from '@fields/Link';
import { GridAppearance } from '@/fields/GridAppearance';

export const LinksBlock: Block = {
  slug: 'links',
  interfaceName: 'LinksBlockProps',
  fields: [Link(), GridAppearance()],
};
