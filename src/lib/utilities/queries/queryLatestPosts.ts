'use server';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { cache } from 'react';
export const queryLatestPosts = cache(async ({ limit = 6 }: { limit?: number } = {}) => {
  try {
    const payload = await getPayload({ config: configPromise });
    const posts = await payload.find({
      collection: 'posts',
      limit,
      sort: '-createdAt',
      overrideAccess: false,
      populate: {
        categories: {
          title: true,
          slug: true,
        },
      },
      select: {
        title: true,
        slug: true,
        url: true,
        createdAt: true,
      },
      pagination: false,
    });

    const projects = await payload.find({
      collection: 'projects',
      limit,
      sort: '-createdAt',
      overrideAccess: false,
      populate: {
        categories: {
          title: true,
          slug: true,
        },
      },
      select: {
        title: true,
        slug: true,
        url: true,
        createdAt: true,
      },
      pagination: false,
    });

    const combined = [...posts.docs, ...projects.docs].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    return { docs: combined };
  } catch (error) {
    console.error('Error querying latest posts:', error);
    throw error;
  }
});
