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
    tagVariant: 'border',
    tagColor: 'light-grey',
  },
  argTypes: {
    showTitle: {
      control: 'boolean',
      description: 'Show the title or not',
      defaultValue: true,
    },
    title: {
      control: 'text',
      description: 'The title of the component',
      defaultValue: 'Tagged With:',
    },
    numberOfTags: {
      control: 'number',
      description: 'The number of tags to display',
      defaultValue: 8,
    },
    tagVariant: {
      control: 'select',
      description: 'The variant of the tag',
      defaultValue: 'border',
      options: ['border', 'default'],
    },
    tagColor: {
      control: 'select',
      description: 'The color of the tag',
      defaultValue: 'light-grey',
      options: ['default', 'light-grey', 'slate', 'dark-grey'],
    },
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
