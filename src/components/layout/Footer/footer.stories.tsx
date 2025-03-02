import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

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
      navItems: [
        {
          link: {
            type: 'custom',
            label: 'Home',
            url: '/',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'About',
            url: '/about',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Projects',
            url: '/projects',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Services',
            url: '/services',
          },
        },
        {
          link: {
            type: 'custom',
            label: 'Contact',
            url: '/contact',
          },
        },
      ],
    },
    social: {
      id: 'social',
      'social-network': [
        {
          username: 'taidoan',
          network: 'github',
          id: 'github',
        },
        {
          username: 'taidoan',
          network: 'linkedin',
          id: 'linkedin',
        },
        {
          username: 'taidoan',
          network: 'instagram',
          id: 'instagram',
        },
        {
          username: 'taidoan',
          network: 'youtube',
          id: 'youtube',
        },
        {
          username: 'taidoan',
          network: 'x',
          id: 'x',
        },
      ],
    },
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
