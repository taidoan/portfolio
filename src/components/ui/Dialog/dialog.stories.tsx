import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Dialog, DialogProps } from './index';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    isOpen: {
      control: {
        type: 'boolean',
      },
    },
    className: {
      control: {
        type: 'text',
      },
      description: 'Additional class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Create a wrapper component to use React hooks properly
const DialogDemo = (args: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Dialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children || <p>This is modal content</p>}
      </Dialog>
    </>
  );
};

export const Default: Story = {
  args: {
    children: <p>Dialog content</p>,
  },
  render: (args) => <DialogDemo {...args} />,
};
