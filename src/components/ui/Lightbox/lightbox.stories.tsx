import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import { Lightbox } from '.';
import Image from 'next/image';

const meta: Meta<typeof Lightbox> = {
  title: 'UI/Lightbox',
  component: Lightbox,
  tags: ['autodocs'],
  parameters: {
    default: 'Default',
    description:
      'Lightbox component is a modal that displays a large image or video. It will automatically display a carousel if more than one piece of media is provided. It can be used to display additional information or content related to the main image.',
  },
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

/* eslint-disable  @typescript-eslint/no-explicit-any */
const LightboxWrapper = (args: any) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, []);

  return <Lightbox {...args} ref={dialogRef} />;
};

/* eslint-disable  @typescript-eslint/no-explicit-any */
const LightboxTest: React.FC<any> = (props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>Open Lightbox</button>
      <Lightbox {...props} ref={dialogRef} />
    </>
  );
};

export const Default: Story = {
  args: {},
  render: (args) => <LightboxTest {...args} />,
};

export const AlwaysOpen: Story = {
  parameters: {
    description: 'Lightbox is always open',
  },
  args: {},
  render: (args) => <LightboxWrapper {...args} />,
};
