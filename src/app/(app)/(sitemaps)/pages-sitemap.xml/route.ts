import { getServerSideSitemap } from 'next-sitemap';
import { getPayload } from 'payload';
import { SITE_URL } from '@/lib/constants';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      pagination: false,
      limit: 1000,
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

    const defaultSiteMap = [
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/tags`,
        lastmod: dateFallback,
      },
    ];

    const siteMap = results.docs
      ? results.docs
          .filter((page) => Boolean(page.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page.slug}`,
              lastmod: page.updatedAt || dateFallback,
            };
          })
      : [];

    return [...defaultSiteMap, ...siteMap];
  },
  ['pages-sitemap'],
  { tags: ['pages-sitemap'] },
);

export async function GET() {
  const sitemap = await getPagesSitemap();
  return getServerSideSitemap(sitemap);
}
