export type SitemapField = {
  loc: string;
  lastmod?: string;
};

export const getSitemapSiteUrl = (): string =>
  process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://taidoan.com';

const XML_HEADER = '<?xml version="1.0" encoding="UTF-8"?>';
const URLSET_NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';

const SITEMAP_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
};

export const escapeXml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');

export const buildSitemapXml = (fields: SitemapField[]): string => {
  const urls = fields
    .map((field) => {
      const lastmod = field.lastmod ? `<lastmod>${escapeXml(field.lastmod)}</lastmod>` : '';
      return `<url><loc>${escapeXml(field.loc)}</loc>${lastmod}</url>`;
    })
    .join('');

  return `${XML_HEADER}<urlset xmlns="${URLSET_NS}">${urls}</urlset>`;
};

export const buildSitemapIndexXml = (locs: string[]): string => {
  const sitemaps = locs.map((loc) => `<sitemap><loc>${escapeXml(loc)}</loc></sitemap>`).join('');

  return `${XML_HEADER}<sitemapindex xmlns="${URLSET_NS}">${sitemaps}</sitemapindex>`;
};

export const sitemapXmlResponse = (fields: SitemapField[]): Response =>
  new Response(buildSitemapXml(fields), { headers: SITEMAP_HEADERS });

export const sitemapIndexResponse = (locs: string[]): Response =>
  new Response(buildSitemapIndexXml(locs), { headers: SITEMAP_HEADERS });
