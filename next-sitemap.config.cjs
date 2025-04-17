/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://taidoan.com',
  generateRobotsTxt: true,
  exclude: [
    '/pages-sitemap.xml',
    '/*',
    '/projects/*',
    '/projects-sitemap.xml',
    '/services/*',
    '/services-sitemap.xml',
    '/categories/*',
    '/categories-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/api/spotify'],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/projects-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/pages-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/services-sitemap.xml`,
      `${process.env.NEXT_PUBLIC_SITE_URL}/categories-sitemap.xml`,
    ],
  },
};
