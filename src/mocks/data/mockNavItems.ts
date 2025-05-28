import type { Footer } from '@/payload-types';

export const mockNavItems: Footer['navItems'] = [
  {
    link: {
      type: 'custom',
      label: 'Home',
      url: '/',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'About',
      url: '/about',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Work',
      url: '/projects',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Services',
      url: '/services',
    },
  },
  {
    link: {
      type: 'custom',
      label: 'Contact',
      url: '/contact',
    },
  },
];
