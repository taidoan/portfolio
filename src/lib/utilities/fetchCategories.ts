'use server';
import { cache } from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

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
