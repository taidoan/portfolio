import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';
import { mockSocialAccounts } from '@/mocks/data/mockSocial';
import { mockNavItems } from '@/mocks/data/mockNavItems';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '70rem', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: 'Footer component renders a footer with a navigation bar and social links.',
      },
    },
  },
  args: {
    data: {
      id: 'footer',
      navItems: mockNavItems,
    },
    social: mockSocialAccounts,
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
