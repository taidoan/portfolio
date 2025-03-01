import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './navBar';

const meta: Meta<typeof NavBar> = {
  title: 'Layout/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    data: {
      id: 'nav-bar',
      navItems: [
        {
          id: 'home',
          link: {
            type: 'custom',
            label: 'Home',
            url: '/',
          },
        },
        {
          id: 'about',
          link: {
            type: 'custom',
            label: 'About',
            url: '/about',
          },
        },
        {
          id: 'projects',
          link: {
            type: 'custom',
            label: 'Projects',
            url: '/projects',
          },
        },
        {
          id: 'services',
          link: {
            type: 'custom',
            label: 'Services',
            url: '/services',
          },
        },
        {
          id: 'contact',
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
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {};
