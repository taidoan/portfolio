import type { Metadata } from 'next';
import type { Media, Page, Project, Service, Config } from '@/payload-types';
import { getCDNURL } from './getURLs';
import { mergeOpenGraph } from './mergeOpenGraph';

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const cdnURL = getCDNURL();
  const url = cdnURL + '/og_image.png';

  return url;
};

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Project> | Partial<Service>;
}): Promise<Metadata> => {
  const { doc } = args;

  const ogImage = getImageURL(
    doc?.meta?.image && typeof doc.meta.image === 'object' ? doc.meta.image : null,
  );

  const title = doc?.meta?.title || 'Tai Doan | UI/UX Designer - Online Portfolio';

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
