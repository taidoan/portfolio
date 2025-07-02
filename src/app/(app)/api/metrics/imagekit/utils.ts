import type { EnvironmentConfig, MetricsResponse } from './types';
import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

/**
 * Validates the environment variables.
 * @returns The validated environment variables.
 * @throws {Error} If the environment variables are missing or invalid.
 */
export const validateEnvironment = (): EnvironmentConfig => {
  const { PRIVATE_KEY: privateKey } = process.env;

  if (!privateKey) {
    throw new Error('Missing required environment variables');
  }

  if (typeof privateKey !== 'string') {
    throw new Error('Invalid environment variable types');
  }

  return { privateKey };
};

/**
 * Generates a date range for the ImageKit metrics API.
 * @param request The request object.
 * @returns The start and end dates for the date range.
 */
export const generateDateRange = (
  request: NextRequest,
): { startDateFromUrl: string; endDateFromUrl: string } => {
  const date = new Date();
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().slice(0, 10);
  const endDate = date.toISOString().slice(0, 10);

  const url = new URL(request.url);
  const startDateFromUrl = url.searchParams.get('startDate') || startDate;
  const endDateFromUrl = url.searchParams.get('endDate') || endDate;

  return { startDateFromUrl, endDateFromUrl };
};

/**
 * Fetches ImageKit metrics from the server.
 * @param startDate The start date for the query.
 * @param endDate The end date for the query.
 * @param key The ImageKit API key.
 * @returns The ImageKit metrics.
 */
const fetchImageKitMetrics = async (startDate: string, endDate: string, key: string) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const apiUrl = `https://api.imagekit.io/v1/accounts/usage?startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${btoa(`${key}:`)}`,
      },
      signal: controller.signal,
    });
    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
};

/**
 * Caches the ImageKit metrics.
 * @param startDate The start date for the query.
 * @param endDate The end date for the query.
 * @param key The ImageKit API key.
 */
export const getCachedImageKitMetrics = unstable_cache(fetchImageKitMetrics, ['imagekit-metrics'], {
  revalidate: 300,
  tags: ['imagekit-metrics'],
});

/**
 * Creates a success response with the given data.
 * @param data The data to include in the response.
 * @returns The success response.
 */
export const createSuccessResponse = (data: MetricsResponse): NextResponse<MetricsResponse> => {
  return NextResponse.json(data);
};
