import type { Block } from 'payload';

import { IntroEditor } from '@/lib/editor/intro';
import { GridAppearance } from '@/payload/fields/GridAppearance';
import { Link } from '@/payload/fields/Link';

export const RelatedProjectsBlock: Block = {
  slug: 'relatedProjectsBlock',
  interfaceName: 'RelatedProjectsBlockProps',
  labels: {
    singular: 'Related Projects',
    plural: 'Related Projects',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Configuration',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'checkbox',
                  name: 'showIntro',
                  label: 'Show Intro',
                  defaultValue: true,
                  required: true,
                },
                {
                  type: 'checkbox',
                  name: 'showLink',
                  label: 'Show Link',
                  defaultValue: false,
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.showIntro,
                  },
                },
              ],
            },
            {
              type: 'richText',
              name: 'introContent',
              label: false,
              editor: IntroEditor,
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.showIntro,
              },
            },
            {
              type: 'collapsible',
              label: 'Link',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData.showLink,
              },
              fields: [Link()],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'relatedCollection',
                  label: 'Related Collection',
                  required: true,
                  options: [
                    { value: 'projects', label: 'Projects' },
                    { value: 'posts', label: 'Posts' },
                  ],
                },
                {
                  type: 'select',
                  name: 'relatedCategory',
                  label: 'Related Category',
                  required: true,
                  options: [
                    { value: 'branding', label: 'Branding' },
                    { value: 'digital', label: 'Digital' },
                    { value: 'marketing', label: 'Marketing' },
                    { value: 'print', label: 'Print' },
                    { value: 'graphic-design', label: 'Graphic Design' },
                  ],
                },
                {
                  type: 'number',
                  name: 'numberOfRelatedItems',
                  label: 'Number of Items',
                  required: true,
                  defaultValue: 3,
                  min: 1,
                  max: 4,
                },
              ],
            },
          ],
        },
        {
          label: 'Options',
          fields: [
            {
              type: 'text',
              name: 'className',
              label: 'Custom Class Name',
            },
            GridAppearance(),
          ],
        },
      ],
    },
  ],
};
