import type { Metadata } from 'next';
import type { Media, Page, Project, Service, Config, Post, SiteSetting } from '@/payload-types';
import { getCDNURL } from './getURLs';
import { getCachedGlobal } from './getGlobal';
import { mergeOpenGraph } from './mergeOpenGraph';
import { SITE_NAME } from '@lib/constants';

let cachedSettings: SiteSetting | null = null;

const getSettings = async (): Promise<SiteSetting> => {
  if (!cachedSettings) {
    cachedSettings = (await getCachedGlobal('site-settings')()) as SiteSetting;
  }
  return cachedSettings;
};

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const cdnURL = getCDNURL();
  const url = cdnURL + '/og_image.png';

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Project> | Partial<Service> | Partial<Post> | null;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(
    doc?.meta?.image && typeof doc.meta.image === 'object' ? doc.meta.image : null,
  );

  const settings = await getSettings();

  const title = doc?.meta?.title || `${settings?.siteName || SITE_NAME}`;

  return {
    title,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
  };
};
