import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import clsx from 'clsx';

import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { generateMeta } from '@/lib/utilities/generateMeta';

import { LivePreviewListener } from '@/components/features/LivePreview';
import { ArchiveHero } from '@/blocks/Hero/Archive';
import { Redirects } from '@/components/features/Redirects';
import { CTA } from '@/components/layout/CTA';

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
  const { breadcrumb, ctaContent, ctaAppearance, ctaLink } = page;

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
      <section className={clsx('section', 'bg--gradient-grey', 'full-width')}>
        <section>hey</section>
      </section>
      {ctaContent && (
        <CTA
          content={ctaContent}
          link={ctaLink}
          color={ctaAppearance?.backgroundColour || 'primary'}
          variant={ctaAppearance?.blockVariant || 'fill'}
          borderRadius={ctaAppearance?.borderRadius || 'medium'}
        />
      )}
    </>
  );
};

export default CategoryPage;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = '' } = await paramsPromise;
  const page = await queryPageBySlug({ slug, collection: 'categories' });

  return generateMeta({ doc: page });
};
