import { SITE_URL } from '@lib/constants';

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
      `${SITE_URL}/projects-sitemap.xml`,
      `${SITE_URL}/pages-sitemap.xml`,
      `${SITE_URL}/services-sitemap.xml`,
      `${SITE_URL}/categories-sitemap.xml`,
    ],
  },
};
