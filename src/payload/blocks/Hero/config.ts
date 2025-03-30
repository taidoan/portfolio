import { Field } from 'payload';
import { BlocksEditor } from '@/payload/fields/Lexical/BlocksEditor';
import { BreadCrumbs } from '@/payload/fields/Breadcrumbs';
import type { CollectionSlug } from 'payload';

interface HeroProps {
  breadcrumbRelation?: CollectionSlug[];
}

export const Hero = ({ breadcrumbRelation = ['pages'] }: HeroProps): Field => {
  return {
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
                type: 'select',
                name: 'heroStyle',
                label: 'Style',
                options: [
                  { value: 'default', label: 'Default' },
                  { value: 'lowImpact', label: 'Low Impact' },
                ],
                defaultValue: 'default',
              },
              {
                type: 'row',
                admin: {
                  condition: (_, siblingData) => siblingData.heroStyle === 'default',
                },
                fields: [
                  {
                    name: 'type',
                    label: 'Hero Size',
                    type: 'select',
                    defaultValue: 'large',
                    options: [
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
                admin: {
                  condition: (_, siblingData) => siblingData.heroStyle === 'default',
                },
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
                relationTo: breadcrumbRelation,
              }),
            ],
          },
        ],
      },
    ],
  };
};
