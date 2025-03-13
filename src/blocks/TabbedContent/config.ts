import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';
import { Link } from '@/fields/Link';

export const TabbedContentBlock: Block = {
  slug: 'tabbedContentBlock',
  interfaceName: 'TabbedContentBlockProps',
  labels: {
    singular: 'Tabbed Content',
    plural: 'Tabbed Contents',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'select',
              name: 'contentType',
              label: 'Content Type',
              options: [
                { value: 'custom', label: 'Custom' },
                { value: 'services', label: 'Services' },
              ],
            },
            {
              type: 'array',
              name: 'content',
              label: 'Tabs',
              labels: {
                singular: 'Tab',
                plural: 'Tabs',
              },
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.contentType === 'custom';
                },
              },
              fields: [
                {
                  type: 'text',
                  name: 'title',
                },

                {
                  type: 'richText',
                  name: 'description',
                },
                {
                  type: 'group',
                  name: 'link',
                  label: 'Link',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'type',
                          type: 'radio',
                          admin: {
                            layout: 'horizontal',
                            width: '50%',
                          },
                          options: [
                            {
                              label: 'Internal',
                              value: 'reference',
                            },
                            {
                              label: 'Custom URL',
                              value: 'custom',
                            },
                          ],
                          hooks: {
                            beforeValidate: [
                              ({ value, siblingData }) => {
                                if (value === 'reference') {
                                  if (siblingData?.url) delete siblingData.url;
                                } else if (value === 'custom') {
                                  if (siblingData?.reference) delete siblingData.reference;
                                }
                                return value;
                              },
                            ],
                          },
                        },
                        {
                          name: 'newTab',
                          type: 'checkbox',
                          admin: {
                            style: {
                              alignSelf: 'flex-end',
                            },
                            width: '50%',
                          },
                          label: 'Open in new tab',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'reference',
                          type: 'relationship',
                          admin: {
                            condition: (_, siblingData) => siblingData.type === 'reference',
                            width: '50%',
                          },
                          relationTo: ['pages', 'projects', 'services', 'posts', 'categories'],
                          label: 'Document to link to',
                        },
                        {
                          name: 'url',
                          type: 'text',
                          admin: {
                            condition: (_, siblingData) => siblingData.type === 'custom',
                            width: '50%',
                          },
                          label: 'URL',
                        },
                        {
                          name: 'label',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'Label',
                        },
                      ],
                    },
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'color',
                          type: 'select',
                          options: [
                            { value: 'primary', label: 'Primary' },
                            { value: 'secondary', label: 'Secondary' },
                            { value: 'accent', label: 'Accent' },
                            { value: 'sage', label: 'Sage' },
                            { value: 'slate', label: 'Slate' },
                            { value: 'bittersweet', label: 'Bittersweet' },
                          ],
                          defaultValue: 'secondary',
                          label: 'Color',
                          admin: {
                            width: '33%',
                          },
                        },
                        {
                          type: 'select',
                          name: 'buttonShadow',
                          label: 'Button Shadow',
                          options: [
                            { label: 'None', value: 'none' },
                            { label: 'Small', value: 'small' },
                            { label: 'Medium', value: 'medium' },
                            { label: 'Large', value: 'large' },
                          ],
                          defaultValue: 'none',
                          admin: {
                            width: '33%',
                          },
                        },
                        {
                          name: 'className',
                          type: 'text',
                          label: 'Class Name',
                          admin: {
                            width: '33%',
                          },
                        },
                      ],
                    },
                  ],
                },
                {
                  type: 'array',
                  name: 'items',
                  label: 'Items',
                  fields: [
                    {
                      type: 'text',
                      name: 'title',
                    },
                    {
                      type: 'richText',
                      name: 'description',
                    },
                    {
                      type: 'upload',
                      name: 'image',
                      relationTo: 'media',
                      label: 'Image',
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            GridAppearance(),
            {
              type: 'text',
              name: 'className',
              label: 'Custom Class Name',
            },
          ],
        },
      ],
    },
  ],
};
