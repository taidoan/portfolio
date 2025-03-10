import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';

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
              type: 'select',
              name: 'data',
              label: 'Content',
              required: true,
              options: [
                { value: 'projects', label: 'Projects' },
                { value: 'services', label: 'Services' },
              ],
              defaultValue: 'projects',
            },
            {
              type: 'checkbox',
              name: 'filterShowAllButton',
              label: 'Show All Button',
              defaultValue: true,
              required: true,
            },
            {
              type: 'select',
              name: 'viewType',
              label: 'View Type',
              required: true,
              options: [
                { value: 'list', label: 'List' },
                { value: 'gallery', label: 'Gallery' },
              ],
              defaultValue: 'gallery',
            },
            {
              type: 'number',
              name: 'numberOfProjects',
              label: 'Number of Projects',
              defaultValue: 6,
              required: true,
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
