import type { Metadata } from 'next';
import type { Tag, SiteSetting } from '@/payload-types';

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

  try {
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

    return projects.docs.map(({ slug }) => ({ slug }));
  } catch (error) {
    console.error('Error generating static params for projects:', error);
    return [];
  }
};

export type Args = {
  params: Promise<{ slug: string }>;
};

const getProjectData = async ({ slug }: { slug: string }) => {
  const [pageResult, paginationResult, siteSettingsResult] = await Promise.allSettled([
    queryPageBySlug({ slug, collection: 'projects' }),
    queryProjects({ slug }),
    getCachedGlobal('site-settings')(),
  ]);

  const page = pageResult.status === 'fulfilled' ? pageResult.value : null;
  const pagination = paginationResult.status === 'fulfilled' ? paginationResult.value : null;
  const siteSettings =
    siteSettingsResult.status === 'fulfilled' ? (siteSettingsResult.value as SiteSetting) : null;

  return { page, pagination, siteSettings };
};

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;

  const url = '/projects/' + slug;
  const { page, pagination, siteSettings } = await getProjectData({ slug });

  if (!page) return <Redirects url={url} />;

  const {
    hero,
    tags,
    showShareButton,
    content,
    ctaContent,
    details,
    categories,
    thumbnail,
    gallery,
    galleryOptions,
    title,
    ctaLink,
    ctaAppearance,
  } = page;

  const breadcrumbs = hero?.breadcrumbs;
  const pageIds =
    breadcrumbs?.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];
  const breadcrumbsData = await queryBreadcrumbs(pageIds);

  const socialData = siteSettings?.socialSharing?.shareNetworks ?? [];
  const plainTextDescription = details && extractPlainText(details.description!);
  const pinterestImage =
    thumbnail && typeof thumbnail === 'object' && thumbnail?.filename ? thumbnail.filename : '';

  const ctaVariant = ctaAppearance?.blockVariant || 'fill';
  const ctaColor = ctaAppearance?.backgroundColour || 'primary';
  const ctaBorderRadius = ctaAppearance?.borderRadius || 'medium';

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
        <ProjectDetails data={{ details, categories }} className='project__info' />
      </section>
      <section className={clsx('project__section', 'project__gallery')}>
        <ProjectGallery media={{ gallery }} options={{ galleryOptions }} />
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
              title={title}
              url={page.url!}
              description={plainTextDescription}
              pinterestImage={pinterestImage}
            />
          )}
        </section>
      )}
      {pagination && (
        <ProjectPagination
          className={clsx('project__section', 'project__pagination')}
          data={pagination}
        />
      )}
      {ctaContent && (
        <CTA
          className='project__section project__cta'
          link={ctaLink}
          content={ctaContent}
          variant={ctaVariant}
          color={ctaColor}
          borderRadius={ctaBorderRadius}
        />
      )}
    </>
  );
};

export default Page;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = '' } = await paramsPromise;
  const { page } = await getProjectData({ slug });

  if (!page) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return generateMeta({ doc: page });
};
