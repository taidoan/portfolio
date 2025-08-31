import type { Post } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';
import { generateUrl } from '@/lib/utilities/generateUrl';

export const beforeChangeUrl: CollectionBeforeChangeHook<Post> = async ({ data }) => {
  if (data?.slug) {
    data.url = generateUrl(data.slug, 'posts');
  }

  return data;
};
