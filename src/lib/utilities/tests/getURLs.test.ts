import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as getURLs from '../getURLs';
import { getClientSideURL } from '../getURLs';

describe('getURLs utility functions', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    vi.restoreAllMocks();
  });

  describe('getServerSideURL', () => {
    it('returns NEXT_PUBLIC_SERVER_URL if set', () => {
      process.env.NEXT_PUBLIC_SERVER_URL = 'https://server.example.com';
      expect(getURLs.getServerSideURL()).toBe('https://server.example.com');
    });

    it('returns empty string if NEXT_PUBLIC_SERVER_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_SERVER_URL;
      expect(getURLs.getServerSideURL()).toBe('');
    });
  });

  describe('getCDNURL', () => {
    it('returns NEXT_PUBLIC_URL_ENDPOINT if set', () => {
      process.env.NEXT_PUBLIC_URL_ENDPOINT = 'https://cdn.example.com';
      expect(getURLs.getCDNURL()).toBe('https://cdn.example.com');
    });

    it('falls back to getServerSideURL if NEXT_PUBLIC_URL_ENDPOINT is not set', () => {
      delete process.env.NEXT_PUBLIC_URL_ENDPOINT;
      process.env.NEXT_PUBLIC_SERVER_URL = 'https://server.example.com';
      expect(getURLs.getCDNURL()).toBe('https://server.example.com');
    });

    it('returns empty string if neither env var is set', () => {
      delete process.env.NEXT_PUBLIC_URL_ENDPOINT;
      delete process.env.NEXT_PUBLIC_SERVER_URL;
      expect(getURLs.getCDNURL()).toBe('');
    });
  });

  describe('getClientSideURL', () => {
    it('returns client URL when canUseDOM is true', () => {
      vi.mock('./canUseDOM', () => ({ default: true }));

      global.window = Object.create(window);
      Object.defineProperty(window, 'location', {
        value: {
          protocol: 'https:',
          hostname: 'client.example.com',
          port: '3000',
        },
        writable: true,
      });
      // Re-import to apply mock
      expect(getClientSideURL()).toBe('https://client.example.com:3000');
    });
  });
});
