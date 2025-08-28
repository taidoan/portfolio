import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SocialButton } from '.';

const meta: Meta<typeof SocialButton> = {
  title: 'UI/SocialButton',
  component: SocialButton,
  tags: ['autodocs'],
  args: {
    username: 'taidoan',
  },
  parameters: {
    docs: {
      description: {
        component:
          'SocialButton component renders a button with a social icon and a link to the social network',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof SocialButton>;

export const X: Story = {
  args: {
    network: 'x',
  },
};

export const Github: Story = {
  args: {
    network: 'github',
  },
};

export const Linkedin: Story = {
  args: {
    network: 'linkedin',
  },
};

export const Instagram: Story = {
  args: {
    network: 'instagram',
  },
};

export const Youtube: Story = {
  args: {
    network: 'youtube',
  },
};

export const PrimaryColor: Story = {
  args: {
    network: 'github',
    color: 'primary',
  },
};

export const SecondaryColor: Story = {
  args: {
    network: 'github',
    color: 'secondary',
  },
};

export const AccentColor: Story = {
  args: {
    network: 'github',
    color: 'accent',
  },
};
