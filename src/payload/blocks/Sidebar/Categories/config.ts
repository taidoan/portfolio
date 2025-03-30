import { Block } from 'payload';

export const SidebarCategoriesBlock: Block = {
  slug: 'sidebarCategoriesBlock',
  interfaceName: 'SidebarCategoriesBlockProps',
  labels: {
    singular: 'Categories',
    plural: 'Categories',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      required: true,
      defaultValue: 'Categories',
    },
    {
      type: 'checkbox',
      name: 'showSubCategories',
      label: 'Show Sub Categories',
      defaultValue: true,
      required: true,
    },
  ],
};
