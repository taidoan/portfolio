import { Block } from 'payload';

export const SidebarTagsBlock: Block = {
  slug: 'sidebarTagsBlock',
  interfaceName: 'SidebarTagsBlockProps',
  labels: {
    singular: 'Tags',
    plural: 'Tags',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      defaultValue: 'Tags',
    },
  ],
};
