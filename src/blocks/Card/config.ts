import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';

export const CardBlock: Block = {
  slug: 'cardBlock',
  interfaceName: 'CardBlockProps',
  labels: {
    singular: 'Card',
    plural: 'Cards',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'relationTo',
          type: 'select',
          label: 'Card Type',
          options: [
            { value: 'default', label: 'Default' },
            { value: 'projects', label: 'Projects' },
            { value: 'services', label: 'Services' },
          ],
          defaultValue: 'default',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'relatedProject',
          type: 'relationship',
          relationTo: 'projects',
          label: 'Related Project',
          hasMany: false,
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.relationTo === 'projects';
            },
            width: '50%',
          },
        },
        {
          name: 'relatedService',
          type: 'relationship',
          relationTo: 'services',
          label: 'Related Service',
          hasMany: false,
          required: true,
          admin: {
            condition: (_, siblingData) => {
              return siblingData.relationTo === 'services';
            },
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'title',
                  label: 'Card Title',
                  admin: {
                    condition: (_, siblingData) => {
                      return siblingData.relationTo === 'default';
                    },
                    width: '50%',
                    description: 'The title of the card.',
                  },
                },
                {
                  type: 'select',
                  name: 'insideContainer',
                  label: 'Inner Container',
                  options: [
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                  ],
                  defaultValue: 'no',
                  admin: {
                    condition: (_, siblingData) => {
                      return siblingData.relationTo === 'default';
                    },
                    width: '50%',
                    description: 'Whether to use an inner container for the card content.',
                  },
                },
              ],
            },
            {
              name: 'content',
              type: 'richText',
              label: 'Card Content',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.relationTo === 'default';
                },
              },
            },
            {
              name: 'projectType',
              type: 'text',
              label: 'Project Type',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.relationTo === 'projects';
                },
                description:
                  '(Leave blank if you want to use the project type set in the project itself)',
              },
            },
            {
              name: 'serviceContent',
              type: 'richText',
              label: 'Service Content',
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.relationTo === 'services';
                },
                description:
                  '(Leave blank if you want to use the service description set in the service itself)',
              },
            },
            {
              name: 'cardImage',
              type: 'group',
              label: false,
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  relationTo: 'media',
                  label: 'Card Image',
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'imagePosition',
                      label: 'Image Position',
                      options: [
                        { value: 'inside', label: 'Inside' },
                        { value: 'outside', label: 'Outside' },
                      ],
                      defaultValue: 'inside',
                      admin: {
                        condition: (_, siblingData) => siblingData.image,
                        description: 'Position the image inside or outside the card content.',
                      },
                    },
                    {
                      type: 'select',
                      name: 'imageAlign',
                      label: 'Image Alignment',
                      options: [
                        { value: 'top', label: 'Top' },
                        { value: 'bottom', label: 'Bottom' },
                      ],
                      defaultValue: 'top',
                      admin: {
                        condition: (_, siblingData) => siblingData.imagePosition === 'inside',
                        description: 'Align the image at the top or bottom of the card content.',
                      },
                    },
                    {
                      name: 'imageBorderRadius',
                      type: 'select',
                      label: 'Image Border Radius',
                      options: [
                        { value: 'none', label: 'None' },
                        { value: 'top', label: 'Top' },
                        { value: 'bottom', label: 'Bottom' },
                        { value: 'left', label: 'Left' },
                        { value: 'right', label: 'Right' },
                        { value: 'all', label: 'All' },
                      ],
                      defaultValue: 'none',
                      admin: {
                        condition: (_, siblingData) => siblingData.imagePosition === 'inside',
                        description: 'The border radius of the image.',
                      },
                    },
                  ],
                },
              ],
              admin: {
                condition: (_, siblingData) => {
                  return siblingData.relationTo === 'default';
                },
              },
            },
          ],
        },
        {
          label: 'Options',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'className',
                  label: 'Custom Class Name',
                  admin: { width: '50%' },
                },
                {
                  name: 'textAlign',
                  type: 'select',
                  label: 'Text Align',
                  options: [
                    { value: 'left', label: 'Left' },
                    { value: 'centered', label: 'Center' },
                    { value: 'right', label: 'Right' },
                  ],
                  defaultValue: 'left',
                  admin: { width: '50%' },
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
