import type { CollectionConfig } from 'payload';
import { authenticated, anyone } from '@/payload/access';
import { revalidateCategory, revalidateDelete } from './hooks/revalidateCategory';
import { BlocksEditor } from '@fields/Lexical/BlocksEditor';
import { SlugField } from '@fields/Slug';
import { BreadCrumbs } from '@fields/Breadcrumbs';
import { CTAFields } from '@fields/CTAFields';
import { ArchiveBlock } from '@blocks/Archive/config';

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'description', 'parentCategory'],
  },
  timestamps: false,
  hooks: {
    afterChange: [revalidateCategory],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      index: true,
      label: 'Category Name',
      required: true,
      unique: true,
      admin: {
        description: 'Enter a name for the category. This must be unique.',
      },
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      index: true,
      admin: {
        description:
          'Enter a short one sentence description for the category. This will appear on the categories list page.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description:
          'Enter a longer description for the category. This will appear on the actual category page.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'heroContent',
              type: 'richText',
              label: 'Hero Content',
              editor: BlocksEditor,
            },
            {
              type: 'group',
              name: 'breadcrumb',
              label: 'Breadcrumbs',
              admin: {
                description:
                  'The breadcrumbs for the category. These breadcrumbs will appear at the top of the page.',
              },
              fields: [
                {
                  type: 'select',
                  name: 'breadcrumbContainer',
                  label: 'Breadcrumb Container',
                  options: [
                    { value: 'none', label: 'None' },
                    { value: 'boxed', label: 'Boxed' },
                    { value: 'outlined', label: 'Outlined' },
                  ],
                  defaultValue: 'outlined',
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
                  required: true,
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) =>
                      siblingData.breadcrumbContainer !== 'none' &&
                      siblingData.breadcrumbContainer !== 'outlined' &&
                      siblingData.breadcrumbContainer === 'boxed',
                  },
                },
                {
                  type: 'select',
                  name: 'breadcrumbOutlineColor',
                  label: 'Breadcrumb Outline Color',
                  options: [
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'accent', label: 'Accent' },
                    { value: 'urban-steel', label: 'Urban Steel' },
                    { value: 'slate', label: 'Slate' },
                    { value: 'light-grey', label: 'Light Grey' },
                  ],
                  defaultValue: 'urban-steel',
                  required: true,
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) =>
                      siblingData.breadcrumbContainer !== 'none' &&
                      siblingData.breadcrumbContainer !== 'boxed' &&
                      siblingData.breadcrumbContainer === 'outlined',
                  },
                },
                BreadCrumbs({
                  relationTo: ['pages', 'categories'],
                }),
              ],
            },
          ],
        },
        {
          label: 'Archive',
          fields: [
            {
              type: 'blocks',
              name: 'layout',
              blocks: [ArchiveBlock],
              defaultValue: 'archiveBlock',
              minRows: 1,
              maxRows: 1,
              label: false,
              labels: {
                singular: 'Archive',
                plural: 'Archives',
              },
              admin: {
                initCollapsed: false,
              },
            },
          ],
        },
        {
          label: 'CTA',
          fields: [CTAFields()],
        },
      ],
    },
    ...SlugField('title'),
    {
      name: 'parentCategory',
      type: 'relationship',
      relationTo: 'categories',
      label: 'Parent Category',
      admin: {
        position: 'sidebar',
      },
      index: true,
      maxDepth: 0,
    },
  ],
};
