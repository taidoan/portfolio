import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NavLink } from '.';

const meta: Meta<typeof NavLink> = {
  title: 'UI/NavLinks',
  component: NavLink,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        component: 'NavLink component renders a link to a page on the website.',
      },
    },
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            maxWidth: '40rem',
            marginInline: 'auto',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: {
    label: 'Example Page',
    type: 'custom',
    url: '/example-page',
  },
};

export const DefaultActive: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/active-page',
      },
    },
  },
  args: {
    label: 'Example Page',
    type: 'custom',
    url: '/active-page',
  },
};

export const DefaultHover: Story = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
  args: {
    label: 'Example Page',
    type: 'custom',
    url: '/example-page',
  },
};

export const DefaultFocus: Story = {
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },

  args: {
    label: 'Example Page',
    type: 'custom',
    url: '/example-page',
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => {
      return (
        <div
          style={{
            backgroundColor: 'var(--clr-secondary-400)',
            maxWidth: '20rem',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  args: {
    label: 'Example Page',
    type: 'custom',
    url: '/example-page',
  },
};

export const MobileActive: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/active-page',
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <div
          style={{
            backgroundColor: 'var(--clr-secondary-400)',
            maxWidth: '20rem',
            borderRadius: '1rem',
            padding: '1rem',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  args: {
    label: 'Example Page',
    type: 'custom',
    url: '/active-page',
  },
};
