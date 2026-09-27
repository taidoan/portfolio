import { getPayload } from 'payload';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getSitemapSiteUrl, sitemapXmlResponse } from '@/lib/utilities/sitemap';

const getServicesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const siteUrl = getSitemapSiteUrl();

    const results = await payload.find({
      collection: 'services',
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

    const defaultSiteMap = [
      {
        loc: `${siteUrl}/services`,
        lastmod: new Date().toISOString(),
      },
    ];

    const dateFallback = new Date().toISOString();

    const siteMap = results.docs
      ? results.docs
          .filter((service) => Boolean(service.slug))
          .map((service) => {
            return {
              loc: `${siteUrl}/services/${service.slug}`,
              lastmod: service.updatedAt || dateFallback,
            };
          })
      : [];

    return [...defaultSiteMap, ...siteMap];
  },
  ['services-sitemap'],
  { tags: ['services-sitemap'] },
);

export async function GET() {
  try {
    const sitemap = await getServicesSitemap();
    return sitemapXmlResponse(sitemap);
  } catch (error) {
    console.error('Failed to generate services sitemap', error);
    return sitemapXmlResponse([]);
  }
}
