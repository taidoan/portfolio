import { Meta, StoryObj } from '@storybook/react';
import { Archive } from '.';

const mockProjects = [
  {
    title: 'Vibz',
    details: {
      type: 'Website',
    },
    thumbnail: {
      alt: 'test',
      prefix: 'media',
      filename: 'vibz-thumbnail.webp',
      mimeType: 'image/webp',
      filesize: 44600,
      width: 1024,
      height: 768,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-04T17:03:05.027Z',
      updatedAt: '2025-03-04T17:03:05.027Z',
      id: '67c73249759c5d5297da6891',
      url: '/api/media/file/vibz-thumbnail.webp',
      thumbnailURL: null,
    },
    slug: 'vibz',
    id: '67c1bd0b9fb50c2e22c139f5',
    categories: [
      {
        slug: 'digital',
        title: 'Digital',
        id: '67cecdbc00d7591f31a0091b',
        updatedAt: '2025-03-10T11:33:28.064Z',
        createdAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
  {
    title: 'Urban Bites',
    details: {
      type: 'Website',
    },
    thumbnail: {
      alt: 'test',
      prefix: 'media',
      filename: 'vibz-thumbnail.webp',
      mimeType: 'image/webp',
      filesize: 44600,
      width: 1024,
      height: 768,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-04T17:03:05.027Z',
      updatedAt: '2025-03-04T17:03:05.027Z',
      id: '67c73249759c5d5297da6891',
      url: '/api/media/file/vibz-thumbnail.webp',
      thumbnailURL: null,
    },
    slug: 'urban-bites',
    id: '67c1bgg0b9fb50c2e22c139f12',
    categories: [
      {
        title: 'Digital',
        slug: 'digital',
        id: '67cecdbc00d7591f31a0091b',
        updatedAt: '2025-03-10T11:33:28.064Z',
        createdAt: '2025-03-10T11:33:28.064Z',
      },
      {
        title: 'Branding',
        slug: 'branding',
        id: '352552352fgwegewgfe',
        updatedAt: '2025-03-10T11:33:28.064Z',
        createdAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
  {
    title: 'Toyota',
    thumbnail: {
      alt: 'test',
      prefix: 'media',
      filename: 'vibz-thumbnail.webp',
      mimeType: 'image/webp',
      filesize: 44600,
      width: 1024,
      height: 768,
      focalX: 50,
      focalY: 50,
      createdAt: '2025-03-04T17:03:05.027Z',
      updatedAt: '2025-03-04T17:03:05.027Z',
      id: '67c73249759c5d5297da6891',
      url: '/api/media/file/vibz-thumbnail.webp',
      thumbnailURL: null,
    },
    slug: 'post-3',
    id: '67c1bgg0b9fb50c2e22c139f13',
    details: {
      type: 'Campaign',
    },
    categories: [
      {
        title: 'Print',
        slug: 'print',
        id: '67cece0800d7591f31a00957',
        updatedAt: '2025-03-10T11:58:10.905Z',
        createdAt: '2025-03-10T11:58:10.905Z',
      },
    ],
  },
];

const mockPosts = [
  {
    title: 'Post 1',
    slug: 'post-1',
    id: '352552352fgwegewrwqfrfqwfqwfqfwgfe',
    excerpt: 'This is an example excerpt for post one.',
    categories: [
      {
        title: 'Digital',
        slug: 'digital',
        id: '67cecdbc00d7591f31a0091b',
        description: 'Digital desc',
        createdAt: '2025-03-10T11:33:28.064Z',
        updatedAt: '2025-03-10T11:33:28.064Z',
      },
      {
        title: 'Graphic Design',
        slug: 'graphic-design',
        id: '352552352fgwegewrwqfrfqwfqwfqfwgfe',
        description: 'Graphic-design desc',
        createdAt: '2025-03-10T11:33:28.064Z',
        updatedAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
  {
    title: 'Post 2',
    slug: 'post-2',
    id: '352552352fgwegewrwqfrfqwfqwfqfwgfewgggewe',
    excerpt: 'This is an example excerpt for post two.',
    categories: [
      {
        title: 'Brading',
        slug: 'branding',
        id: '352552352fgwegewgfe',
        description: 'Branding desc',
        createdAt: '2025-03-10T11:33:28.064Z',
        updatedAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
  {
    title: 'Post 3',
    slug: 'post-3',
    id: '352552352fgwegewrwqfrfqwfqwfqfwgfewgggewew223441212g',
    excerpt: 'This is an example excerpt for post three.',
    categories: [
      {
        title: 'Graphic Design',
        slug: 'graphic-design',
        id: '352552352fgwegewrwqfrfqwfqwfqfwgfe',
        description: 'Graphic-design desc',
        createdAt: '2025-03-10T11:33:28.064Z',
        updatedAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
  {
    title: 'Post 4',
    slug: 'post-4',
    id: '352552352fgwegewrwqfrfqwfqwfqfwgfewgggewew223441212g',
    excerpt: 'This is an example excerpt for post four.',
    categories: [
      {
        title: 'Print',
        slug: 'print',
        id: '67cece0800d7591f31a00957',
        description: 'Print desc',
        createdAt: '2025-03-10T11:33:28.064Z',
        updatedAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
];

const mockCategories = [
  {
    description:
      'Creating visually appealing and functional designs for physical materials, such as brochures, posters, flyers, business cards, and packaging. I ensure your printed materials leave a lasting impression.',
    slug: 'print',
    slugLock: true,
    createdAt: '2025-03-10T11:33:28.064Z',
    updatedAt: '2025-03-10T11:58:03.266Z',
    title: 'Print',
    id: '67cece0800d7591f31a00957',
  },
  {
    description:
      'Crafting visually compelling websites that are easy to navigate and responsive across all devices. I focus on layout, typography, and interactive elements to create websites that look great and work even better.',
    slug: 'digital',
    slugLock: true,
    parentCategory: {
      description:
        "Your online presence is everything, and I’m here to help you make it unforgettable. From sleek, responsive websites to engaging digital experiences, I design with purpose and creativity. Whether it's building a site from scratch or enhancing your existing one, I focus on user-friendly, beautiful designs that work seamlessly across devices. Let’s bring your digital vision to life and make sure it stands out in the crowded online world.",
      slug: 'digital',
      slugLock: true,
      createdAt: '2025-03-10T11:28:22.674Z',
      updatedAt: '2025-03-10T11:59:44.547Z',
      title: 'Digital',
      id: '67ceccd600d7591f31a008bc',
    },
    createdAt: '2025-03-10T11:32:12.746Z',
    updatedAt: '2025-03-10T11:58:10.905Z',
    title: 'Digital',
    id: '67cecdbc00d7591f31a0091b',
  },
  {
    title: 'Branding',
    slug: 'branding',
    id: '352552352fgwegewgfe',
    description: 'Branding desc',
    createdAt: '2025-03-10T11:33:28.064Z',
    updatedAt: '2025-03-10T11:58:03.266Z',
  },
  {
    title: 'Graphic Design',
    slug: 'graphic-design',
    id: '352552352fgwegewrwqfrfqwfqwfqfwgfe',
    description: 'Grpahic Design desc',
    createdAt: '2025-03-10T11:33:28.064Z',
    updatedAt: '2025-03-10T11:58:03.266Z',
  },
];

const meta: Meta<typeof Archive> = {
  title: 'UI/Archive',
  component: Archive,
  tags: ['autodocs'],
  args: {
    data: mockProjects,
    categories: mockCategories,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '70rem',
          marginInline: 'auto',
          backgroundColor: 'var(--clr-light-grey-250)',
          padding: '1.5rem',
          borderRadius: 'var(--border-radius-medium)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Archive>;

export const DefaultGridView: Story = {
  args: {
    relation: 'projects',
    view: 'grid',
  },
  render: (args) => <Archive {...args} />,
};

export const ListView: Story = {
  args: {
    relation: 'projects',
    view: 'list',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '50rem', marginInline: 'auto' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => <Archive {...args} />,
};

export const PostsArchive: Story = {
  args: {
    relation: 'posts',
    filterShowAll: true,
    data: mockPosts,
  },
};

export const NoCategories = {
  args: {
    categories: [],
    relation: 'projects',
    view: 'grid',
  },
};

export const InValidView = {
  args: {
    view: 'invalid',
  },
};

export const NoData = {
  args: {
    data: [],
  },
};
