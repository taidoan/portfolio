import type { Metadata } from 'next';
import { getCDNURL } from './getURLs';
import { SITE_NAME, AUTHOR_NAME } from '@lib/constants';

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: `Explore the portfolio of ${AUTHOR_NAME}, a Birmingham-based UI/UX Designer specializing in web, branding, and app design. Crafting intuitive digital experiences that help businesses achieve their goals.`,
  siteName: SITE_NAME,
  title: `${SITE_NAME} | Web, Branding & App Design`,
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
