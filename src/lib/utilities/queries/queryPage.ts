import { cache } from 'react';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

/**
 * Query a page by its slug and collection.
 * @param {string} slug - The slug of the page to query.
 * @param {T} collection - The collection of the page to query.
 * @returns {Promise<RequiredDataFromCollectionSlug<T> | null>} - The page with the given slug.
 */
export const queryPageBySlug = cache(
  async <T extends 'projects' | 'pages' | 'categories' | 'media' | 'services' | 'posts'>({
    slug,
    collection,
  }: {
    slug: string;
    collection: T;
  }) => {
    if (!slug || !collection) {
      console.warn('Invalid query parameters: slug or collection missing');
      return null;
    }

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
