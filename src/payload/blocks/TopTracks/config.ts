import { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const TopTracksBlock: Block = {
  slug: 'topTracksBlock',
  labels: {
    singular: 'Top Tracks',
    plural: 'Top Tracks',
  },
  interfaceName: 'TopTracksBlockProps',
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
                  type: 'select',
                  name: 'type',
                  label: 'View Type',
                  defaultValue: 'carousel',
                  options: [
                    { value: 'carousel', label: 'Carousel' },
                    { value: 'list', label: 'List' },
                  ],
                },
                {
                  type: 'number',
                  name: 'numberOfTracks',
                  label: 'Number of Tracks',
                  defaultValue: 6,
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              type: 'select',
              name: 'container',
              options: [
                { value: 'none', label: 'None' },
                { value: 'card', label: 'Card' },
              ],
              defaultValue: 'none',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'loop',
                  options: [
                    { value: 'loop', label: 'Loop' },
                    { value: 'noloop', label: 'No Loop' },
                  ],
                  defaultValue: 'noloop',
                  admin: { width: '33%' },
                },
                {
                  type: 'number',
                  name: 'slideSpacing',
                  defaultValue: 16,
                  required: true,
                  admin: { width: '33%' },
                },
                {
                  type: 'select',
                  name: 'focus',
                  options: [
                    { value: 'focused', label: 'Focused' },
                    { value: 'unfocused', label: 'Unfocused' },
                  ],
                  defaultValue: 'focused',
                  admin: { width: '33%' },
                },
              ],
              admin: {
                condition: (_, siblingData) => siblingData.type === 'carousel',
              },
            },
            GridAppearance(),
          ],
        },
      ],
    },
  ],
};
