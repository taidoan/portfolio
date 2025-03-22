import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import { Lightbox } from './index';
import Image from 'next/image';

const meta: Meta<typeof Lightbox> = {
  title: 'UI/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  args: {
    children: (
      <Image
        src='https://images.unsplash.com/photo-1733503711063-3427bff34612?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        alt='text'
        width='5760'
        height='3840'
        sizes='100vw'
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Lightbox>;

// Wrapper component to ensure the dialog is shown

/* eslint-disable  @typescript-eslint/no-explicit-any */
const LightboxWrapper = (args: any) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // Call showModal() on the dialog after it's mounted
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  return <Lightbox {...args} ref={dialogRef} />;
};

export const Default: Story = {
  args: {},
};

export const AlwaysOpen: Story = {
  args: {},
  render: (args) => <LightboxWrapper {...args} />,
};

// You can add additional stories to show different states or content
export const WithLargeContent: Story = {
  args: {
    children: (
      <div style={{ width: '800px', height: '600px' }}>
        <h2>Large Content Example</h2>
        <p>This demonstrates how the lightbox handles larger content.</p>
      </div>
    ),
  },
  render: (args) => <LightboxWrapper {...args} />,
};
