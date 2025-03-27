const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'https://taidoan.com';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/pages-sitemap.xml',
    '/*',
    '/projects/*',
    '/projects-sitemap.xml',
    '/services/*',
    '/services-sitemap.xml',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    additionalSitemaps: [
      `${SITE_URL}/projects-sitemap.xml`,
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/services-sitemap.xml`,
    ],
  },
};
