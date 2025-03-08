import { Block } from 'payload';
import { LinkGroup } from '@fields/Link/Group';
import { GridAppearance } from '@/fields/GridAppearance';

export const LinksGroupBlock: Block = {
  slug: 'links-group',
  interfaceName: 'LinksGroupBlockProps',
  fields: [LinkGroup(), GridAppearance()],
};
