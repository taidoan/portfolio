import { cache } from 'react';
import { draftMode } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

/**
 * Queries a document by its slug within a specified collection.
 * This function is cached to improve performance on repeated calls with the same parameters.
 *
 * @template T - The collection type, restricted to 'projects', 'pages', 'categories', 'media', 'services', or 'posts'
 * @param {Object} params - The query parameters
 * @param {string} params.slug - The slug identifier of the document to query
 * @param {T} params.collection - The collection name to query against
 * @returns {Promise<RequiredDataFromCollectionSlug<T> | null>} A promise that resolves to the document if found, or null if not found
 * @throws {Error} If there's an issue with the payload CMS connection or query
 *
 * @example
 * // Query a page
 * const page = await queryPageBySlug({
 *   slug: 'about-us',
 *   collection: 'pages'
 * });
 *
 * @example
 * // Query a blog post
 * const post = await queryPageBySlug({
 *   slug: 'welcome-to-our-blog',
 *   collection: 'posts'
 * });
 *
 * @remarks
 * - The function respects draft mode from Next.js
 * - Returns the first matching document or null if no matches
 * - Override access control when in draft mode
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
