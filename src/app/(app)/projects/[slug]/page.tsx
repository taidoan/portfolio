import type { Metadata } from 'next';
import configPromise from '@payload-config';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload';
import { cache } from 'react';
import { draftMode } from 'next/headers';
import { LivePreviewListener } from '@/components/features/LivePreview';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { RichText } from '@/components/ui/RichText';
import { ProjectHero } from '@/blocks/Hero/Project';
import type { Breadcrumb } from '@/components/ui/Breadcrumbs';
import { headingConverter } from '@/components/ui/RichText/converters/heading';
import { Redirects } from '@/components/features/Redirects';
import clsx from 'clsx';
import { Card, CardBody } from '@/components/ui/Card';
import { ProjectDetails } from '@/components/ui/Project/details';
import { ProjectGallery } from '@/components/ui/Project/gallery';

export type Args = {
  params: Promise<{ slug: string }>;
};

const Page = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = 'home' } = await paramsPromise;

  const url = '/projects/' + slug;
  const page: RequiredDataFromCollectionSlug<'projects'> | null = await queryPageBySlug({
    slug,
  });

  if (!page) return <Redirects url={url} />;

  const { hero } = page;
  const breadcrumbs = hero?.breadcrumbs;

  const pageIds =
    breadcrumbs?.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];

  const breadcrumbsData = await getBreadcrumbs(pageIds);

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
      <section className={clsx('project__section')}>
        <Card>
          <CardBody padding='large'>
            {page.content && <RichText converters={headingConverter} data={page.content} />}
          </CardBody>
        </Card>
      </section>
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
    collection: 'projects',
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
  const payload = await getPayload({ config: configPromise });

  const pagesData = await payload.find({
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

  const projectsData = await payload.find({
    collection: 'projects',
    where: { id: { in: pageIds } },
    select: {
      id: true,
      title: true,
    },
    depth: 0,
    pagination: false,
    overrideAccess: false,
  });

  const breadcrumbsData = [...pagesData.docs, ...projectsData.docs];

  const docsMap: Record<string | number, Breadcrumb> = {};
  breadcrumbsData.forEach((doc) => {
    docsMap[doc.id] = doc;
  });

  const orderedDocs = pageIds.map((id) => docsMap[id]).filter(Boolean);

  return orderedDocs;
});
