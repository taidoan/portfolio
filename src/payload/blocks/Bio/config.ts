import { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const BioBlock: Block = {
  slug: 'bioBlock',
  interfaceName: 'BioBlockProps',
  labels: {
    singular: 'Bio',
    plural: 'Bios',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Items',
          fields: [
            {
              type: 'array',
              name: 'items',
              unique: true,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'label',
                      label: 'Label',
                      unique: true,
                      options: [
                        { value: 'location', label: 'Location' },
                        { value: 'education', label: 'Education' },
                        { value: 'email', label: 'Email' },
                      ],
                    },
                    {
                      type: 'text',
                      name: 'value',
                      label: 'Value',
                      required: true,
                      admin: {
                        condition: (_, siblingData) => {
                          if (siblingData.label !== 'email') {
                            if (siblingData.link) delete siblingData.link;
                            return true;
                          } else {
                            return false;
                          }
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'link',
                  type: 'group',
                  label: '',
                  admin: {
                    condition: (_, siblingData) => {
                      if (siblingData.label === 'email') {
                        return true;
                      } else {
                        return false;
                      }
                    },
                    hideGutter: true,
                  },
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
                          relationTo: ['pages', 'projects'],
                          label: 'Document to link to',
                          required: true,
                        },
                        {
                          name: 'url',
                          type: 'text',
                          admin: {
                            condition: (_, siblingData) => siblingData.type === 'custom',
                            width: '50%',
                          },
                          label: 'URL',
                          required: true,
                        },
                        {
                          name: 'label',
                          type: 'text',
                          admin: {
                            width: '50%',
                          },
                          label: 'Label',
                          required: true,
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Appearance',
          fields: [GridAppearance()],
        },
      ],
    },
  ],
};
