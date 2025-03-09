import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';
import { Link } from '@/fields/Link';

export const ToolsBlock: Block = {
  slug: 'toolsBlock',
  labels: {
    singular: 'Tool',
    plural: 'Tools',
  },
  interfaceName: 'ToolsBlockProps',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Tools',
          fields: [
            {
              type: 'array',
              name: 'tools',
              label: 'Tools List',
              labels: {
                singular: 'Tool',
                plural: 'Tools',
              },
              minRows: 3,
              admin: {
                description:
                  'Create a list of tools that you use, featuring their icon, title and link.',
              },
              fields: [
                {
                  type: 'upload',
                  name: 'icon',
                  label: 'Icon',
                  relationTo: 'media',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'text',
                  name: 'name',
                  label: 'Tool Name',
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'richText',
                  name: 'description',
                  label: 'Description',
                },
                Link(),
              ],
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
