import { afterEach, describe, expect, it } from 'vitest';
import {
  buildSitemapIndexXml,
  buildSitemapXml,
  escapeXml,
  getSitemapSiteUrl,
  sitemapIndexResponse,
  sitemapXmlResponse,
} from '../sitemap';

const ORIGINAL_ENV = {
  server: process.env.NEXT_PUBLIC_SERVER_URL,
  base: process.env.NEXT_PUBLIC_BASE_URL,
};

afterEach(() => {
  if (ORIGINAL_ENV.server === undefined) {
    delete process.env.NEXT_PUBLIC_SERVER_URL;
  } else {
    process.env.NEXT_PUBLIC_SERVER_URL = ORIGINAL_ENV.server;
  }

  if (ORIGINAL_ENV.base === undefined) {
    delete process.env.NEXT_PUBLIC_BASE_URL;
  } else {
    process.env.NEXT_PUBLIC_BASE_URL = ORIGINAL_ENV.base;
  }
});

describe('sitemap utilities', () => {
  it('escapes XML reserved characters', () => {
    expect(escapeXml(`&<>"'`)).toBe('&amp;&lt;&gt;&quot;&apos;');
  });

  it('builds a urlset with loc and lastmod', () => {
    const xml = buildSitemapXml([
      { loc: 'https://taidoan.com/', lastmod: '2026-01-01T00:00:00.000Z' },
      { loc: 'https://taidoan.com/about' },
    ]);

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://taidoan.com/</loc>');
    expect(xml).toContain('<lastmod>2026-01-01T00:00:00.000Z</lastmod>');
    expect(xml).toContain('<loc>https://taidoan.com/about</loc>');
    expect(xml).not.toMatch(/<url>[\s\S]*<loc>https:\/\/taidoan.com\/about<\/loc>[\s\S]*<lastmod>/);
  });

  it('builds a sitemap index', () => {
    const xml = buildSitemapIndexXml(['https://taidoan.com/pages-sitemap.xml']);

    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>https://taidoan.com/pages-sitemap.xml</loc>');
  });

  it('prefers server URL, then base URL, then the live site', () => {
    process.env.NEXT_PUBLIC_SERVER_URL = 'https://server.example.com';
    process.env.NEXT_PUBLIC_BASE_URL = 'https://base.example.com';
    expect(getSitemapSiteUrl()).toBe('https://server.example.com');

    delete process.env.NEXT_PUBLIC_SERVER_URL;
    expect(getSitemapSiteUrl()).toBe('https://base.example.com');

    delete process.env.NEXT_PUBLIC_BASE_URL;
    expect(getSitemapSiteUrl()).toBe('https://taidoan.com');
  });

  it('returns XML responses with crawler-friendly headers', async () => {
    const sitemap = sitemapXmlResponse([{ loc: 'https://taidoan.com/' }]);
    const index = sitemapIndexResponse(['https://taidoan.com/pages-sitemap.xml']);

    expect(sitemap.headers.get('Content-Type')).toBe('application/xml; charset=utf-8');
    expect(index.headers.get('Content-Type')).toBe('application/xml; charset=utf-8');
    expect(await sitemap.text()).toContain('<urlset');
    expect(await index.text()).toContain('<sitemapindex');
  });
});
