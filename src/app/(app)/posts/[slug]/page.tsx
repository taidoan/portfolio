import type { Metadata } from 'next';
import type { RequiredDataFromCollectionSlug } from 'payload';
import type { Tag } from '@/payload-types';

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { draftMode } from 'next/headers';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { queryBreadcrumbs } from '@/lib/utilities/queries/queryBreadcrumbs';
import { queryPageBySlug } from '@/lib/utilities/queries/queryPage';

import { LivePreviewListener } from '@/components/features/LivePreview';
import { Redirects } from '@/components/features/Redirects';
import { RenderPostBlocks } from '@/payload/blocks/RenderBlocks';

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

  if (!page) return <Redirects url={url} />;

  const { hero, layout, tags, showShareButton } = page;

  return (
    <>
      <Redirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <section>
        <RenderPostBlocks
          blocks={layout}
          {...{ pageTags: tags as Tag[] }}
          {...{ showShareButton: showShareButton as boolean }}
        />
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
