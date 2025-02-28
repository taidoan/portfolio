import type { Meta, StoryObj } from '@storybook/react';
import { NavLink } from '.';

const meta: Meta<typeof NavLink> = {
  title: 'UI/NavLinks',
  component: NavLink,
  tags: ['autodocs'],
  decorators: [
    (Story) => {
      return (
        <div style={{ maxWidth: '40rem', marginInline: 'auto' }}>
          <Story />
        </div>
      );
    },
  ],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: {
    children: 'NavLink',
  },
};
