import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cache } from 'react';

import type { Breadcrumb } from '@/components/ui/Breadcrumbs';
import type { PaginatedDocs } from 'payload';
import type { Project, Service, Post, Category } from '@/payload-types';

/**
 * Queries breadcrumbs for the current page based on provided page IDs.
 *
 * This function fetches data from multiple collections (`pages`, `projects`, `services`, `posts`, and `categories`)
 * to construct a breadcrumb navigation structure.
 *
 * @param {Array<string | number>} pageIds - The IDs of the current page and its ancestors.
 *
 * @returns {Promise<Breadcrumb[]>} A promise resolving to an array of breadcrumb objects.
 *
 * @example
 * ```ts
 * const breadcrumbs = await queryBreadcrumbs(['123', '456']);
 * console.log(breadcrumbs);
 * ```
 */
export const queryBreadcrumbs = cache(async (pageIds: (string | number)[]) => {
  const payload = await getPayload({ config: configPromise });

  const pagesData = await payload.find({
    collection: 'pages',
    where: { id: { in: pageIds } },
    select: {
      id: true,
      title: true,
      slug: true,
      url: true,
    },
    depth: 0,
    pagination: false,
    overrideAccess: false,
  });

  let projectsData: PaginatedDocs<Project> | null = null;

  if (pageIds.length > 0) {
    projectsData = await payload.find({
      collection: 'projects',
      where: { id: { in: pageIds } },
      select: {
        id: true,
        title: true,
      },
      depth: 0,
      pagination: false,
      overrideAccess: false,
    });
  }

  let servicesData: PaginatedDocs<Service> | null = null;

  if (pageIds.length > 0) {
    servicesData = await payload.find({
      collection: 'services',
      where: { id: { in: pageIds } },
      select: {
        id: true,
        title: true,
      },
      depth: 0,
      pagination: false,
      overrideAccess: false,
    });
  }

  let postsData: PaginatedDocs<Post> | null = null;

  if (pageIds.length > 0) {
    postsData = await payload.find({
      collection: 'posts',
      where: { id: { in: pageIds } },
      select: {
        id: true,
        title: true,
      },
      depth: 0,
      pagination: false,
      overrideAccess: false,
    });
  }

  let categoriesData: PaginatedDocs<Category> | null = null;

  if (pageIds.length > 0) {
    categoriesData = await payload.find({
      collection: 'categories',
      where: { id: { in: pageIds } },
      select: {
        id: true,
        title: true,
        slug: true,
      },
      depth: 0,
      pagination: false,
      overrideAccess: false,
    });
  }

  const breadcrumbsData = [
    ...pagesData.docs,
    ...(projectsData?.docs ?? []),
    ...(servicesData?.docs ?? []),
    ...(postsData?.docs ?? []),
    ...(categoriesData?.docs ?? []),
  ];

  const docsMap: Record<string | number, Breadcrumb> = {};
  breadcrumbsData.forEach((doc) => {
    docsMap[doc.id] = doc;
  });

  return pageIds.map((id) => docsMap[id]).filter(Boolean);
});
