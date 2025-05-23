import { StoryObj, Meta } from '@storybook/react';
import { TagCloud } from '.';
import { mockTags } from '@/mocks/data/mockTags';

const meta: Meta<typeof TagCloud> = {
  title: 'UI/TagCloud',
  component: TagCloud,
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
    tags: mockTags,
    showCount: true,
  },
};

export default meta;
type Story = StoryObj<typeof TagCloud>;

export const Default: Story = {
  render: (args) => {
    return <TagCloud {...args} />;
  },
};
