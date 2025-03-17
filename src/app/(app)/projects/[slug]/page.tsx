import type { Metadata } from 'next';
import configPromise from '@payload-config';
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload';
import { cache } from 'react';
import { draftMode } from 'next/headers';
import { LivePreviewListener } from '@/components/features/LivePreview';
import { generateMeta } from '@/lib/utilities/generateMeta';
import { Redirects } from '@/components/features/Redirects';

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

  return <>Projects page here</>;
};

export default Page;

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
