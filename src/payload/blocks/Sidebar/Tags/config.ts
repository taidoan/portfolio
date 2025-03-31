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
    {
      type: 'number',
      name: 'tagsToShow',
      label: 'Tags to Show',
      required: true,
      defaultValue: 8,
      min: 1,
      max: 12,
    },
  ],
};
