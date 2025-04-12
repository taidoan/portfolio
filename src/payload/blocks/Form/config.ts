import type { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const FormBlock: Block = {
  slug: 'formBlock',
  labels: {
    singular: 'Form Block',
    plural: 'Form Blocks',
  },
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
    GridAppearance(),
  ],
};
