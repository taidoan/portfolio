import { Block } from 'payload';
import { linkGroup } from '@fields/Link/Group';
import { GridAppearance } from '@/fields/GridAppearance';

export const LinksGroupBlock: Block = {
  slug: 'links-group',
  interfaceName: 'LinksGroupBlockProps',
  fields: [linkGroup(), GridAppearance()],
};
