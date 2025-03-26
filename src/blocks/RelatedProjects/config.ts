import { Block } from 'payload';
import { GridAppearance } from '@/fields/GridAppearance';

export const RelatedProjectsBlock: Block = {
  slug: 'relatedProjectsBlock',
  interfaceName: 'RelatedProjectsBlockProps',
  labels: {
    singular: 'Related Projects',
    plural: 'Related Projects',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'select',
          name: 'relatedCollection',
          label: 'Related Collection',
          required: true,
          options: [
            { value: 'projects', label: 'Projects' },
            { value: 'posts', label: 'Posts' },
          ],
        },
        {
          type: 'select',
          name: 'relatedCategory',
          label: 'Related Category',
          required: true,
          options: [
            { value: 'branding', label: 'Branding' },
            { value: 'digital', label: 'Digital' },
            { value: 'marketing', label: 'Marketing' },
            { value: 'print', label: 'Print' },
            { value: 'graphic-design', label: 'Graphic Design' },
          ],
        },
        {
          type: 'number',
          name: 'numberOfRelatedItems',
          label: 'Number of Items',
          required: true,
          defaultValue: 3,
          min: 1,
          max: 4,
        },
      ],
    },
    GridAppearance(),
  ],
};
