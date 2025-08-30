/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://taidoan.com',
  generateRobotsTxt: true,
  exclude: [
    '/pages-sitemap.xml',
    '/admin/*',
    '/api/*',
    '/projects/*',
    '/projects-sitemap.xml',
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
      `${process.env.NEXT_PUBLIC_BASE_URL}/projects-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/pages-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/services-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/categories-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_BASE_URL}/static-sitemap.xml`,
    ],
  },
};
