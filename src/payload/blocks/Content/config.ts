import type { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const ContentBlock: Block = {
  slug: 'contentBlock',
  interfaceName: 'ContentBlockProps',
  labels: {
    singular: 'Content',
    plural: 'Content',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'richText',
              name: 'content',
              label: 'Content',
              admin: {
                width: '100%',
              },
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              type: 'select',
              name: 'container',
              label: 'Container',
              options: [
                { value: 'boxed', label: 'Boxed' },
                { value: 'none', label: 'None' },
              ],
            },
            GridAppearance(),
            {
              type: 'text',
              name: 'className',
              label: 'Custom Class Name',
            },
          ],
        },
      ],
    },
  ],
};
