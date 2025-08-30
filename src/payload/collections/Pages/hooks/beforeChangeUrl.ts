import type { Page } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';

export const beforeChangeUrl: CollectionBeforeChangeHook<Page> = async ({ data }) => {
  if (data?.slug) {
    data.url = `${process.env.NEXT_PUBLIC_BASE_URL}/${data.slug}`;
  }

  return data;
};
