import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { cache } from 'react';

import type { Breadcrumb } from '@/components/ui/Breadcrumbs';
import type { PaginatedDocs, CollectionSlug } from 'payload';
import type { Project, Service, Post, Category, Page } from '@/payload-types';

const fetchDocuments = async <T extends Page | Project | Service | Post | Category>(
  collection: CollectionSlug,
  pageIds: (string | number)[],
  selectFields: Record<string, boolean>,
): Promise<PaginatedDocs<T> | null> => {
  if (pageIds.length === 0) return null;

  const payload = await getPayload({ config: configPromise });

  const response = await payload.find({
    collection,
    where: { id: { in: pageIds } },
    select: selectFields,
    depth: 0,
    pagination: false,
    overrideAccess: false,
  });

  return response as PaginatedDocs<T>;
};

export const queryBreadcrumbs = cache(
  async (pageIds: (string | number)[]): Promise<Breadcrumb[]> => {
    const [pagesData, projectsData, servicesData, postsData, categoriesData] = await Promise.all([
      fetchDocuments<Page>('pages', pageIds, { id: true, title: true, slug: true, url: true }),
      fetchDocuments<Project>('projects', pageIds, { id: true, title: true }),
      fetchDocuments<Service>('services', pageIds, { id: true, title: true }),
      fetchDocuments<Post>('posts', pageIds, { id: true, title: true }),
      fetchDocuments<Category>('categories', pageIds, { id: true, title: true, slug: true }),
    ]);

    const breadcrumbsData = [
      ...(pagesData?.docs ?? []),
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
  },
);
