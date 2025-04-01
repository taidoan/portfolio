import { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';
import { Link } from '@/payload/fields/Link';

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
          label: 'Content',
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
              label: 'Tabs',
              labels: {
                singular: 'Tab',
                plural: 'Tabs',
              },
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.contentType === 'custom';
                },
              },
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
                  type: 'checkbox',
                  name: 'addLink',
                  defaultValue: false,
                },
                Link({
                  linkOverrides: {
                    admin: {
                      condition: (_, siblingData) => siblingData.addLink,
                    },
                  },
                }),
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
          ],
        },
        {
          label: 'Appearance',
          fields: [
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
