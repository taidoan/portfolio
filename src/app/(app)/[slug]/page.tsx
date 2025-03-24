import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import { draftMode } from 'next/headers';
import { LivePreviewListener } from '@/components/features/LivePreview';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { Redirects } from '@/components/features/Redirects';
import { RenderHero } from '@/blocks/Hero/renderHero';
import { RenderBlocks } from '@/blocks/RenderBlocks';

export type Args = {
  params: Promise<{
    slug?: string;
  }>;
};

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await paramsPromise;

  const url = '/' + slug;

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({
    slug,
    collection: 'pages',
  });

  if (!page) return <Redirects url={url} />;

  const { hero, layout } = page;

  const pageIds =
    hero.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];

  const breadcrumbsData = await queryBreadcrumbs(pageIds);

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
  const page = await queryPageBySlug({ slug, collection: 'pages' });

  return generateMeta({ doc: page });
};
