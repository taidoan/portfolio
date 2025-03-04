import { Block } from 'payload';
import { DividerBlock } from '../Divider/config';
import { LinksBlock } from '../Links/config';
import { LinksGroupBlock } from '../Links/Group/config';
import { IntroBlock } from '../Intro/config';

import { BlocksEditor } from '@/fields/Lexical/BlocksEditor';
import { BackgroundColour } from '@/fields/BackgroundColour';
import { BorderRadius } from '@/fields/BorderRadius';

const Blocks = [DividerBlock, LinksBlock, LinksGroupBlock, IntroBlock];

export const SectionBlock: Block = {
  slug: 'section',
  interfaceName: 'SectionBlockProps',
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
              blocks: Blocks,
              admin: {
                condition: (_, siblingData) => {
                  if (siblingData.appearance?.sectionType === 'boxed') {
                    return false;
                  }
                  return true;
                },
              },
            },
            {
              name: 'boxedContent',
              label: 'Content',
              type: 'richText',
              editor: BlocksEditor,
              admin: {
                condition: (_, siblingData) => {
                  if (siblingData.appearance?.sectionType === 'boxed') {
                    return true;
                  }
                  return false;
                },
              },
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
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'sectionType',
                      type: 'select',
                      label: 'Section Type',
                      options: [
                        { value: 'default', label: 'Default' },
                        { value: 'boxed', label: 'Boxed' },
                        { value: 'full-width', label: 'Full Width' },
                      ],
                      defaultValue: 'default',
                      admin: {
                        description:
                          'The layout of the section, you can choose between default, boxed, and full-width.',
                        width: '50%',
                      },
                    },
                    BackgroundColour({
                      admin: {
                        width: '50%',
                        condition: (_, siblingData) => {
                          if (siblingData.sectionType !== 'default') {
                            return true;
                          } else {
                            return false;
                          }
                        },
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
                  admin: {
                    condition: (_, siblingData) => {
                      if (siblingData.sectionType === 'boxed') {
                        return true;
                      } else {
                        return false;
                      }
                    },
                  },
                  fields: [
                    {
                      type: 'select',
                      name: 'alignContent',
                      label: 'Align Content',
                      options: [
                        { value: 'left', label: 'Left' },
                        { value: 'right', label: 'Right' },
                      ],
                      defaultValue: 'left',
                      admin: {
                        width: '50%',
                      },
                    },
                    BorderRadius({
                      admin: { width: '50%' },
                    }),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
