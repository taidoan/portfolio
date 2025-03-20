import { Field } from 'payload';
import { BlocksEditor } from '@/fields/Lexical/BlocksEditor';
import { BreadCrumbs } from '@/fields/Breadcrumbs';

export const Hero: Field = {
  name: 'hero',
  type: 'group',
  label: false,
  interfaceName: 'HeroBlockProps',
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      type: 'tabs',
      admin: {
        style: {
          height: '50%',
          backgroundColor: 'red',
        },
      },
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'richText',
              type: 'richText',
              editor: BlocksEditor,
              required: true,
              label: false,
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
                  name: 'type',
                  label: 'Hero Size',
                  type: 'select',
                  defaultValue: 'large',
                  options: [
                    { value: 'small', label: 'Small' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'large', label: 'Large' },
                  ],
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'blurredBackground',
                  label: 'Blurred Background',
                  type: 'select',
                  defaultValue: 'false',
                  options: [
                    { value: 'true', label: 'Yes' },
                    { value: 'false', label: 'No' },
                  ],
                  required: true,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'image',
              type: 'upload',
              label: 'Background Image',
              relationTo: 'media',
            },
          ],
        },
        {
          label: 'Breadcrumbs',
          fields: [
            {
              name: 'showBreadcrumb',
              type: 'select',
              label: 'Show Breadcrumb',
              options: [
                { value: 'true', label: 'Yes' },
                { value: 'false', label: 'No' },
              ],
              defaultValue: 'true',
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'breadcrumbContainer',
                  label: 'Breadcrumb Container',
                  options: [
                    { value: 'none', label: 'None' },
                    { value: 'boxed', label: 'Boxed' },
                  ],
                  defaultValue: 'boxed',
                  admin: {
                    condition: (_, siblingData) => siblingData.showBreadcrumb === 'true',
                    width: '50%',
                  },
                },
                {
                  type: 'select',
                  name: 'breadcrumbBackground',
                  label: 'Breadcrumb Background',
                  options: [
                    { value: 'none', label: 'None' },
                    { value: 'light', label: 'Light' },
                    { value: 'dark', label: 'Dark' },
                    { value: 'translucent', label: 'Translucent' },
                  ],
                  defaultValue: 'translucent',
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) =>
                      siblingData.showBreadcrumb === 'true' &&
                      siblingData.breadcrumbContainer === 'boxed',
                  },
                },
              ],
            },
            BreadCrumbs({
              admin: {
                condition: (_, siblingData) => siblingData.showBreadcrumb === 'true',
              },
            }),
          ],
        },
      ],
    },
  ],
};
