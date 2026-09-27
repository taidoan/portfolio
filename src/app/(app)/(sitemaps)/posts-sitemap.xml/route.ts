import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import config from '@payload-config';
import { getSitemapSiteUrl, sitemapXmlResponse } from '@/lib/utilities/sitemap';

const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const siteUrl = getSitemapSiteUrl();

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

    return posts.docs
      ? posts.docs
          .filter((post) => Boolean(post.slug))
          .map((post) => ({
            loc: `${siteUrl}/posts/${post.slug}`,
            lastmod: post.updatedAt || dateFallback,
          }))
      : [];
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
);

export async function GET() {
  try {
    const sitemap = await getPostsSitemap();
    return sitemapXmlResponse(sitemap);
  } catch (error) {
    console.error('Failed to generate posts sitemap', error);
    return sitemapXmlResponse([]);
  }
}
