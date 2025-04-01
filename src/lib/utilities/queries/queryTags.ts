'use server';
import { cache } from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const queryTags = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise });
    const tagsResult = await payload.find({
      collection: 'tags',
      pagination: false,
      depth: 1,
      limit: 50,
      sort: 'name',
      overrideAccess: false,
      select: {
        id: true,
        name: true,
      },
    });

    return tagsResult;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
});
