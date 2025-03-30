import { Block } from 'payload';
import { CardBlock } from '@/payload/blocks/Card/config';
import { MediaBlock } from '@/payload/blocks/Media/config';
import { GridAppearance } from '@/payload/fields/GridAppearance';

export const CarouselBlock: Block = {
  slug: 'carouselBlock',
  interfaceName: 'CarouselBlockProps',
  labels: {
    singular: 'Carousel',
    plural: 'Carousels',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Items',
          fields: [
            {
              name: 'carouselItems',
              labels: {
                singular: 'Item',
                plural: 'Items',
              },
              type: 'blocks',
              blocks: [CardBlock, MediaBlock],
            },
          ],
        },
        {
          label: 'Options',
          fields: [
            {
              type: 'group',
              name: 'carouselConfig',
              label: false,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'checkbox',
                      name: 'autoHeight',
                      label: 'Auto Height',
                      defaultValue: false,
                      required: true,
                    },
                    {
                      type: 'checkbox',
                      name: 'autoPlay',
                      label: 'Auto Play',
                      defaultValue: false,
                      required: true,
                    },
                    {
                      type: 'checkbox',
                      name: 'keyboardControls',
                      label: 'Keyboard Controls',
                      defaultValue: false,
                      required: true,
                    },
                    {
                      type: 'checkbox',
                      name: 'buttonNavigation',
                      label: 'Button Navigation',
                      defaultValue: false,
                      required: true,
                    },
                    {
                      type: 'checkbox',
                      name: 'pagination',
                      label: 'Pagination',
                      defaultValue: false,
                      required: true,
                    },
                    {
                      type: 'checkbox',
                      name: 'loop',
                      label: 'Loop',
                      defaultValue: false,
                      required: true,
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'select',
                      name: 'direction',
                      label: 'Direction',
                      options: [
                        { value: 'horizontal', label: 'Horizontal' },
                        { value: 'vertical', label: 'Vertical' },
                      ],
                      defaultValue: 'horizontal',
                      required: true,
                    },
                    {
                      type: 'checkbox',
                      name: 'focus',
                      label: 'Focus',
                      defaultValue: false,
                      required: true,
                      admin: {
                        condition: (_, siblingData) => {
                          return siblingData.direction === 'vertical';
                        },
                      },
                    },
                    {
                      type: 'select',
                      name: 'paginationType',
                      label: 'Pagination Type',
                      options: [
                        { value: 'bullets', label: 'Bullets' },
                        { value: 'progress', label: 'Progress' },
                      ],
                      defaultValue: 'bullets',
                      required: true,
                      admin: {
                        condition: (_, siblingData) => {
                          return siblingData.pagination;
                        },
                      },
                    },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'number',
                      name: 'slideSpacing',
                      label: 'Slide Spacing',
                      defaultValue: 16,
                      required: true,
                      admin: {
                        description: 'The spacing between slides in pixels.',
                      },
                    },
                    {
                      type: 'number',
                      name: 'slidesPerView',
                      label: 'Slides Per View',
                      defaultValue: 1,
                      required: true,
                      max: 4,
                      min: 1,
                      admin: {
                        description: 'The number of slides to show at a time.',
                      },
                    },
                    {
                      type: 'select',
                      name: 'slidesToScroll',
                      label: 'Slides To Scroll',
                      defaultValue: 'auto',
                      required: true,
                      options: [
                        { value: 'auto', label: 'Auto' },
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                        { value: '3', label: '3' },
                        { value: '4', label: '4' },
                      ],
                      admin: {
                        description: 'The number of slides to scroll at a time.',
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              name: 'carouselClassNames',
              label: 'Class Names',
              admin: {
                hideGutter: true,
                description:
                  'You can change the class names for the carousel. This is especially useful if you are using a CSS framework like Tailwind or BEM naming conventions. It is also helpful if you want to easily style the carousel disabled state with CSS.',
              },

              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      type: 'text',
                      name: 'container',
                      label: 'Container',
                    },
                    {
                      type: 'text',
                      name: 'wrapper',
                      label: 'Wrapper',
                    },
                    {
                      type: 'text',
                      name: 'slide',
                      label: 'Slide',
                    },
                  ],
                },
              ],
            },
            GridAppearance(),
          ],
        },
        {
          label: 'Responsive',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'checkbox',
                  name: 'responsive',
                  label: 'Responsive Mode',
                  admin: {
                    description:
                      'Enable responsive mode to disable the carousel at  a certain breakpoint. This is useful if you want to use the carousel on smaller screens but still want to have the ability to navigate through the slides.',
                    width: '50%',
                  },
                  hooks: {
                    beforeValidate: [
                      ({ value, siblingData }) => {
                        if (value === false) {
                          if (siblingData.breakpointSelection)
                            delete siblingData.breakpointSelection;
                        }
                      },
                    ],
                  },
                },
                {
                  name: 'breakpointSelection',
                  type: 'text',
                  required: true,
                  admin: {
                    condition: (_, siblingData) => siblingData.responsive === true,
                    components: {
                      Field: '@/fields/Breakpoints/index#BreakpointComponent',
                    },
                  },
                },
              ],
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData.responsive === true,
              },
              fields: [
                {
                  type: 'select',
                  name: 'gridColumns',
                  label: 'Grid Columns',
                  admin: {
                    description: 'What it the size of the grid?',
                    width: '50%',
                    readOnly: true,
                  },
                  options: [
                    { value: '1', label: '1 Column' },
                    { value: '2', label: '2 Columns' },
                    { value: '3', label: '3 Columns' },
                    { value: '4', label: '4 Columns' },
                    { value: '6', label: '6 Columns' },
                    { value: '8', label: '8 Columns' },
                    { value: '12', label: '12 Columns' },
                  ],
                  defaultValue: '12',
                  required: true,
                },
                {
                  type: 'select',
                  name: 'slideColumnSpan',
                  label: 'Slide Column Span',
                  admin: {
                    description: 'How many colummns should the slides span?',
                    width: '50%',
                  },
                  options: [
                    { value: '1', label: '1 Column' },
                    { value: '2', label: '2 Columns' },
                    { value: '3', label: '3 Columns' },
                    { value: '4', label: '4 Columns' },
                    { value: '6', label: 'Half (6 Columns)' },
                    { value: '12', label: 'Full Width (12 Columns)' },
                  ],
                  defaultValue: '4',
                  required: true,
                },
              ],
            },
            {
              type: 'row',
              admin: {
                condition: (_, siblingData) => siblingData.responsive === true,
              },
              fields: [
                {
                  name: 'featuredItems',
                  type: 'select',
                  label: 'Featured Items',
                  admin: {
                    description:
                      'The amount of featured items, these will appear larger compared to the rest of the items.',
                  },
                  options: [
                    { value: '0', label: 'No Featured Slides' },
                    { value: '1', label: 'One' },
                    { value: '2', label: 'Two' },
                  ],
                  defaultValue: '0',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
