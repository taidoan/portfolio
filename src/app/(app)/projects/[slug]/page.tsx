import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import type { Tag } from '@/payload-types';

import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { draftMode } from 'next/headers';
import { queryProjects } from '@/lib/utilities/queries/queryPagination';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';
import { extractPlainText } from '@/lib/utilities/extractPlainText';

import { RichText } from '@/components/ui/RichText';
import { SlugPageHero } from '@/payload/blocks/Hero/SlugPage';
import { LivePreviewListener } from '@/components/features/LivePreview';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { Redirects } from '@/components/features/Redirects';
import clsx from 'clsx';
import { Card, CardBody } from '@/components/ui/Card';
import { ProjectDetails } from '@/components/ui/Project/details';
import { ProjectGallery } from '@/components/ui/Project/gallery';
import { ProjectPagination } from '@/components/ui/ProjectPagination';
import { CTA } from '@/components/layout/CTA';
import { TaggedWith } from '@/components/ui/TaggedWith';
import { SocialShare } from '@/components/ui/SocialShare';

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise });
  const projects = await payload.find({
    collection: 'projects',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = projects.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
};

export type Args = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;

  const url = '/projects/' + slug;
  const page: RequiredDataFromCollectionSlug<'projects'> | null = await queryPageBySlug({
    slug,
    collection: 'projects',
  });

  const pagination = await queryProjects({ slug });

  if (!page) return <Redirects url={url} />;

  const { hero, tags, showShareButton, content, ctaContent, details, thumbnail } = page;
  const breadcrumbs = hero?.breadcrumbs;
  const socialData = await getCachedGlobal('social', 2)();
  const plainTextDescription = details && extractPlainText(details.description!);

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
      <section className={clsx('section', 'project__details')}>
        <Card className='project__description'>
          <CardBody padding='large'>
            {details?.description && (
              <RichText converters={headingConverter} data={details.description} />
            )}
          </CardBody>
        </Card>
        <ProjectDetails data={{ details: details }} className='project__info' />
      </section>
      <section className={clsx('project__section', 'project__gallery')}>
        <ProjectGallery
          media={{ gallery: page.gallery }}
          options={{ galleryOptions: page.galleryOptions }}
        />
      </section>
      {content && (
        <section className={clsx('project__section', 'project__content')}>
          <Card>
            <CardBody padding='large'>
              {<RichText converters={headingConverter} data={content} />}
            </CardBody>
          </Card>
        </section>
      )}
      {(tags || showShareButton) && (
        <section className={clsx('project__section', 'project__tags-share')}>
          {tags && (
            <TaggedWith
              tags={tags as Tag[]}
              className='project__section project__tags'
              numberOfTags={8}
              showTitle={true}
              title='Project Tags:'
            />
          )}
          {showShareButton && (
            <SocialShare
              data={socialData}
              title={page.title}
              url={page.url!}
              description={plainTextDescription}
              pinterestImage={
                thumbnail && typeof thumbnail === 'object' && thumbnail?.filename
                  ? thumbnail.filename
                  : ''
              }
            />
          )}
        </section>
      )}
      <ProjectPagination
        className={clsx('project__section', 'project__pagination')}
        data={pagination}
      />
      {ctaContent && (
        <CTA
          className='project__section project__cta'
          link={page.ctaLink}
          content={ctaContent}
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
  const { slug = '' } = await paramsPromise;
  const page = await queryPageBySlug({ slug, collection: 'projects' });

  return generateMeta({ doc: page });
};
