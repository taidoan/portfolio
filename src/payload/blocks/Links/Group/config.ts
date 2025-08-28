import { Block } from 'payload';
import { LinkGroup } from '@/payload/fields/Link/Group';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const LinksGroupBlock: Block = {
  slug: 'links-group',
  interfaceName: 'LinksGroupBlockProps',
  fields: [LinkGroup(), GridAppearance()],
};
