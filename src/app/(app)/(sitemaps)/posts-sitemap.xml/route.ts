import { getServerSideSitemap } from 'next-sitemap';
import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import { SITE_URL } from '@lib/constants';
import config from '@payload-config';

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const posts = await payload.find({
      collection: 'posts',
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      depth: 0,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const dateFallback = new Date().toISOString();

    const siteMap = posts.docs
      ? posts.docs
          .filter((post) => Boolean(post.slug))
          .map((post) => ({
            loc: `${SITE_URL}/posts/${post.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : [];

    return siteMap;
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
);

export async function GET() {
  const sitemap = await getPostsSitemap();
  return getServerSideSitemap(sitemap);
}
