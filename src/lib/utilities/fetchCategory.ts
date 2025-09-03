import { getPayload } from 'payload';
import configPromise from '@payload-config';

/**
 * Fetches a category by its ID from the 'categories' collection.
 *
 * @param catId - The ID of the category to fetch.
 * @returns A promise that resolves to the category result object, or logs an error if the fetch fails.
 *
 * @remarks
 * - Uses `getPayload` to obtain the payload client.
 * - Selects specific fields: `id`, `title`, `url`, and `slug`.
 * - Limits the result to 50 entries and sets query depth to 2.
 * - Errors are logged to the console.
 */
export const fetchCategory = async (catId: string) => {
  try {
    const payload = await getPayload({ config: configPromise });
    const categoryResult = await payload.find({
      collection: 'categories',
      where: {
        id: {
          equals: catId,
        },
      },
      depth: 2,
      limit: 50,
      select: {
        id: true,
        title: true,
        url: true,
        slug: true,
      },
    });

    return categoryResult;
  } catch (error) {
    console.error('Error fetching category:', error);
  }
};
