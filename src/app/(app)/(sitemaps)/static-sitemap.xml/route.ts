import { getServerSideSitemap } from 'next-sitemap';
import { SITE_URL } from '@/lib/constants';

export async function GET() {
  const now = new Date().toISOString();

  const fields = [
    {
      loc: `${SITE_URL}/search`,
      lastmod: now,
    },
    {
      loc: `${SITE_URL}/tags`,
      lastmod: now,
    },
  ];

  return getServerSideSitemap(fields);
}
