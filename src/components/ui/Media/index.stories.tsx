import { StoryObj, Meta } from '@storybook/react';
import { Media } from '.';

const meta: Meta<typeof Media> = {
  title: 'UI/Media',
  component: Media,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['image', 'video', 'pdf', 'auto', 'embed'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Media>;

export const EmbeddedMedia: Story = {
  args: {
    src: 'https://www.youtube.com/watch?v=BgnHNVNlcQI',
    source: 'youtube',
    type: 'embed',
  },
};

export const ImageMedia: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1746483965832-40cd64149b4f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
};
