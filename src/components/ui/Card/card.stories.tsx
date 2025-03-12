import { Meta, StoryObj } from '@storybook/react';
import { Card, CardTitle, CardImage, CardContent, CardBody } from '.';
import { RichText } from '@components/ui/RichText';

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
    data: {
      id: '679a37928643d526c4e122da',
      slug: 'post1',
      title: 'Post 1',
      excerpt: "This is post 1's example excerpt.",
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

    data: {
      id: '67cb3b0d00d7591f319f8bc2',
      slug: 'branding',
      title: 'Branding',
      description: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Branding service description',
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
      },
      image: {
        alt: 'Branding Icon',
        prefix: 'media',
        filename: 'branding.svg',
        mimeType: 'image/svg+xml',
        filesize: 3860,
        width: 214,
        height: 200,
        createdAt: '2025-03-12T10:19:56.275Z',
        updatedAt: '2025-03-12T10:19:56.275Z',
        id: '67d15fcc40d3105ab50713e7',
        url: '/api/media/file/branding.svg',
        thumbnailURL: null,
      },
    },

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
