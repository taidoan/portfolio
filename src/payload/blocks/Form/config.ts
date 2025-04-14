import type { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';
import { BackgroundColour } from '@/payload/fields/BackgroundColour';
import { BorderRadius } from '@/payload/fields/BorderRadius';

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Form',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'form',
                  type: 'relationship',
                  relationTo: 'forms',
                  required: true,
                  admin: {
                    description: 'Select the form to be displayed.',
                    width: '50%',
                  },
                },
                {
                  name: 'customClassName',
                  type: 'text',
                  label: 'Custom Class Name',
                  admin: {
                    description: 'Add a custom class to the form field.',
                    width: '50%',
                  },
                },
              ],
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
                    { label: 'None', value: 'none' },
                    { label: 'Boxed', value: 'boxed' },
                  ],
                  defaultValue: 'none',
                },
                BackgroundColour({
                  admin: {
                    condition: (_, siblingData) => siblingData.container !== 'none',
                    width: '33%',
                  },
                }),
                BorderRadius({
                  admin: {
                    condition: (_, siblingData) => siblingData.container !== 'none',
                    width: '33%',
                  },
                }),
              ],
            },
            GridAppearance(),
          ],
        },
      ],
    },
  ],
};
