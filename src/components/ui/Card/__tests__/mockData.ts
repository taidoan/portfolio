import type { ProjectCard, PostCard } from '../types';
export const mockProjectData = {
  id: '679a37928643d526c4e122da',
  slug: 'vibzs',
  title: 'Vibz',
  relationTo: 'projects',
  details: {
    type: 'Website',
    date: '2022-01-01',
  },
  url: '/vibz',
  createdAt: '2025-01-30T13:37:50.875Z',
  updatedAt: '2025-02-05T13:37:50.875Z',
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
    },
    {
      id: '67cecd3c00d7591f31a008d7',
      title: 'Graphic Design',
      slug: 'graphic-design',
      description: 'Crafting stunning visuals for marketing campaigns and branding.',
    },
  ],
} satisfies ProjectCard;

export const mockPostData = {
  id: '679a37928643d526c4e122da',
  slug: 'post1',
  title: 'Post 1',
  relationTo: 'posts',
  excerpt: "This is post 1's example excerpt.",
  createdAt: '2025-02-05T13:37:50.875Z',
  updatedAt: '2025-02-05T13:37:50.875Z',
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
    },
    {
      id: '67cecd3c00d7591f31a008d7',
      title: 'Graphic Design',
      slug: 'graphic-design',
      description: 'Crafting stunning visuals for marketing campaigns and branding.',
    },
  ],
} satisfies PostCard;
