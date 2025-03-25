import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import { draftMode } from 'next/headers';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { generateMeta } from '@/lib/utilities/generateMeta';
import clsx from 'clsx';

import { LivePreviewListener } from '@/components/features/LivePreview';
import { Redirects } from '@/components/features/Redirects';
import { RichText } from '@/components/ui/RichText';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { SlugPageHero } from '@/blocks/Hero/SlugPage';
import { RenderBlocks } from '@/blocks/RenderBlocks';
import { CTA } from '@/components/layout/CTA';

export type Args = {
  params: Promise<{ slug: string }>;
};

const ServicePage = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;
  const url = '/services/' + slug;
  const page: RequiredDataFromCollectionSlug<'services'> | null = await queryPageBySlug({
    slug,
    collection: 'services',
  });

  if (!page) return <Redirects url={url} />;

  const { hero, layout } = page;
  const breadcrumbs = hero?.breadcrumbs;

  const pageIds =
    breadcrumbs?.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];

  const breadcrumbsData = await queryBreadcrumbs(pageIds);

  return (
    <>
      <Redirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <SlugPageHero heroData={page} breadcrumbsData={breadcrumbsData} />
      <RenderBlocks blocks={layout} />
    </>
  );
};

export default ServicePage;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = 'home' } = await paramsPromise;
  const page = await queryPageBySlug({ slug, collection: 'services' });

  return generateMeta({ doc: page });
};
