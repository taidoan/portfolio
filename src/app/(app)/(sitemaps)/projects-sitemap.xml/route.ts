import { getPayload } from 'payload';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getSitemapSiteUrl, sitemapXmlResponse } from '@/lib/utilities/sitemap';

const getProjectsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const siteUrl = getSitemapSiteUrl();

    const results = await payload.find({
      collection: 'projects',
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
          .filter((project) => Boolean(project.slug))
          .map((project) => {
            return {
              loc: `${siteUrl}/projects/${project.slug}`,
              lastmod: project.updatedAt || dateFallback,
            };
          })
      : [];
  },
  ['projects-sitemap'],
  { tags: ['projects-sitemap'] },
);

export async function GET() {
  try {
    const sitemap = await getProjectsSitemap();
    return sitemapXmlResponse(sitemap);
  } catch (error) {
    console.error('Failed to generate projects sitemap', error);
    return sitemapXmlResponse([]);
  }
}
