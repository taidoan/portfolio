import { getServerSideSitemap } from 'next-sitemap';
import { getPayload } from 'payload';
import { SITE_URL } from '@/lib/constants';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';

const getServicesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });

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
        loc: `${SITE_URL}/services`,
        lastmod: new Date().toISOString(),
      },
    ];

    const dateFallback = new Date().toISOString();

    const siteMap = results.docs
      ? results.docs
          .filter((service) => Boolean(service.slug))
          .map((service) => {
            return {
              loc: `${SITE_URL}/services/${service.slug}`,
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
  const sitemap = await getServicesSitemap();
  return getServerSideSitemap(sitemap);
}
