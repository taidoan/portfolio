import { Meta, StoryObj } from '@storybook/react';
import { Archive } from '.';

const meta: Meta<typeof Archive> = {
  title: 'UI/Archive',
  component: Archive,
  tags: ['autodocs'],
  args: {
    data: [
      {
        title: 'Post 1',
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
        slug: 'post-1',
        id: '67c1bd0b9fb50c2e22c139f5',
        categories: [
          {
            slug: 'print',
            title: 'Print',
            id: '67cece0800d7591f31a00957',
            updatedAt: '2025-03-10T11:33:28.064Z',
            createdAt: '2025-03-10T11:33:28.064Z',
          },
        ],
      },
      {
        title: 'Post 2',
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
        slug: 'post-2',
        id: '67c1bgg0b9fb50c2e22c139f12',
        categories: [
          {
            title: 'Print',
            slug: 'print',
            id: '67cece0800d7591f31a00957',
            updatedAt: '2025-03-10T11:33:28.064Z',
            createdAt: '2025-03-10T11:33:28.064Z',
          },
        ],
      },
      {
        title: 'Post 3',
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
          type: 'Website',
        },
        categories: [
          {
            title: 'Web Design',
            slug: 'web-design',
            id: '67cecdbc00d7591f31a0091b',
            updatedAt: '2025-03-10T11:58:10.905Z',
            createdAt: '2025-03-10T11:58:10.905Z',
          },
        ],
      },
    ],
    categories: [
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
        slug: 'web-design',
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
        title: 'Web Design',
        id: '67cecdbc00d7591f31a0091b',
      },
    ],
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

export const Default: Story = {
  args: {
    type: 'projects',
    view: 'gallery',
  },
  render: (args) => <Archive {...args} />,
};

export const List: Story = {
  args: {
    type: 'projects',
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
