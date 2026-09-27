import { unstable_cache } from 'next/cache';
import { getSitemapSiteUrl, sitemapIndexResponse } from '@/lib/utilities/sitemap';

const siteMap = unstable_cache(
  async () => {
    const siteUrl = getSitemapSiteUrl();

    return [
      `${siteUrl}/pages-sitemap.xml`,
      `${siteUrl}/projects-sitemap.xml`,
      `${siteUrl}/services-sitemap.xml`,
      `${siteUrl}/categories-sitemap.xml`,
      `${siteUrl}/posts-sitemap.xml`,
      `${siteUrl}/static-sitemap.xml`,
    ];
  },
  ['sitemap'],
  { tags: ['sitemap'] },
);

export async function GET() {
  try {
    const sitemap = await siteMap();
    return sitemapIndexResponse(sitemap);
  } catch (error) {
    console.error('Failed to generate sitemap index', error);
    return sitemapIndexResponse([]);
  }
}
