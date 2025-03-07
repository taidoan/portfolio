import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';

const meta: Meta<typeof Accordion> = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
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
      control: { type: 'boolean' },
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
    indexCounter: true,
  },
};
