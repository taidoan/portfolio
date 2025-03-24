import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import { draftMode } from 'next/headers';
import { queryProjects } from '@/lib/utilities/queries/queryPagination';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { LivePreviewListener } from '@/components/features/LivePreview';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { RichText } from '@/components/ui/RichText';
import { ProjectHero } from '@/blocks/Hero/Project';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { Redirects } from '@/components/features/Redirects';
import clsx from 'clsx';
import { Card, CardBody } from '@/components/ui/Card';
import { ProjectDetails } from '@/components/ui/Project/details';
import { ProjectGallery } from '@/components/ui/Project/gallery';
import { ProjectPagination } from '@/components/ui/ProjectPagination';
import { CTA } from '@/components/layout/CTA';

export type Args = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await paramsPromise;

  const url = '/projects/' + slug;
  const page: RequiredDataFromCollectionSlug<'projects'> | null = await queryPageBySlug({
    slug,
    collection: 'projects',
  });

  const pagination = await queryProjects({ slug });

  if (!page) return <Redirects url={url} />;

  const { hero } = page;
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
      <ProjectHero heroData={page} breadcrumbsData={breadcrumbsData} />
      <section className={clsx('project__section', 'project__details')}>
        <Card className='project__description'>
          <CardBody padding='large'>
            {page.details?.description && (
              <RichText converters={headingConverter} data={page.details.description} />
            )}
          </CardBody>
        </Card>
        <ProjectDetails data={{ details: page.details }} className='project__info' />
      </section>
      <section className={clsx('project__section')}>
        <ProjectGallery
          media={{ gallery: page.gallery }}
          options={{ galleryOptions: page.galleryOptions }}
          className='project__gallery'
        />
      </section>
      {page.content && (
        <section className={clsx('project__section', 'project__content')}>
          <Card>
            <CardBody padding='large'>
              {<RichText converters={headingConverter} data={page.content} />}
            </CardBody>
          </Card>
        </section>
      )}
      <ProjectPagination className={clsx('project__section')} data={pagination} />
      {page.ctaContent && (
        <CTA
          className='project__section'
          link={page.ctaLink}
          content={page.ctaContent}
          variant={page.ctaAppearance?.blockVariant || 'fill'}
          color={page.ctaAppearance?.backgroundColour || 'primary'}
          borderRadius={page.ctaAppearance?.borderRadius || 'medium'}
        />
      )}
    </>
  );
};

export default Page;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = 'home' } = await paramsPromise;
  const page = await queryPageBySlug({ slug, collection: 'projects' });

  return generateMeta({ doc: page });
};
