import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from './index';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'UI/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    breadcrumbs: [
      {
        slug: 'home',
        title: 'Home',
        url: 'http://localhost:3000/home',
        id: '67c1bd0b9fb50c2e22c139f5',
      },
      {
        slug: 'about',
        title: 'About',
        url: 'http://localhost:3000/about',
        id: '67cc0b8600d7591f319f958e',
      },
    ],
  },
  argTypes: {
    container: {
      options: ['none', 'boxed'],
      control: { type: 'select' },
    },
    background: {
      options: ['none', 'light', 'dark', 'translucent'],
      control: { type: 'select' },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumbs>;

export const Default: Story = {
  args: {},
};

export const Services: Story = {
  args: {
    breadcrumbs: [
      {
        url: '/ui-ux',
        title: 'UI & UX',
        id: '67cb3ca8afe3837fb56b4a8b',
      },
    ],
  },
};
