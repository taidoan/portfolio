import { Block } from 'payload';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const ArchiveBlock: Block = {
  slug: 'archiveBlock',
  labels: {
    singular: 'Archive',
    plural: 'Archives',
  },
  interfaceName: 'ArchiveBlockProps',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Options',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'data',
                  label: 'Collection To Show',
                  required: true,
                  options: [
                    { value: 'projects', label: 'Projects' },
                    { value: 'posts', label: 'Posts' },
                    { value: 'categories', label: 'Categories' },
                  ],
                  defaultValue: 'projects',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'relationship',
                  name: 'categoriesToArchive',
                  label: 'Categories to Archive',
                  required: true,
                  relationTo: 'categories',
                  hasMany: true,
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) => siblingData.data === 'categories',
                  },
                },
                {
                  type: 'checkbox',
                  name: 'showFilter',
                  label: 'Show Filter',
                  defaultValue: true,
                  required: true,
                  admin: {
                    style: {
                      justifyContent: 'center',
                    },
                  },
                },
                {
                  type: 'checkbox',
                  name: 'filterShowAllButton',
                  label: 'Show All Button',
                  defaultValue: true,
                  required: true,
                  admin: {
                    style: {
                      justifyContent: 'center',
                    },
                    condition: (_, siblingData) => siblingData.showFilter,
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  type: 'select',
                  name: 'viewType',
                  label: 'View Type',
                  required: true,
                  options: [
                    { value: 'list', label: 'List' },
                    { value: 'grid', label: 'Grid' },
                  ],
                  defaultValue: 'grid',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  type: 'number',
                  name: 'numberOfProjects',
                  label: 'Number of Projects',
                  defaultValue: 6,
                  required: true,
                  admin: {
                    width: '50%',
                  },
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
