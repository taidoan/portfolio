import type { Page } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';
import { generateUrl } from '@/lib/utilities/generateUrl';

export const beforeChangeUrl: CollectionBeforeChangeHook<Page> = async ({ data }) => {
  if (data?.slug) {
    data.url = generateUrl(data.slug);
  }

  return data;
};
