import { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const DividerBlock: Block = {
  interfaceName: 'DividerBlockProps',
  slug: 'divider',
  labels: {
    singular: 'Divider',
    plural: 'Dividers',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          label: 'Divider Type',
          options: [
            { label: 'Content', value: 'content' },
            { label: 'Section', value: 'section' },
          ],
          defaultValue: 'content',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'weight',
          type: 'select',
          label: 'Weight',
          options: [
            { label: 'Minimal', value: 'minimal' },
            { label: 'Thin', value: 'thin' },
            { label: 'Thick', value: 'thick' },
          ],
          defaultValue: 'thin',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'width',
          type: 'select',
          label: 'Width',
          options: [
            { label: 'Full Width', value: 'full' },
            { label: 'Default', value: 'default' },
            { label: 'Half', value: 'half' },
          ],
          defaultValue: 'default',
          admin: {
            width: '25%',
          },
        },
        {
          name: 'centered',
          type: 'checkbox',
          label: 'Centered',
          admin: {
            width: '25%',
            style: {
              alignSelf: 'center',
              justifyContent: 'end',
              justifySelf: 'end',
            },
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'color',
          type: 'select',
          label: 'Color',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Accent', value: 'accent' },
            { label: 'Light Grey', value: 'light-grey' },
          ],
          defaultValue: 'primary',
          admin: {
            width: '33%',
          },
        },
        {
          name: 'opacity',
          type: 'number',
          label: 'Opacity',
          defaultValue: 0.5,
          admin: {
            width: '33%',
          },
        },
        {
          name: 'className',
          type: 'text',
          label: 'Custom Class Name',
          admin: {
            width: '33%',
          },
        },
      ],
    },
    GridAppearance(),
  ],
};
