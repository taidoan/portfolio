import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  args: {
    data: {
      logoColor: 'secondary',
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
  parameters: {
    docs: {
      description: {
        component:
          'Header component renders a navigation bar with links to various pages on the website.',
      },
    },
  },
  render: (args) => (
    <>
      <Header {...args} />
      <main>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
          libero. Sed cursus ante dapibus diam.
        </p>
        <p>
          Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
          mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        </p>
        <p>
          Vestibulum lacinia arcu eget nulla. Nulla vitae massa. Aenean sit amet erat nunc. Nulla at
          sollicitudin leo. In ac mauris urna. Fusce venenatis nisi sit amet felis cursus, nec
          aliquet nisi scelerisque.
        </p>
        <p>
          Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend
        </p>
        <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent</p>
      </main>
    </>
  ),
};

export default meta;

type Story = StoryObj<typeof Header>;

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
