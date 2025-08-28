import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ContactMethodsList } from './index';

const meta: Meta<typeof ContactMethodsList> = {
  title: 'UI/Contact Methods',
  component: ContactMethodsList,
  tags: ['autodocs'],
  args: {
    email: true,
    twitter: true,
    github: true,
    linkedin: true,
    instagram: true,
    youtube: true,
  },
  argTypes: {
    email: {
      control: { type: 'boolean' },
      description: 'Show email contact method',
    },
    emailLabel: {
      control: { type: 'text' },
      description: 'Email label',
    },
    emailLink: {
      control: { type: 'text' },
      description: 'Email link',
    },
    twitter: {
      control: { type: 'boolean' },
      description: 'Show twitter contact method',
    },
    twitterLabel: {
      control: { type: 'text' },
      description: 'Twitter label',
    },
    twitterLink: {
      control: { type: 'text' },
      description: 'Twitter link',
    },
    github: {
      control: { type: 'boolean' },
      description: 'Show github contact method',
    },
    githubLabel: {
      control: { type: 'text' },
      description: 'Github label',
    },
    githubLink: {
      control: { type: 'text' },
      description: 'Github link',
    },
    linkedin: {
      control: { type: 'boolean' },
      description: 'Show linkedin contact method',
    },
    linkedinLabel: {
      control: { type: 'text' },
      description: 'Linkedin label',
    },
    linkedinLink: {
      control: { type: 'text' },
      description: 'Linkedin link',
    },
    instagram: {
      control: { type: 'boolean' },
      description: 'Show instagram contact method',
    },
    instagramLabel: {
      control: { type: 'text' },
      description: 'Instagram label',
    },
    instagramLink: {
      control: { type: 'text' },
      description: 'Instagram link',
    },
    youtube: {
      control: { type: 'boolean' },
      description: 'Show youtube contact method',
    },
    youtubeLabel: {
      control: { type: 'text' },
      description: 'Youtube label',
    },
    youtubeLink: {
      control: { type: 'text' },
      description: 'Youtube link',
    },
  },
};
export default meta;
type Story = StoryObj<typeof ContactMethodsList>;

export const Default: Story = {
  args: {
    email: true,
    emailLabel: 'Shoot me an email',
    emailLink: 'mailto:example@example.com',
    twitter: true,
    twitterLabel: 'Follow me on Twitter',
    twitterLink: 'https://twitter.com/example',
    github: true,
    githubLabel: 'Check out my Github',
    githubLink: 'https://github.com/example',
    linkedin: true,
    linkedinLabel: 'Connect with me on Linkedin',
    linkedinLink: 'https://linkedin.com/in/example',
    instagram: true,
    instagramLabel: 'Follow me on Instagram',
    instagramLink: 'https://instagram.com/example',
    youtube: true,
    youtubeLabel: 'Subscribe to my Youtube',
  },
};
