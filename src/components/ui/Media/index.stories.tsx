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
