import { Block } from 'payload';
import { DividerBlock } from '../Divider/config';
import { LinksBlock } from '../Links/config';
import { LinksGroupBlock } from '../Links/Group/config';
import { IntroBlock } from '../Intro/config';
import { MediaBlock } from '../Media/config';
import { CardBlock } from '../Card/config';
import { AccordionBlock } from '../Accordion/config';
import { CarouselBlock } from '../Carousel/config';
import { BioBlock } from '../Bio/config';

import { BlocksEditor } from '@/fields/Lexical/BlocksEditor';
import { BackgroundColour } from '@/fields/BackgroundColour';
import { BorderRadius } from '@/fields/BorderRadius';
import { ClassName } from '@/fields/ClassName';
import { SectionTypeField } from '@/fields/SectionType';
const Blocks = [
  DividerBlock,
  LinksBlock,
  LinksGroupBlock,
  IntroBlock,
  MediaBlock,
  CardBlock,
  AccordionBlock,
  CarouselBlock,
  BioBlock,
];

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
              admin: {
                style: {
                  marginBottom: '1rem',
                },
              },
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
