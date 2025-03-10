import { Meta, StoryObj } from '@storybook/react';
import { Card, CardTitle, CardImage, CardContent, CardBody } from '.';

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
      options: ['projects', 'services'],
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
    data: {
      id: '679a37928643d526c4e122da',
      slug: 'vibzs',
      title: 'Vibz',
      details: {
        type: 'Website',
        date: '2022-01-01',
      },
      thumbnail: {
        id: '67a369aea507939cb6c21476',
        alt: 'Vibz Thumbnail',
        prefix: 'media',
        filename: 'vibz-thumbnail.webp',
        mimeType: 'image/webp',
        filesize: 14576,
        width: 1600,
        height: 900,
        focalX: 50,
        focalY: 50,
        createdAt: '2025-02-05T13:37:50.875Z',
        updatedAt: '2025-02-05T13:37:50.875Z',
        url: '/api/media/file/vibz-thumbnail.webp',
        thumbnailURL: null,
      },
      categories: [
        {
          id: '67cece0800d7591f31a00957',
          title: 'Print',
          slug: 'print',
          description:
            'Creating visually appealing and functional designs for physical materials like brochures and posters.',
          updatedAt: '2025-03-10T11:33:28.064Z',
          createdAt: '2025-03-10T11:33:28.064Z',
        },
        {
          id: '67cecd3c00d7591f31a008d7',
          title: 'Graphic Design',
          slug: 'graphic-design',
          description: 'Crafting stunning visuals for marketing campaigns and branding.',
          updatedAt: '2025-03-10T11:58:52.603Z',
          createdAt: '2025-03-10T11:58:52.603Z',
        },
      ],
    },
    href: '/example',
  },
  render: (args) => (
    <Card {...args}>
      <CardBody>
        <CardImage align='top' borderRadius='top' />
        <CardContent>
          <CardTitle />
          This is a with data passed in
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
