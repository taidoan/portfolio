import { getServerSideSitemapIndex } from 'next-sitemap';
import { unstable_cache } from 'next/cache';
import { SITE_URL } from '@/lib/constants';

const siteMap = unstable_cache(
  async () => [
    `${SITE_URL}/pages-sitemap.xml`,
    `${SITE_URL}/projects-sitemap.xml`,
    `${SITE_URL}/services-sitemap.xml`,
    `${SITE_URL}/categories-sitemap.xml`,
    `${SITE_URL}/posts-sitemap.xml`,
    `${SITE_URL}/static-sitemap.xml`,
  ],
  ['sitemap'],
  { tags: ['sitemap'] },
);

export async function GET() {
  const sitemap = await siteMap();
  return getServerSideSitemapIndex(sitemap);
}
