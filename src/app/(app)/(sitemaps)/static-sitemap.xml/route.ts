import { getSitemapSiteUrl, sitemapXmlResponse } from '@/lib/utilities/sitemap';

export async function GET() {
  const siteUrl = getSitemapSiteUrl();
  const now = new Date().toISOString();

  return sitemapXmlResponse([
    {
      loc: `${siteUrl}/search`,
      lastmod: now,
    },
    {
      loc: `${siteUrl}/tags`,
      lastmod: now,
    },
  ]);
}
