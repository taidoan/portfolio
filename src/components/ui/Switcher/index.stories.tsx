import { StoryObj, Meta } from '@storybook/react';
import { Switcher, SwitcherButton } from '.';

const meta: Meta<typeof Switcher> = {
  title: 'UI/Switcher',
  component: Switcher,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(180deg, #F0F0EE 0%, #F6F6F4 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Switcher>;
const parentSwitcher = true;

export const SwitcherComponent: Story = {
  args: {
    children: (
      <>
        <SwitcherButton active={true}>Active</SwitcherButton>
        <SwitcherButton>Inactive</SwitcherButton>
      </>
    ),
  },
};
