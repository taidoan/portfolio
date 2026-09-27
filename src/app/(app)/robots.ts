import type { MetadataRoute } from 'next';
import { getSitemapSiteUrl } from '@/lib/utilities/sitemap';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSitemapSiteUrl();

  return {
    rules: {
      userAgent: '*',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
