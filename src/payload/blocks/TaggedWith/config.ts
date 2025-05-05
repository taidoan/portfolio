import type { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const TaggedWithBlock: Block = {
  slug: 'taggedWithBlock',
  interfaceName: 'TaggedWithBlockProps',
  labels: {
    singular: 'Tagged With',
    plural: 'Tagged With',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Options',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'checkbox',
                  name: 'showTitle',
                  label: 'Show Title',
                  defaultValue: true,
                  admin: {
                    style: {
                      justifyContent: 'center',
                    },
                  },
                },
                {
                  type: 'text',
                  name: 'title',
                  label: 'Title',
                  defaultValue: 'Tagged With',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.showTitle,
                  },
                },
                {
                  type: 'number',
                  name: 'numberOfTags',
                  label: 'Number of Tags',
                  defaultValue: 8,
                  max: 12,
                  min: 1,
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.showTitle,
                  },
                },
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
