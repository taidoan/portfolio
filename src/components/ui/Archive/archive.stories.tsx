import { Meta, StoryObj } from '@storybook/react';
import { Archive } from '.';
import { mockCategories, mockProjects, mockPosts } from './mocks';

const meta: Meta<typeof Archive> = {
  title: 'UI/Archive',
  component: Archive,
  tags: ['autodocs'],
  args: {
    data: mockProjects,
    categories: mockCategories,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '70rem',
          marginInline: 'auto',
          backgroundColor: 'var(--clr-light-grey-250)',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-medium)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Archive>;

export const DefaultGridView: Story = {
  args: {
    relation: 'projects',
    view: 'grid',
  },
  render: (args) => <Archive {...args} />,
};

export const ListView: Story = {
  args: {
    relation: 'projects',
    view: 'list',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '50rem', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <Archive {...args} />,
};

export const PostsArchive: Story = {
  args: {
    relation: 'posts',
    filterShowAll: true,
    data: mockPosts,
  },
};

export const NoCategories = {
  args: {
    categories: [],
    relation: 'projects',
    view: 'grid',
  },
};

export const InValidView = {
  args: {
    view: 'invalid',
  },
};

export const NoData = {
  args: {
    data: [],
  },
};
