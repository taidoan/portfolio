import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from './header';
import { mockSocialAccounts } from '@/mocks/data/mockSocial';
import { mockNavItems } from '@/mocks/data/mockNavItems';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  args: {
    data: {
      logoColor: 'secondary',
      id: 'nav-bar',
      navItems: mockNavItems,
    },
    social: mockSocialAccounts,
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
