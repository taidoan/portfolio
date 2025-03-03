import { Field } from 'payload';
import { BlocksEditor } from '@/fields/Lexical/BlocksEditor';
import { DividerBlock } from '../Divider/config';
import { LinksBlockRichtext } from '../LinkRichtext/config';
import { LinksGroupRichtextBlock } from '../LinkRichtext/Group/config';

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
      type: 'row',
      fields: [
        {
          name: 'image',
          type: 'upload',
          label: 'Background Image',
          relationTo: 'media',
          admin: {
            width: '50%',
          },
        },
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
            style: {
              height: '100%',
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
          },
        },
      ],
    },
    {
      name: 'richText',
      type: 'richText',
      editor: BlocksEditor,
      required: true,
      label: false,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'checkbox',
          name: 'showBreadcrumb',
          label: 'Show Breadcrumb',
          defaultValue: true,
          admin: {
            width: '33.3333%',
            style: {
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
          },
        },
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
            width: '33.3333%',
            condition: (_, siblingData) => siblingData.showBreadcrumb === true,
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
            width: '33.3333%',
            condition: (_, siblingData) =>
              siblingData.showBreadcrumb === true && siblingData.breadcrumbContainer === 'boxed',
          },
        },
      ],
    },
  ],
};
