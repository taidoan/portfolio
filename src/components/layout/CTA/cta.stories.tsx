import { Meta, StoryObj } from '@storybook/react';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import type { LinksBlockProps } from '@/payload-types';
import { CTA } from './index';

const mockContent = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: `Let's Chat.`,
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'heading',
        version: 1,
        tag: 'h3',
      },

      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: 'Have an exciting idea you’d like to bring to life? A curiosity to satisfy, or simply want to have a chat? Feel free to reach out via email or connect with me on social media—I’d love to hear from you!',
            type: 'text',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
        textFormat: 0,
        textStyle: '',
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
};

const mockLink = {
  type: 'reference',
  reference: {
    relationTo: 'pages',
    value: {
      slug: 'home',
    },
  },
  url: '/',
  label: 'Contact',
  color: 'secondary',
  buttonShadow: 'none',
  className: '',
};

const meta: Meta<typeof CTA> = {
  title: 'Layout/CTA',
  component: CTA,
  tags: ['autodocs'],
  parameters: {
    description: {
      component: 'A component that displays a call to action (CTA) with a link.',
    },
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'accent',
          'gradient-light',
          'gradient-primary',
          'gradient-secondary',
          'gradient-accent',
          'none',
        ],
      },
    },
    variant: {
      control: {
        type: 'select',
        options: ['fill', 'outlined', 'outlined-thick'],
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '1200px', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CTA>;

export const Default: Story = {
  args: {
    content: mockContent as DefaultTypedEditorState,
    link: mockLink as LinksBlockProps['link'],
    color: 'primary',
  },
  render: (args) => <CTA {...args} />,
};

export const NoContent: Story = {
  args: {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    content: null as any,
    link: mockLink as LinksBlockProps['link'],
  },
  render: (args) => <CTA {...args} />,
};

export const NoLink: Story = {
  args: {
    content: mockContent as DefaultTypedEditorState,
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    link: null as any,
  },
  render: (args) => <CTA {...args} />,
};
