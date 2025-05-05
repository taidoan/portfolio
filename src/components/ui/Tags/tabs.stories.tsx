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
    variant: 'default',
    color: 'default',
  },
  argTypes: {
    href: {
      control: 'text',
      description: 'Add a link to the tag',
      default: null,
    },
    className: {
      description: 'Add a custom class to the tag',
    },
    variant: {
      control: 'select',
      description: 'The variant of the tag',
      default: 'default',
      options: ['default', 'border'],
    },
    color: {
      control: 'select',
      description: 'The color of the tag',
      default: 'default',
      options: ['default', 'light-grey', 'slate', 'dark-grey'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: (args) => (
    <TagsContainer>
      <Tag {...args}>Tag1</Tag>
      <Tag {...args}>Tag2</Tag>
      <Tag {...args}>Tag3</Tag>
      <Tag {...args}>Tag4</Tag>
      <Tag {...args}>Tag5</Tag>
      <Tag {...args}>Tag6</Tag>
      <Tag {...args} href='https://www.google.com'>
        Tag7
      </Tag>
    </TagsContainer>
  ),
};
