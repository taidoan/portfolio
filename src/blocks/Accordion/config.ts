import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';

export const AccordionBlock: Block = {
  slug: 'accordionBlock',
  interfaceName: 'AccordionBlockProps',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Accordion Content',
          fields: [
            {
              type: 'array',
              name: 'accordionContent',
              label: false,
              labels: {
                singular: 'Item',
                plural: 'Items',
              },
              minRows: 1,
              fields: [
                {
                  type: 'text',
                  name: 'title',
                  required: true,
                },
                {
                  type: 'richText',
                  name: 'content',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Options',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'container',
                  label: 'Container',
                  options: [
                    { value: 'card', label: 'Card' },
                    { value: 'none', label: 'None' },
                  ],
                  defaultValue: 'none',
                },
                {
                  type: 'select',
                  name: 'indexCounter',
                  label: 'Index Counter',
                  options: [
                    { value: 'true', label: 'Yes' },
                    { value: 'false', label: 'No' },
                  ],
                  defaultValue: 'false',
                },
              ],
            },
            GridAppearance(),
          ],
        },
      ],
    },
  ],
};
