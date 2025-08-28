import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SocialShare } from '.';

const meta: Meta<typeof SocialShare> = {
  title: 'UI/SocialShare',
  component: SocialShare,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {},
};
export default meta;
type Story = StoryObj<typeof SocialShare>;

export const Default: Story = {
  args: {},
};
