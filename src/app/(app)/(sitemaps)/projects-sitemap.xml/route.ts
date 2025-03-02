import { getServerSideSitemap } from 'next-sitemap';
import { getPayload } from 'payload';
import config from '@payload-config';
import { unstable_cache } from 'next/cache';

const getProjectsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://taidoan.com';

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

    const siteMap = results.docs
      ? results.docs
          .filter((project) => Boolean(project.slug))
          .map((project) => {
            return {
              loc: `${SITE_URL}/projects/${project.slug}`,
              lastmod: project.updatedAt || dateFallback,
            };
          })
      : [];

    return siteMap;
  },
  ['projects-sitemap'],
  { tags: ['projects-sitemap'] },
);

export async function GET() {
  const sitemap = await getProjectsSitemap();
  return getServerSideSitemap(sitemap);
}
