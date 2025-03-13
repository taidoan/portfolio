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
              type: 'select',
              name: 'contentType',
              label: 'Content Type',
              options: [
                { value: 'custom', label: 'Custom' },
                { value: 'services', label: 'Services' },
              ],
            },
            {
              type: 'array',
              name: 'content',
              fields: [
                {
                  type: 'text',
                  name: 'title',
                },
                {
                  type: 'richText',
                  name: 'description',
                },
                {
                  type: 'array',
                  name: 'items',
                  label: 'Items',
                  fields: [
                    {
                      type: 'text',
                      name: 'title',
                    },
                    {
                      type: 'richText',
                      name: 'description',
                    },
                    {
                      type: 'upload',
                      name: 'image',
                      relationTo: 'media',
                      label: 'Image',
                    },
                  ],
                },
              ],
            },
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
