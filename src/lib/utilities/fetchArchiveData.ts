'use server';

import config from '@payload-config';
import { getPayload } from 'payload';
import type { CollectionSlug } from 'payload';

export const fetchArchiveData = async (
  collection: CollectionSlug | 'categories',
  page: number,
  limit: number,
  categoriesToArchive?: string[],
) => {
  try {
    const payload = await getPayload({ config: config });

    const targetCollection = collection === 'categories' ? 'projects' : collection;

    if (!targetCollection || !['projects', 'posts'].includes(targetCollection)) {
      return { success: false, error: 'Invalid collection' };
    }

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    const queryOptions: any = {
      collection: targetCollection,
      limit: limit,
      page: page,
      depth: 1,
      overrideAccess: false,
    };

    if (collection === 'categories' && categoriesToArchive && categoriesToArchive.length > 0) {
      queryOptions.where = {
        categories: {
          in: categoriesToArchive,
        },
      };
    }

    const content = await payload.find(queryOptions);

    return { success: true, data: content };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false, error: 'Server Action Error' };
  }
};
