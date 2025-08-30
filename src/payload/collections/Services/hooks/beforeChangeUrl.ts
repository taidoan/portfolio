import type { Service } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';

export const beforeChangeUrl: CollectionBeforeChangeHook<Service> = async ({ data }) => {
  if (data?.slug) {
    data.url = `${process.env.NEXT_PUBLIC_BASE_URL}/services/${data.slug}`;
  }

  return data;
};
