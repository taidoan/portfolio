import type { Block } from 'payload';

import { ContentEditor } from '@/lib/editor/content';

export const ColumnsBlock: Block = {
  slug: 'columnsBlock',
  interfaceName: 'ColumnsBlockProps',
  labels: {
    singular: 'Column Layout',
    plural: 'Column Layout',
  },
  fields: [
    {
      type: 'array',
      name: 'columns',
      label: false,
      labels: {
        singular: 'Column',
        plural: 'Columns',
      },
      maxRows: 3,
      admin: {
        description: 'Add up to a maximum of 3 column layout.',
      },
      fields: [
        {
          type: 'richText',
          name: 'content',
          editor: ContentEditor,
        },
      ],
    },
  ],
};
