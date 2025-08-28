import { getServerSideSitemap } from 'next-sitemap';
import { getPayload } from 'payload';
import { unstable_cache } from 'next/cache';
import { SITE_URL } from '@/lib/constants';
import configPromise from '@payload-config';

const getCategoriesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });

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
        loc: `${SITE_URL}/categories`,
        lastmod: dateFallback,
      },
    ];

    const siteMap = results.docs
      ? results.docs
          .filter((category) => Boolean(category.slug))
          .map((category) => {
            return {
              loc: `${SITE_URL}/categories/${category.slug}`,
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
  const sitemap = await getCategoriesSitemap();
  return getServerSideSitemap(sitemap);
}
