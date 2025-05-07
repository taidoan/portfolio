import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import type { Tag } from '@/payload-types';
import type { PostMeta } from '@/components/layout/Sidebar';

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';
import { getCachedGlobal } from '@/lib/utilities/getGlobal';
import { getServerSideURL, getClientSideURL } from '@/lib/utilities/getURLs';

import Sidebar from '@/components/layout/Sidebar';

import clsx from 'clsx';

import { LivePreviewListener } from '@/components/features/LivePreview';
import { Redirects } from '@/components/features/Redirects';
import { RenderPostBlocks } from '@/payload/blocks/RenderBlocks';
import { PostHero } from '@/payload/blocks/Hero/Post';

export const generateStaticParams = async () => {
  const payload = await getPayload({ config: configPromise });
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  });

  const params = posts.docs.map(({ slug }) => {
    return { slug };
  });

  return params;
};

export type Args = {
  params: Promise<{ slug: string }>;
};

const Post = async ({ params: paramsPromise }: Args) => {
  const { isEnabled: draft } = await draftMode();
  const { slug = '' } = await paramsPromise;

  const url = '/posts/' + slug;
  const page: RequiredDataFromCollectionSlug<'posts'> | null = await queryPageBySlug({
    slug,
    collection: 'posts',
  });
  const fullUrl = getServerSideURL() + url;

  const payload = await getPayload({ config: configPromise });
  const category = await payload.findByID({
    id: page?.categories[0] as string,
    collection: 'categories',
    depth: 0,
    select: {
      title: true,
    },
  });

  if (!page) return <Redirects url={url} />;

  const {
    hero,
    layout,
    tags,
    showShareButton,
    populatedAuthors,
    publishedAt,
    excerpt,
    pageLayout,
  } = page;
  const breadcrumbs = hero?.breadcrumbs;

  const pageIds =
    breadcrumbs?.breadcrumbs?.map((breadcrumb) => {
      const value = breadcrumb.relationTo.value;
      return typeof value === 'object' && value !== null ? value.id : value;
    }) || [];

  const breadcrumbsData = await queryBreadcrumbs(pageIds);

  const heroData = {
    category: hero.subtitle || category.title,
    title: hero.titleOverride || page.title,
    author: populatedAuthors?.[0].name,
    publishedDate: publishedAt ? new Date(publishedAt).toLocaleDateString() : '',
    excerpt: excerpt,
    breadcrumbsData: breadcrumbsData,
  };

  const sidebarData = await getCachedGlobal('sidebar', 2)();
  const socialData = await getCachedGlobal('social', 2)();
  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
    select: {
      title: true,
      slug: true,
    },
    where: {
      id: {
        in: page.categories,
      },
    },
  });

  const postMeta = {
    publishedDate: publishedAt,
    author: populatedAuthors?.[0].name,
    categories: categories.docs.map((category) => ({
      title: category.title,
      url: `${getServerSideURL()}/categories/${category.slug}`,
    })),
  } as PostMeta;

  return (
    <>
      <Redirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <PostHero data={heroData} />
      <section className={clsx('section', 'bg--gradient-grey', 'full-width')}>
        <section className={clsx('section__wrapper', 'post__wrapper')}>
          <div
            className={clsx('post__section', {
              'col-span-11': pageLayout === 'sidebar',
              'col-span-16': pageLayout === 'full-width',
            })}
          >
            <RenderPostBlocks
              blocks={layout}
              {...{ socialData: socialData }}
              {...{ pageTags: tags as Tag[] }}
              {...{ showShareButton: showShareButton as boolean }}
              url={page.url || fullUrl || getClientSideURL()}
              title={page.title}
              description={page.excerpt || ''}
              buttonLabel={page.shareButtonLabel || 'Share'}
            />
          </div>
          {pageLayout === 'sidebar' && (
            <Sidebar data={sidebarData} className='col-span-5' type='post' postMeta={postMeta} />
          )}
        </section>
      </section>
    </>
  );
};

export default Post;

export const generateMetadata = async ({ params: paramsPromise }: Args): Promise<Metadata> => {
  const { slug = '' } = await paramsPromise;
  const page = await queryPageBySlug({ slug, collection: 'posts' });

  return generateMeta({ doc: page });
};
