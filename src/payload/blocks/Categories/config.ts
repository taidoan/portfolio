import type { Block } from 'payload';

export const CategoryLinks: Block = {
  slug: 'categoryLinks',
  interfaceName: 'categoryLinksProps',
  labels: {
    singular: 'Category Links',
    plural: 'Category Links',
  },
  fields: [
    {
      type: 'select',
      name: 'category',
      label: 'Category',
      admin: {
        description: 'Choose wether you want to display all categories or a custom selection.',
      },
      options: [
        { value: 'all', label: 'All' },
        { value: 'custom', label: 'Custom' },
      ],
      defaultValue: 'all',
      required: true,
    },
    {
      type: 'relationship',
      name: 'categorySelect',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categories Select',
      admin: {
        description: 'Select the categories you want to display.',
        condition: (_, siblingData) => siblingData.category === 'custom',
      },
      required: true,
      maxRows: 12,
    },
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'mobileView',
          label: 'Mobile View',
          admin: {
            description:
              'Select the method for displaying the categories. Please note this is for mobile only, desktop will be displayed in a grid.',
            width: '50%',
          },
          options: [
            { value: 'carousel', label: 'Carousel' },
            { value: 'grid', label: 'Grid' },
          ],
          defaultValue: 'carousel',
          required: true,
        },
        {
          type: 'text',
          name: 'customClassName',
          label: 'Custom Class Name',
          admin: {
            description: 'Enter a custom class name for the category links block.',
            width: '50%',
          },
        },
      ],
    },
  ],
};
