import type { Service } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';
import { generateUrl } from '@/lib/utilities/generateUrl';

export const beforeChangeUrl: CollectionBeforeChangeHook<Service> = async ({ data }) => {
  if (data?.slug) {
    data.url = generateUrl(data.slug, 'services');
  }

  return data;
};
