import { Block } from 'payload';
import { Link } from '@/payload/fields/Link';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const LinksBlock: Block = {
  slug: 'links',
  interfaceName: 'LinksBlockProps',
  fields: [Link(), GridAppearance()],
};
