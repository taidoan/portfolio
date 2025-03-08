import { Meta, StoryObj } from '@storybook/react';
import { Bio } from '.';
import { BioItem } from '.';

const meta: Meta<typeof Bio> = {
  title: 'UI/Bio',
  component: Bio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bio component renders a list of items with a label, value, and icon.',
      },
    },
  },
  args: {
    items: [
      {
        label: 'Full Name',
        value: 'Tai Doan',
        icon: <span>👋</span>,
      },
      {
        label: 'Email',
        value: 'taidoan@gmail.com',
        icon: <span>📧</span>,
      },
      {
        label: 'Website',
        value: 'https://taidoan.com',
        icon: <span>🌐</span>,
      },
    ],
  },
  argTypes: {
    items: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Bio>;

export const Default: Story = {
  args: {},
};
