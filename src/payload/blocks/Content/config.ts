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
              required: true,
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'container',
                  label: 'Container',
                  options: [
                    { value: 'boxed', label: 'Boxed' },
                    { value: 'none', label: 'None' },
                  ],
                  defaultValue: 'boxed',
                },
                {
                  type: 'select',
                  name: 'boxedPadding',
                  label: 'Boxed Padding',
                  admin: {
                    condition: (_, siblingData) => siblingData.container === 'boxed',
                  },
                  options: [
                    { value: 'small', label: 'Small' },
                    { value: 'base', label: 'Base' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ],
                  defaultValue: 'base',
                  required: true,
                },
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
