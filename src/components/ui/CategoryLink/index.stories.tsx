import { StoryObj, Meta } from '@storybook/react';
import { CategoryLink } from '.';

const meta: Meta<typeof CategoryLink> = {
  title: 'UI/CategoryLink',
  component: CategoryLink,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CategoryLink>;

export const ParentCategory: Story = {
  args: {
    type: 'category',
  },
};

export const SubCategory: Story = {
  args: {
    type: 'sub-category',
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'select' },
    },
  },
};
