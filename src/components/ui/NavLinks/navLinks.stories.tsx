import type { Meta, StoryObj } from '@storybook/react';
import { NavLink } from '.';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/active-page'),
}));

const meta: Meta<typeof NavLink> = {
  title: 'UI/NavLinks',
  component: NavLink,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
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
  args: {
    label: 'Example Page',
    type: 'custom',
    url: '/active-page',
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
