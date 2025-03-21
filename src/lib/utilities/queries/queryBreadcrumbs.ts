import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cache } from 'react';

import type { Breadcrumb } from '@/components/ui/Breadcrumbs';
import type { PaginatedDocs } from 'payload';
import type { Project } from '@/payload-types';

/**
 * Query the breadcrumbs for the current page.
 * @param {(string | number)[]} pageIds - The ids of the current page and its ancestors.
 * @returns {Promise<Breadcrumb[]>} - The breadcrumbs for the current page.
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

  const breadcrumbsData = [...pagesData.docs, ...(projectsData?.docs ?? [])];

  const docsMap: Record<string | number, Breadcrumb> = {};
  breadcrumbsData.forEach((doc) => {
    docsMap[doc.id] = doc;
  });

  return pageIds.map((id) => docsMap[id]).filter(Boolean);
});
