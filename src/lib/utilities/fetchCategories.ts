'use server';
import { cache } from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

/**
 * Fetches the categories from the 'categories' collection.
 * @returns {Promise<PaginatedDocs<Category> | null>} - The categories.
 * @throws {Error} - If an error occurs during the fetch.
 * @example
 * const categories = await fetchCategories();
 * console.log(categories);
 *
 * // Output:
 * // {
 * //   docs: [
 * //     {
 * //       id: '67ceccd600d7591f31a008bc',
 * //       title: 'Branding',
 * //       slug: 'branding',
 * //       parentCategory: null,
 * //       updatedAt: '2025-03-10T11:33:28.064Z',
 * //       createdAt: '2025-03-10T11:33:28.064Z'
 * //     },
 * //     {
 * //       id: '67cecdbc00d7591f31a0091b',
 * //       title: 'Digital',
 * //       slug: 'digital',
 * //       parentCategory: null,
 * //       updatedAt: '2025-03-10T11:33:28.064Z',
 * //       createdAt: '2025-03-10T11:33:28.064Z'
 * //     },
 * //     {
 * //       id: '67cece0800d7591f31a00957',
 * //       title: 'Print',
 * //       slug: 'print',
 * //       parentCategory: null,
 * //       updatedAt: '2025-03-10T11:33:28.064Z',
 * //       createdAt: '2025-03-10T11:33:28.064Z'
 * //     },
 * //     {
 * //       id: '67cece0800d7591f31a00957',
 * //       title: 'Graphic Design',
 * //       slug: 'graphic-design',
 * //       parentCategory: null,
 * //       updatedAt: '2025-03-10T11:33:28.064Z',
 * //       createdAt: '2025-03-10T11:33:28.064Z'
 * //     }
 * //   ],
 * //   totalPages: 1,
 * //   page: 1,
 * //   limit: 50,
 * //   totalDocs: 3,
 * //   nextPage: null,
 * //   prevPage: null
 * // }
 */
export const fetchCategories = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise });
    const categoriesResult = await payload.find({
      collection: 'categories',
      pagination: false,
      depth: 2,
      limit: 50,
      sort: 'title',
      overrideAccess: false,
      select: {
        id: true,
        title: true,
        slug: true,
        parentCategory: true,
      },
    });

    const categoriesWithConsistentRefs = categoriesResult.docs.map((category) => {
      return {
        ...category,
        parentCategory: category.parentCategory
          ? typeof category.parentCategory === 'string'
            ? { id: category.parentCategory, title: 'Unknown' }
            : category.parentCategory
          : null,
      };
    });

    return {
      ...categoriesResult,
      docs: categoriesWithConsistentRefs,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
});
