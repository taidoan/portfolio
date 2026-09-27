import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import configPromise from '@payload-config';
import { getSitemapSiteUrl, sitemapXmlResponse } from '@/lib/utilities/sitemap';

const getCategoriesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const siteUrl = getSitemapSiteUrl();

    const results = await payload.find({
      collection: 'categories',
      overrideAccess: false,
      draft: false,
      depth: 0,
      pagination: false,
      limit: 1000,
      select: {
        slug: true,
      },
    });

    const dateFallback = new Date().toISOString();

    const defaultSiteMap = [
      {
        loc: `${siteUrl}/categories`,
        lastmod: dateFallback,
      },
    ];

    const siteMap = results.docs
      ? results.docs
          .filter((category) => Boolean(category.slug))
          .map((category) => {
            return {
              loc: `${siteUrl}/categories/${category.slug}`,
              lastmod: dateFallback,
            };
          })
      : [];

    return [...defaultSiteMap, ...siteMap];
  },
  ['categories-sitemap'],
  { tags: ['categories-sitemap'] },
);

export async function GET() {
  try {
    const sitemap = await getCategoriesSitemap();
    return sitemapXmlResponse(sitemap);
  } catch (error) {
    console.error('Failed to generate categories sitemap', error);
    return sitemapXmlResponse([]);
  }
}
