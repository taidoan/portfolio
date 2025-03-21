import { cache } from 'react';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const queryPageBySlug = cache(
  async <T extends 'projects' | 'pages' | 'categories' | 'media' | 'services' | 'posts'>({
    slug,
    collection,
  }: {
    slug: string;
    collection: T;
  }) => {
    const { isEnabled: draft } = await draftMode();
    const payload = await getPayload({ config: configPromise });

    const result = await payload.find({
      collection: collection,
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    return result.docs?.[0] || null;
  },
);
