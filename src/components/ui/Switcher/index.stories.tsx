import { StoryObj, Meta } from '@storybook/nextjs-vite';
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

export const SwitcherComponent: Story = {
  args: {
    children: (
      <>
        <SwitcherButton active={true} data-text='Active' value='active'>
          Active
        </SwitcherButton>
        <SwitcherButton data-text='Inactive' value='inactive'>
          Inactive
        </SwitcherButton>
      </>
    ),
  },
};
