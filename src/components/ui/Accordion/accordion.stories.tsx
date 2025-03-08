import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Accordion component renders a list of items with a title and content.',
      },
    },
  },
  args: {
    items: [
      {
        title: 'Item 1',
        content: 'Content 1',
        id: 'item-1',
      },
      {
        title: 'Item 2',
        content: 'Content 2',
        id: 'item-2',
      },
      {
        title: 'Item 3',
        content: 'Content 3',
        id: 'item-3',
      },
    ],
  },
  argTypes: {
    container: {
      options: ['none', 'card'],
      control: { type: 'select' },
    },
    indexCounter: {
      control: { type: 'select' },
      options: ['true', 'false'],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {},
};

export const Card: Story = {
  args: {
    container: 'card',
  },
};

export const WithCounter: Story = {
  args: {
    indexCounter: 'true',
  },
};

export const CardWithCounter: Story = {
  args: {
    items: [
      {
        title: 'Item 1',
        content: 'Content 1',
        id: 'item-1',
      },
      {
        title: 'Item 2',
        content: 'Content 2',
        id: 'item-2',
      },
      {
        title: 'Item 3',
        content: 'Content 3',
        id: 'item-3',
      },
    ],

    container: 'card',
    indexCounter: 'true',
  },
};

export const NoContentError: Story = {
  args: {
    items: [],
  },
};
