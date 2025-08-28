import { Meta, StoryObj } from '@storybook/react';
import { Tag, TagsContainer } from './index';
import { mockTags } from '@/mocks/data/mockTags';

const meta: Meta<typeof Tag> = {
  title: 'UI/Tags',
  component: Tag,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Story />
      </div>
    ),
  ],
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
  render: (args) => {
    const tags = mockTags.map((tag) => (
      <Tag key={tag.id} {...args}>
        {tag.name}
      </Tag>
    ));

    return <TagsContainer>{tags}</TagsContainer>;
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
  render: (args) => {
    const tags = mockTags.map((tag) => (
      <Tag key={tag.id} {...args}>
        {tag.name}
      </Tag>
    ));

    return <TagsContainer>{tags}</TagsContainer>;
  },
};

export const Bordered: Story = {
  args: {
    variant: 'border',
  },
  render: (args) => {
    const tags = mockTags.map((tag) => (
      <Tag key={tag.id} {...args}>
        {tag.name}
      </Tag>
    ));

    return <TagsContainer>{tags}</TagsContainer>;
  },
};

export const WithCount: Story = {
  args: {
    count: 3,
  },
  render: (args) => {
    const tags = mockTags.map((tag) => (
      <Tag key={tag.id} {...args}>
        {tag.name}
      </Tag>
    ));

    return <TagsContainer showCount={true}>{tags}</TagsContainer>;
  },
};
