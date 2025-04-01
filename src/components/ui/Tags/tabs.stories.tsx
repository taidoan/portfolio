import { Meta, StoryObj } from '@storybook/react';
import { Tag, TagsContainer } from './index';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tags',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    href: undefined,
  },
  argTypes: {
    href: {
      description: 'Add a link to the tag',
      default: null,
    },
    className: {
      description: 'Add a custom class to the tag',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: () => (
    <TagsContainer>
      <Tag>Tag</Tag>
      <Tag>Tag2</Tag>
      <Tag>Tag3</Tag>
      <Tag>Tag4</Tag>
      <Tag>Tag5</Tag>
      <Tag>Tag6</Tag>
      <Tag href='https://www.google.com'>Tag7</Tag>
    </TagsContainer>
  ),
};
