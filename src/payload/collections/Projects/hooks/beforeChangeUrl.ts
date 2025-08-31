import type { Project } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';
import { generateUrl } from '@/lib/utilities/generateUrl';

export const beforeChangeUrl: CollectionBeforeChangeHook<Project> = async ({ data }) => {
  if (data?.slug) {
    data.url = generateUrl(data.slug, 'projects');
  }

  return data;
};
