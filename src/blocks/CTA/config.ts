import { Block } from 'payload';
import { Link } from '@fields/Link';
import { BorderRadius } from '@/fields/BorderRadius';
import { BackgroundColour } from '@/fields/BackgroundColour';
import { BlockVariant } from '@/fields/BlockVariant';

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
