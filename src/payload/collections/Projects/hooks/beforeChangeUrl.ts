import type { Project } from '@/payload-types';
import type { CollectionBeforeChangeHook } from 'payload';

export const beforeChangeUrl: CollectionBeforeChangeHook<Project> = async ({ data }) => {
  if (data?.slug) {
    data.url = `${process.env.NEXT_PUBLIC_BASE_URL}/projects/${data.slug}`;
  }

  return data;
};
