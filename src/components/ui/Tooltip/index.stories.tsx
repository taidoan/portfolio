import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '.';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tooltip text',
  },
  argTypes: {
    children: { control: 'text' },
    color: { control: 'radio', options: ['dark', 'light'] },
  },
  render: (args) => (
    <Tooltip defaultOpen color={args.color}>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Content>{args.children}</Tooltip.Content>
    </Tooltip>
  ),
};
