import { getPayload } from 'payload';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getSitemapSiteUrl, sitemapXmlResponse } from '@/lib/utilities/sitemap';

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const siteUrl = getSitemapSiteUrl();

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

    return results.docs
      ? results.docs
          .filter((page) => Boolean(page.slug))
          .map((page) => {
            return {
              loc: page?.slug === 'home' ? `${siteUrl}/` : `${siteUrl}/${page.slug}`,
              lastmod: page.updatedAt || dateFallback,
            };
          })
      : [];
  },
  ['pages-sitemap'],
  { tags: ['pages-sitemap'] },
);

export async function GET() {
  try {
    const sitemap = await getPagesSitemap();
    return sitemapXmlResponse(sitemap);
  } catch (error) {
    console.error('Failed to generate pages sitemap', error);
    return sitemapXmlResponse([]);
  }
}
