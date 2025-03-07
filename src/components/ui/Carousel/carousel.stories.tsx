import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './index';
import { LazyMotion, domAnimation } from 'motion/react';

const meta: Meta<typeof Carousel> = {
  title: 'UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <LazyMotion features={domAnimation} strict>
        <div style={{ maxWidth: '50rem', marginInline: 'auto' }}>
          <Story />
        </div>
      </LazyMotion>
    ),
  ],
  args: {
    slideSpacing: 16,
    slidesPerView: 3,
    slidesToScroll: 'auto',
    loop: false,
    pagination: false,
    paginationType: 'bullets',
    direction: 'horizontal',
    autoHeight: false,
    autoPlay: false,
    keyboardControls: false,
    buttonNavigation: false,
  },
  argTypes: {
    slideSpacing: {
      control: { type: 'number' },
    },
    slidesPerView: {
      control: { type: 'number' },
    },
    slidesToScroll: {
      control: { type: 'text' },
    },
    loop: {
      control: { type: 'boolean' },
    },
    pagination: {
      control: { type: 'boolean' },
    },
    paginationType: {
      control: { type: 'select', options: ['bullets', 'progress'] },
    },
    paginationColor: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'accent',
          'urban-steel',
          'slate',
          'bitter-sweet',
          'chery-punch',
          'fresh-leaf',
        ],
      },
    },
    direction: {
      control: { type: 'select', options: ['horizontal', 'vertical', 'vertical-scroll'] },
    },
    autoHeight: {
      control: { type: 'boolean' },
    },
    autoPlay: {
      control: { type: 'boolean' },
    },
    keyboardControls: {
      control: { type: 'boolean' },
    },
    buttonNavigation: {
      control: { type: 'boolean' },
    },
  },
  render: (args) => (
    <Carousel {...args}>
      <div style={{ background: 'lightgray', padding: '2rem', height: '25rem' }}>
        <h1>Slide 1</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'gray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 2</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'darkgray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 3</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'blue', padding: '2rem', height: '21rem' }}>
        <h1>Slide 4</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'darkgray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 5</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
      <div style={{ background: 'lightgray', padding: '2rem', height: '21rem' }}>
        <h1>Slide 6</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius natus soluta blanditiis,
          quisquam sapiente beatae, suscipit cumque eligendi, quis sint placeat similique adipisci
          nam ipsa odit. Nulla voluptatibus ab alias?
        </p>
      </div>
    </Carousel>
  ),
};
export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {};

export const AutoHeight: Story = {
  args: {
    slideSpacing: 16,
    slidesPerView: 1,
    slidesToScroll: '1',
    loop: false,
    pagination: false,
    paginationType: 'bullets',
    direction: 'horizontal',
    autoHeight: true,
    autoPlay: false,
    keyboardControls: false,
    buttonNavigation: false,
  },
};

export const ButtonNavigation: Story = {
  args: {
    slideSpacing: 16,
    slidesPerView: 1,
    slidesToScroll: '1',
    loop: false,
    pagination: true,
    paginationType: 'bullets',
    direction: 'horizontal',
    autoHeight: true,
    autoPlay: false,
    keyboardControls: false,
    buttonNavigation: true,
  },
};

export const Pagination: Story = {
  args: {
    pagination: true,
  },
};

export const PaginationProgress: Story = {
  args: {
    pagination: true,
    paginationType: 'progress',
    slidesPerView: 1,
    autoHeight: true,
  },
};

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    slidesPerView: 1,
    autoHeight: false,
    pagination: true,
  },
};
