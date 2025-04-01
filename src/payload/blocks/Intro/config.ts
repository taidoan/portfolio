import { IntroEditor } from '@/lib/editor/intro';
import { GridAppearance } from '@/payload/fields/GridAppearance';
import { Block } from 'payload';

export const IntroBlock: Block = {
  slug: 'introBlock',
  interfaceName: 'IntroBlockProps',
  labels: {
    singular: 'Intro',
    plural: 'Intros',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'introContent',
              type: 'richText',
              label: false,
              editor: IntroEditor,
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
                  name: 'textAlign',
                  type: 'select',
                  label: 'Text Align',
                  options: [
                    { label: 'Left', value: 'left' },
                    { label: 'Center', value: 'center' },
                    { label: 'Right', value: 'right' },
                  ],
                  defaultValue: 'center',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'blockName',
                  type: 'text',
                  label: 'Custom Class Name',
                  admin: {
                    width: '50%',
                  },
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
