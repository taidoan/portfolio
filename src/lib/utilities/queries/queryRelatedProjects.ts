import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cache } from 'react';

import type { CollectionSlug } from 'payload';
import { DataFromCollectionSlug } from 'payload';

export type ValidCollection = Extract<CollectionSlug, 'projects' | 'posts'>;

export type QueryOptions = {
  collection: ValidCollection;
  category: string;
  items?: number;
};

const VALID_COLLECTIONS = ['projects', 'posts'] as const;

/**
 * Queries related posts or projects from a specified collection based on category.
 *
 * @param {QueryOptions} options - The options for the query.
 * @param {ValidCollection} options.collection - The collection slug to query ('projects' or 'posts').
 * @param {string} options.category - The category slug to filter results by.
 * @param {number} [options.items=3] - The number of items to return (default is 3).
 * @returns {Promise<Array<DataFromCollectionSlug>>} - A promise that resolves to an array of related items.
 *
 * @example
 * const relatedProjects = await queryRelatedProjects({
 *   collection: 'projects',
 *   category: 'design',
 *   items: 3,
 * });
 * console.log(relatedProjects); // Logs an array of project objects with category 'design'
 */
export const queryRelatedProjects = cache(
  async ({
    collection,
    category,
    items = 3,
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
        limit: items,
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
          relationTo: true,
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
