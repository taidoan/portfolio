import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavBar } from './navBar';
import { mockSocialAccounts } from '@/mocks/data/mockSocial';
import { mockNavItems } from '@/mocks/data/mockNavItems';

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '50rem', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        component:
          'NavBar component renders a navigation bar with links to various pages on the website.',
      },
    },
  },
  args: {
    data: {
      logoColor: 'secondary',
      id: 'nav-bar',
      navItems: mockNavItems,
    },
    social: mockSocialAccounts,
  },
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};
