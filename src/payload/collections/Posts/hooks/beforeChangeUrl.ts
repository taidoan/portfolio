import type { Post } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';

export const beforeChangeUrl: CollectionBeforeChangeHook<Post> = async ({ data }) => {
  if (data?.slug) {
    data.url = `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${data.slug}`;
  }

  return data;
};
