import type { Block } from 'payload';

export const ContactMethodsBlock: Block = {
  slug: 'contactMethodsBlock',
  interfaceName: 'ContactMethodsBlockProps',
  labels: {
    singular: 'Contact Methods',
    plural: 'Contact Methods',
  },
  fields: [
    {
      type: 'array',
      name: 'contactMethods',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'select',
              name: 'platform',
              label: 'Platform',
              options: [
                { label: 'Email', value: 'email' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'GitHub', value: 'github' },
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'YouTube', value: 'youtube' },
              ],
              defaultValue: 'email',
              unique: true,
            },
            {
              type: 'text',
              name: 'link',
              label: 'Link',
              admin: {
                width: '33%',
              },
            },
            {
              type: 'text',
              name: 'label',
              label: 'Label',
              required: true,
              admin: {
                width: '33%',
              },
            },
          ],
        },
      ],
    },
  ],
};
