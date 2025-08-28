import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';

import clsx from 'clsx';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';
import { getCachedPageID } from '@/lib/utilities/getPageID';

import { LivePreviewListener } from '@/components/features/LivePreview';
import { Redirects } from '@/components/features/Redirects';
import { CTA } from '@/components/layout/CTA';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/Button';
import { ArchiveBlock } from '@/payload/blocks/Archive';
import { RenderBlocks } from '@/payload/blocks/RenderBlocks';
import { ArchiveHero } from '@/payload/blocks/Hero/Archive';

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise });
  const categories = await payload.find({
    collection: 'categories',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = categories.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
};

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
  const { breadcrumb, ctaContent, ctaAppearance, ctaLink, layout } = page;

  const resolvedPageIds = await Promise.all([
    getCachedPageID('home'),
    getCachedPageID('categories'),
  ]);

  const pageIds = (() => {
    if (breadcrumb && Array.isArray(breadcrumb.breadcrumbs) && breadcrumb.breadcrumbs.length > 0) {
      return breadcrumb.breadcrumbs.map((breadcrumbItem) => {
        const value = breadcrumbItem.relationTo.value;
        return typeof value === 'object' && value !== null ? value.id : value;
      });
    }

    return [...resolvedPageIds, `${page.id}`];
  })();

  const breadcrumbsData = await queryBreadcrumbs(pageIds);
  const sidebarData = await getCachedGlobal('sidebar', 2)();

  return (
    <>
      <Redirects disableNotFound url={url} />
      {<LivePreviewListener />}
      <ArchiveHero heroData={page} breadcrumbsData={breadcrumbsData} />
      <section className={clsx('section', 'bg--gradient-grey', 'full-width', 'categories__main')}>
        <section className={clsx('section__wrapper', 'categories__wrapper')}>
          <div className={clsx('col-span-11', 'categories__content')}>
            {layout && layout.length > 0 ? (
              <RenderBlocks blocks={layout} />
            ) : (
              <ArchiveBlock
                data='categories'
                categoriesToArchive={[`${page?.id}`]}
                showFilter={false}
                numberOfProjects={6}
                viewType={'grid'}
                page={'archive'}
                blockType='archiveBlock'
              />
            )}
          </div>
          <Sidebar data={sidebarData} className='col-span-5' />
        </section>
      </section>
      {ctaContent ? (
        <CTA
          content={ctaContent}
          link={ctaLink}
          color={ctaAppearance?.backgroundColour || 'primary'}
          variant={ctaAppearance?.blockVariant || 'fill'}
          borderRadius={ctaAppearance?.borderRadius || 'medium'}
        />
      ) : (
        <CTA color='primary'>
          <p>
            Impressed with my work? I&apos;d love to discuss new projects and opportunities.
            Let&apos;s build something amazing together!
          </p>
          <Button color='secondary' hoverColor='accent' href='/contact' shadow='medium'>
            Get In Touch
          </Button>
        </CTA>
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
