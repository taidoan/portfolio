'use server';

import config from '@payload-config';
import { getPayload } from 'payload';
import type { CollectionSlug } from 'payload';

export const fetchArchiveData = async (collection: CollectionSlug, page: number, limit: number) => {
  try {
    const payload = await getPayload({ config: config });

    if (!collection || !['projects', 'posts'].includes(collection)) {
      return { success: false, error: 'Invalid collection' };
    }

    const content = await payload.find({
      collection: collection,
      limit: limit,
      page: page,
      depth: 1,
      overrideAccess: false,
    });

    return { success: true, data: content };
  } catch (error) {
    console.error('Server Action Error:', error);
    return { success: false, error: 'Server Action Error' };
  }
};
