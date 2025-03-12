import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';

export const TabbedContentBlock: Block = {
  slug: 'tabbedContentBlock',
  interfaceName: 'TabbedContentBlockProps',
  labels: {
    singular: 'Tabbed Content',
    plural: 'Tabbed Contents',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tabbed Content',
          fields: [
            {
              type: 'text',
              name: 'className',
              label: 'Custom Class Name',
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [GridAppearance()],
        },
      ],
    },
  ],
};
