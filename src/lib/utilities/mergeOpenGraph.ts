import type { Metadata } from 'next';
import { getCDNURL } from './getURLs';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Explore the portfolio of Tai Doan, a Birmingham-based UI/UX Designer specializing in web, branding, and app design. Crafting intuitive digital experiences that help businesses achieve their goals.',
  siteName: 'Tai Doan | UI/UX Designer',
  title: 'Tai Doan – UI/UX Designer | Web, Branding & App Design',
  images: [
    {
      url: `${getCDNURL()}/og-image.png`,
    },
  ],
};

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  };
};
