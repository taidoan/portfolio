import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Button component renders a button with a custom color, shadow, href, target, title, and action.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {},
};

export const Primary: Story = {
  args: {
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const Accent: Story = {
  args: {
    color: 'accent',
  },
};

export const Sage: Story = {
  args: {
    color: 'sage',
  },
};

export const Slate: Story = {
  args: {
    color: 'slate',
  },
};

export const Bittersweet: Story = {
  args: {
    color: 'bittersweet',
  },
};

export const LightGrey: Story = {
  args: {
    color: 'light-grey',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithAction: Story = {
  args: {
    action: () => {
      alert('Button clicked');
    },
  },
};

export const WithHref: Story = {
  args: {
    href: '/',
  },
};

export const WithTarget: Story = {
  args: {
    target: '_blank',
    href: '/',
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://taidoan.com',
    target: '_blank',
  },
};
