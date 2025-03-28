import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import clsx from 'clsx';

import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { generateMeta } from '@/lib/utilities/generateMeta';

import { LivePreviewListener } from '@/components/features/LivePreview';
import { ArchiveHero } from '@/blocks/Hero/Archive';
import { Redirects } from '@/components/features/Redirects';

export type Args = {
  params: Promise<{ slug: string }>;
};

const CategoryPage = async ({ params: paramsPromise }: Args) => {
  const { slug = '' } = await paramsPromise;
  const url = '/categories/' + slug;

  const page: RequiredDataFromCollectionSlug<'categories'> | null = await queryPageBySlug({
    slug,
    collection: 'categories',
  });

  if (!page) return <Redirects url={url} />;
  const { heroContent, breadcrumb } = page;

  const pageIds =
    breadcrumb?.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];

  const breadcrumbsData = await queryBreadcrumbs(pageIds);

  return (
    <>
      <Redirects disableNotFound url={url} />
      {<LivePreviewListener />}
      <ArchiveHero heroData={page} breadcrumbsData={breadcrumbsData} />
    </>
  );
};

export default CategoryPage;
