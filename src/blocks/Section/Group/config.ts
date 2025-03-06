import { Block } from 'payload';
import { SectionBlock } from '@/blocks/Section/config';
import { DividerBlock } from '@/blocks/Divider/config';

import { ClassName } from '@/fields/ClassName';
import { SectionTypeField } from '@/fields/SectionType';
import { BackgroundColour } from '@/fields/BackgroundColour';

export const SectionGroupBlock: Block = {
  slug: 'sectionGroup',
  interfaceName: 'SectionGroupBlockProps',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'sectionBlocks',
              type: 'blocks',
              label: 'Blocks',
              blocks: [SectionBlock, DividerBlock],
            },
          ],
        },
        {
          label: 'Options',
          fields: [
            {
              name: 'appearance',
              type: 'group',
              label: false,
              fields: [
                SectionTypeField,
                BackgroundColour({
                  admin: {
                    width: '50%',
                    condition: (_, siblingData) => siblingData.sectionType !== 'default',
                  },
                  hooks: {
                    beforeValidate: [
                      ({ value, siblingData }) => {
                        if (siblingData.sectionType === 'default') {
                          return (value = 'none');
                        } else {
                          return value;
                        }
                      },
                    ],
                  },
                }),
              ],
            },
            {
              type: 'row',
              fields: [...ClassName()],
            },
          ],
        },
      ],
    },
  ],
};
