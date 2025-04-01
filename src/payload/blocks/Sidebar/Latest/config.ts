import { Block } from 'payload';

export const SidebarLatestBlock: Block = {
  slug: 'sidebarLatestBlock',
  interfaceName: 'SidebarLatestBlockProps',
  labels: {
    singular: 'Latest Posts',
    plural: 'Latest Posts',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      defaultValue: 'Latest',
    },
    {
      type: 'number',
      name: 'numberOfPosts',
      label: 'Number of Posts',
      required: true,
      defaultValue: 4,
      min: 2,
      max: 8,
    },
  ],
};
