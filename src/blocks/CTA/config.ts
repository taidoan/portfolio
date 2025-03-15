import { Block } from 'payload';
import { Link } from '@fields/Link';

export const CTABlock: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlockProps',
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
              required: true,
            },
            Link({
              linkOverrides: {
                admin: {
                  position: 'sidebar',
                },
              },
            }),
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
                  name: 'variant',
                  label: 'Variant',
                  options: [
                    { label: 'Fill', value: 'fill' },
                    { label: 'Outlined', value: 'outlined' },
                    { label: 'Outlined Thick', value: 'outlined-thick' },
                  ],
                  defaultValue: 'fill',
                },
                {
                  type: 'select',
                  name: 'color',
                  label: 'Color',
                  options: [
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Accent', value: 'accent' },
                    { label: 'Light', value: 'light' },
                    { label: 'Gradient Primary', value: 'gradient-primary' },
                    { label: 'Gradient Secondary', value: 'gradient-secondary' },
                    { label: 'Gradient Accent', value: 'gradient-accent' },
                    { label: 'Gradient Light', value: 'gradient-light' },
                  ],
                  defaultValue: 'secondary',
                },
                {
                  type: 'select',
                  name: 'borderRadius',
                  label: 'Border Radius',
                  options: [
                    { label: 'None', value: 'none' },
                    { label: 'Small', value: 'small' },
                    { label: 'Medium', value: 'medium' },
                    { label: 'Large', value: 'large' },
                  ],
                  defaultValue: 'medium',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
