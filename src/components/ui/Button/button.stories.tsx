import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '.';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'fill',
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

export const PrimaryOutlined: Story = {
  args: {
    color: 'primary',
    variant: 'outlined',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
  },
};

export const SecondaryOutlined: Story = {
  args: {
    color: 'secondary',
    variant: 'outlined',
  },
};

export const Accent: Story = {
  args: {
    color: 'accent',
  },
};

export const AccentOutlined: Story = {
  args: {
    color: 'accent',
    variant: 'outlined',
  },
};

export const Sage: Story = {
  args: {
    color: 'sage',
  },
};

export const SageOutlined: Story = {
  args: {
    color: 'sage',
    variant: 'outlined',
  },
};

export const Slate: Story = {
  args: {
    color: 'slate',
  },
};

export const SlateOutlined: Story = {
  args: {
    color: 'slate',
    variant: 'outlined',
  },
};

export const Bittersweet: Story = {
  args: {
    color: 'bittersweet',
  },
};

export const BittersweetOutlined: Story = {
  args: {
    color: 'bittersweet',
    variant: 'outlined',
  },
};

export const LightGrey: Story = {
  args: {
    color: 'light-grey',
  },
};

export const LightGreyOutlined: Story = {
  args: {
    color: 'light-grey',
    variant: 'outlined',
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

export const Share: Story = {
  args: {
    children: 'Share',
    buttonType: 'share',
    color: 'frosted-pearl',
  },
};
