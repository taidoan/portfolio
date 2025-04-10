import { Block } from 'payload';

export const SidebarSearchBlock: Block = {
  slug: 'sidebarSearchBlock',
  interfaceName: 'SidebarSearchBlockProps',
  labels: {
    singular: 'Search',
    plural: 'Searches',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
    },
  ],
};
