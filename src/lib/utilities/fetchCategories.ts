'use server';
import { cache } from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const fetchCategories = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise });
    const categories = await payload.find({
      collection: 'categories',
      pagination: false,
      depth: 1,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
      },
    });

    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
});
