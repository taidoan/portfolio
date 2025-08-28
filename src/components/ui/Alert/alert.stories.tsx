import { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertTitle } from '.';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Alert component renders a styled alert with a title, severity, and variant.',
      },
    },
  },
  args: {
    severity: 'info',
    variant: 'filled',
  },
  argTypes: {
    variant: {
      options: ['filled', 'outlined'],
      control: { type: 'select' },
    },
    severity: {
      options: ['success', 'warning', 'error', 'info'],
      control: { type: 'select' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const SuccessFilled: Story = {
  args: {
    severity: 'success',
    variant: 'filled',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const SuccessFilledWithTitle: Story = {
  args: {
    severity: 'success',
    variant: 'filled',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};

export const WarningFilled: Story = {
  args: {
    severity: 'warning',
    variant: 'filled',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const WarningFilledWithTitle: Story = {
  args: {
    severity: 'warning',
    variant: 'filled',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};

export const ErrorFilled: Story = {
  args: {
    severity: 'error',
    variant: 'filled',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const ErrorFilledWithTitle: Story = {
  args: {
    severity: 'error',
    variant: 'filled',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};

export const InfoFilled: Story = {
  args: {
    severity: 'info',
    variant: 'filled',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const InfoFilledWithTitle: Story = {
  args: {
    severity: 'info',
    variant: 'filled',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};

export const InfoOutlined: Story = {
  args: {
    severity: 'info',
    variant: 'outlined',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const InfoOutlinedWithTitle: Story = {
  args: {
    severity: 'info',
    variant: 'outlined',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};

export const ErrorOutlined: Story = {
  args: {
    severity: 'error',
    variant: 'outlined',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const ErrorOutlinedWithTitle: Story = {
  args: {
    severity: 'error',
    variant: 'outlined',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};

export const WarningOutlined: Story = {
  args: {
    severity: 'warning',
    variant: 'outlined',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const WarningOutlinedWithTitle: Story = {
  args: {
    severity: 'warning',
    variant: 'outlined',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};

export const SuccessOutlined: Story = {
  args: {
    severity: 'success',
    variant: 'outlined',
  },

  render: (args) => <Alert {...args}>This is an info alert — check it out!</Alert>,
};

export const SuccessOutlinedWithTitle: Story = {
  args: {
    severity: 'success',
    variant: 'outlined',
  },

  render: (args) => (
    <Alert {...args}>
      <AlertTitle>Info Alert</AlertTitle>This is an info alert — check it out!
    </Alert>
  ),
};
