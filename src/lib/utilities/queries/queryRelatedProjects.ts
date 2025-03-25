import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cache } from 'react';

import type { CollectionSlug } from 'payload';
import { DataFromCollectionSlug } from 'payload';

type ValidCollection = Extract<CollectionSlug, 'projects' | 'posts'>;

interface QueryOptions {
  collection: ValidCollection;
  category?: string;
}

const VALID_COLLECTIONS = ['projects', 'posts'] as const;

export const queryRelatedProjects = cache(
  async ({
    collection,
    category,
  }: QueryOptions): Promise<DataFromCollectionSlug<ValidCollection>[]> => {
    if (!VALID_COLLECTIONS.includes(collection)) {
      throw new Error(
        `Invalid collection: ${collection}. Must be one of ${VALID_COLLECTIONS.join(', ')}`,
      );
    }

    try {
      const payload = await getPayload({ config: configPromise });

      const relatedItems = await payload.find({
        collection,
        limit: 3,
        pagination: false,
        overrideAccess: false,
        depth: 4,
        populate: {
          categories: {
            title: true,
            slug: true,
          },
        },
        select: {
          slug: true,
          id: true,
          title: true,
          details: {
            type: true,
          },
          categories: true,
          url: true,
          thumbnail: true,
        },
        where: category
          ? {
              'categories.slug': {
                equals: category,
              },
            }
          : {},
      });

      return relatedItems.docs;
    } catch (error) {
      console.error('Error querying related projects:', error);
      throw error;
    }
  },
);
