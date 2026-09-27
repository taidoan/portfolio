const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SERVER_URL || 'https://taidoan.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/pages-sitemap.xml',
    '/admin/*',
    '/api/*',
    '/projects/*',
    '/projects-sitemap.xml',
    '/posts/*',
    '/posts-sitemap.xml',
    '/services/*',
    '/services-sitemap.xml',
    '/categories/*',
    '/categories-sitemap.xml',
    '/static-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/*'],
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/pages-sitemap.xml`,
      `${siteUrl}/projects-sitemap.xml`,
      `${siteUrl}/posts-sitemap.xml`,
      `${siteUrl}/services-sitemap.xml`,
      `${siteUrl}/categories-sitemap.xml`,
      `${siteUrl}/static-sitemap.xml`,
    ],
  },
};
