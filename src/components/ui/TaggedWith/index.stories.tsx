import type { Meta, StoryObj } from '@storybook/react';
import { TaggedWith } from '.';
import { mockTags } from '@/mocks/data/mockTags';

const meta: Meta<typeof TaggedWith> = {
  title: 'UI/TaggedWith',
  component: TaggedWith,
  tags: ['autodocs'],
  args: {
    showTitle: true,
    title: 'Tagged With:',
    numberOfTags: 8,
    tags: mockTags,
  },
  parameters: {
    docs: {
      description: {
        component:
          'TaggedWith component renders a list of tags that are associated with a post or project.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof TaggedWith>;

export const Default: Story = {
  args: {},
};

export const NoTitle: Story = {
  args: {
    showTitle: false,
  },
};
