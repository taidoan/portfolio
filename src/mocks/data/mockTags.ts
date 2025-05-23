import type { Tag } from '@/payload-types';

export const mockTags = [
  {
    name: 'digital',
    id: '67ea8287a573c9541b45e571',
    relatedProjects: {
      docs: ['67e089f503bbd7fc5468ee2e', '67e0861b833394f03a2dd5fb'],
      hasNextPage: false,
    },

    relatedPosts: {
      docs: ['68210cd3b5f914e34fbce451', '68210bb8b5f914e34fbce12d', '67d1571540d3105ab50710d5'],
      hasNextPage: false,
    },
  },
  {
    name: 'posts',
    id: '67eaa662a573c9541b45e651',
  },
  {
    name: 'branding',
    id: '67eb0012a573c9541b45e700',
  },
  {
    name: 'ux',
    id: '67eb0025a573c9541b45e701',
    relatedProjects: {
      docs: ['67e089f503bbd7fc5468ee2e', '67e0861b833394f03a2dd5fb'],
      hasNextPage: false,
    },

    relatedPosts: {
      docs: ['68210cd3b5f914e34fbce451'],
      hasNextPage: false,
    },
  },
  {
    name: 'accessibility',
    id: '67eb0033a573c9541b45e702',
  },
  {
    name: 'web-design',
    id: '67eb0044a573c9541b45e703',
  },
  {
    name: 'react',
    id: '67eb0056a573c9541b45e704',
  },
  {
    name: 'freelance',
    id: '67eb0068a573c9541b45e705',
  },
  {
    name: 'motion',
    id: '67eb007aa573c9541b45e706',
  },
  {
    name: 'figma',
    id: '67eb008ba573c9541b45e707',
    relatedProjects: {
      docs: ['67e089f503bbd7fc5468ee2e'],
      hasNextPage: false,
    },

    relatedPosts: {
      docs: ['68210cd3b5f914e34fbce451'],
      hasNextPage: false,
    },
  },
  {
    name: 'portfolio',
    id: '67eb009ca573c9541b45e708',
  },
] satisfies Tag[];
