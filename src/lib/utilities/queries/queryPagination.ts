import { cache } from 'react';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

/**
 * Query the previous and next project in the 'projects' collection.
 * @param {string} slug - The slug of the current project.
 * @returns {Promise<{ prevProject: Project | null; nextProject: Project | null; }>} - The previous and next project.
 */
export const queryProjects = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise });
  const {
    docs: [currentProject],
  } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!currentProject) {
    throw new Error('Current project not found');
  }

  const { createdAt } = currentProject;

  let {
    docs: [prevProject],
  } = await payload.find({
    collection: 'projects',
    where: { createdAt: { less_than: createdAt } },
    sort: '-createdAt',
    select: {
      id: true,
      slug: true,
      title: true,
    },
    limit: 1,
  });

  let {
    docs: [nextProject],
  } = await payload.find({
    collection: 'projects',
    where: { createdAt: { greater_than: createdAt } },
    sort: 'createdAt',
    limit: 1,
    select: {
      id: true,
      slug: true,
      title: true,
    },
  });

  if (!prevProject) {
    const {
      docs: [latestProject],
    } = await payload.find({
      collection: 'projects',
      sort: '-createdAt',
      limit: 1,
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
    prevProject = latestProject;
  }

  if (!nextProject) {
    const {
      docs: [earliestProject],
    } = await payload.find({
      collection: 'projects',
      sort: 'createdAt',
      limit: 1,
      select: {
        id: true,
        slug: true,
        title: true,
      },
    });
    nextProject = earliestProject;
  }

  return { prevProject, nextProject };
});
