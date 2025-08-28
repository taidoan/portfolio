import { Block } from 'payload';
import { Link } from '@/payload/fields/Link';
import { BorderRadius } from '@/payload/fields/BorderRadius';
import { BackgroundColour } from '@/payload/fields/BackgroundColour';
import { BlockVariant } from '@/payload/fields/BlockVariant';

export const CTABlock: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlockProps',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'richText',
              name: 'content',
              required: true,
            },
            Link({
              linkOverrides: {
                admin: {
                  position: 'sidebar',
                },
              },
            }),
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              type: 'row',
              fields: [BlockVariant(), BackgroundColour(), BorderRadius()],
            },
          ],
        },
      ],
    },
  ],
};
