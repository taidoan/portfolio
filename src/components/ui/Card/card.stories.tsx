import { Meta, StoryObj } from '@storybook/react';
import { Card, CardTitle, CardImage, CardContent, CardBody } from '.';
import { RichText } from '@components/ui/RichText';
import { mockPosts } from '@/mocks/data/mockPosts';
import { mockProjects } from '@/mocks/data/mockProjects';
import { mockServices } from '@/mocks/data/mockServices';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    textAlign: {
      options: ['centered', 'left', 'right'],
      control: { type: 'select' },
    },
    relation: {
      options: ['projects', 'services', 'posts'],
      control: { type: 'select' },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Card component renders a card with a custom color, shadow, href, target, title, and action.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '50rem', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>This is an empty card</CardBody>
    </Card>
  ),
};

export const CardWithTitle: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardTitle>This is a card title</CardTitle>
        This is a card body
      </CardBody>
    </Card>
  ),
};

export const CardWithImage: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage src='vibz-thumbnail.webp' alt='Hero Image' borderRadius={'all'} align='top' />
        <CardContent>
          <CardTitle>This is a card title</CardTitle>
          <p>This is a card with an image</p>
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const CardWithImageAboveContent: Story = {
  render: (args) => (
    <Card {...args}>
      <CardImage src='vibz-thumbnail.webp' alt='Hero Image' borderRadius={'top'} align='top' />
      <CardBody>
        <CardContent>
          <CardTitle>This is a card title</CardTitle>
          <p>This is a card with an image above the content</p>
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const CardWithImageBelowContent: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardContent>
          <CardTitle>This is a card title</CardTitle>
          <p>This is a card with an image below the content</p>
        </CardContent>
      </CardBody>
      <CardImage
        src='vibz-thumbnail.webp'
        alt='Hero Image'
        borderRadius={'bottom'}
        align='bottom'
      />
    </Card>
  ),
};

export const CardWithImageAlignedBottom: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardContent>
          <CardTitle>This is a card title</CardTitle>
          <p>This is a card with an image aligned at the bottom</p>
        </CardContent>
        <CardImage src='vibz-thumbnail.webp' alt='Hero Image' borderRadius={'all'} align='bottom' />
      </CardBody>
    </Card>
  ),
};

export const ProjectsCard: Story = {
  args: {
    relation: 'projects',
    data: mockProjects[0],
    href: '/example',
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage align='top' borderRadius='top' />
        <CardContent>
          <CardTitle />
          {args.relation === 'projects' &&
            args.data &&
            'details' in args.data &&
            args.data.details && <p>{args.data.details.type}</p>}
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const InsideContent: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardContent insideContainer={true}>
          <CardTitle>This is a card title</CardTitle>
          <p>This is a card with an image</p>
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const InsideContentAndImage: Story = {
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage src='vibz-thumbnail.webp' alt='Hero Image' borderRadius={'all'} align='top' />
        <CardContent insideContainer={true}>
          <CardTitle>This is a card title</CardTitle>
          <p>This is a card with an image</p>
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const PostsCard: Story = {
  args: {
    relation: 'posts',
    data: mockPosts[0],
    href: '/posts/1',
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage align='top' borderRadius='all' />
        <CardContent insideContainer>
          <CardTitle />
          <p>
            {args.relation === 'posts' && args.data && 'excerpt' in args.data && (
              <p>{args.data.excerpt}</p>
            )}
          </p>
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const ServicesCard: Story = {
  args: {
    relation: 'services',
    data: mockServices[0],
    href: '/services/1',
    textAlign: 'centered',
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage align='top' />
        <CardContent insideContainer>
          <CardTitle />
          {args.relation === 'services' && args.data ? (
            'description' in args.data && args.data.description ? (
              <RichText data={args.data.description} />
            ) : (
              <p>No description available</p>
            )
          ) : null}
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const ProjectsArchiveCard: Story = {
  args: {
    relation: 'projects',
    kind: 'archive',
    data: mockProjects[0],
    href: '/example',
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage align='top' borderRadius='all' />
        <CardContent>
          <CardTitle />
          {args.relation === 'projects' &&
            args.data &&
            'details' in args.data &&
            args.data.details && <p>{args.data.details.type}</p>}
        </CardContent>
      </CardBody>
    </Card>
  ),
};

export const PostsArchiveCard: Story = {
  args: {
    relation: 'posts',
    kind: 'archive',
    data: mockPosts[0],
    href: '/posts/1',
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage align='top' borderRadius='all' />
        <CardContent insideContainer>
          <CardTitle />
          {args.relation === 'posts' && args.data && 'excerpt' in args.data && (
            <p>{args.data.excerpt}</p>
          )}
        </CardContent>
      </CardBody>
    </Card>
  ),
};
