import type { RowField } from 'payload';
import { BackgroundColour } from '@/fields/BackgroundColour';
import { BorderRadius } from '@/fields/BorderRadius';
import { BlockVariant } from '@/fields/BlockVariant';
import { Link } from '@fields/Link';

export const CTAFields = (): RowField => {
  const row: RowField = {
    type: 'row',
    fields: [
      {
        type: 'richText',
        name: 'ctaContent',
        label: 'Content',
        admin: {
          description: 'The content to display in the CTA.',
        },
      },
      Link({
        linkOverrides: {
          label: 'Link',
          name: 'ctaLink',
          admin: {
            description: 'The link to display in the CTA.',
            hideGutter: true,
          },
        },
      }),
      {
        type: 'group',
        name: 'ctaAppearance',
        label: 'Appearance',
        admin: {
          description: 'Customize the appearance of the CTA.',
          hideGutter: true,
        },
        fields: [
          {
            type: 'row',
            fields: [BlockVariant(), BackgroundColour(), BorderRadius()],
          },
        ],
      },
    ],
  };

  return row;
};
