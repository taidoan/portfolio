import { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '.';
import { mockAccordionItems } from '@/mocks/data/mockAccordionItems';

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
    items: mockAccordionItems,
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
    container: 'card',
    indexCounter: 'true',
  },
};

export const NoContentError: Story = {
  args: {
    items: [],
  },
};
