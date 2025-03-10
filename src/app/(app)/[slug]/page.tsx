import type { Metadata } from 'next';
import configPromise from '@payload-config';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload';
import { cache } from 'react';
import { draftMode } from 'next/headers';
import { LivePreviewListener } from '@/components/features/LivePreview';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { Redirects } from '@/components/features/Redirects';
import { RenderHero } from '@/blocks/Hero/renderHero';
import { RenderBlocks } from '@/blocks/RenderBlocks';
import config from '@payload-config';
import type { Breadcrumb } from '@/components/ui/Breadcrumbs';
import { Archive } from '@/components/ui/Archive';

export type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await paramsPromise;
  const payload = await getPayload({ config: config });
  const url = '/' + slug;

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
  });

  if (!page) return <Redirects url={url} />;

  const { hero, layout } = page;

  const pageIds =
    hero.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];

  const breadcrumbsData = await getBreadcrumbs(pageIds);

  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth: 2,
    limit: 4,
    overrideAccess: false,
  });

  const categoryIdsWithProjects = new Set();

  projects.forEach((project) => {
    project?.categories?.forEach((category) => {
      if (typeof category === 'object' && category?.id) {
        categoryIdsWithProjects.add(category.id);
      }
    });
  });

  const { docs: categories } = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: { title: true, slug: true, description: true, updatedAt: true, createdAt: true },
    where: { id: { in: Array.from(categoryIdsWithProjects) }, parentCategory: { exists: false } },
  });

  return (
    <>
      <Redirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <RenderHero heroData={hero} breadcrumbsData={breadcrumbsData} />
      <RenderBlocks blocks={layout} />
    </>
  );
};

export default Page;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = 'home' } = await paramsPromise;
  const page = await queryPageBySlug({ slug });

  return generateMeta({ doc: page });
};

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode();

  const payload = await getPayload({ config: configPromise });

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  return result.docs?.[0] || null;
});

const getBreadcrumbs = cache(async (pageIds: (string | number)[]) => {
  const payload = await getPayload({ config });

  const breadcrumbsData = await payload.find({
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

  const docsMap: Record<string | number, Breadcrumb> = {};

  breadcrumbsData.docs.forEach((doc) => {
    docsMap[doc.id] = doc;
  });

  const orderedDocs = pageIds.map((id) => docsMap[id]).filter(Boolean);

  return orderedDocs;
});
