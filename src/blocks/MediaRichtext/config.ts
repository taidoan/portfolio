import { Block } from 'payload';

export const MediaRichtextBlock: Block = {
  slug: 'mediaRichtextBlock',
  interfaceName: 'MediaRichtextBlockProps',
  fields: [
    {
      type: 'upload',
      name: 'media',
      label: 'Media',
      relationTo: 'media',
      required: true,
    },
  ],
};
