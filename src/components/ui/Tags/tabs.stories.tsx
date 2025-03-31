import { Meta, StoryObj } from '@storybook/react';
import { Tag, TagsContainer } from './index';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tags',
  component: Tag,
  tags: ['autodocs'],
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
