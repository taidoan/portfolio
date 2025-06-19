import type {
  RateLimitEntry,
  EnvironmentConfig,
  CloudflareResponse,
  OperationsTotals,
  CloudflareOperationData,
  CloudflareStorageData,
  CurrentUsage,
  ActionType,
  GraphQLQuery,
  ErrorResponse,
  AnalyticsResponse,
  CloudflareApiResponse,
} from './types';

import { unstable_cache } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { OPERATION_CLASSES } from './constants';
import { formatBytes } from '@/lib/utilities/formatBytes';

/** The rate limit map. */
export const RATE_LIMIT_MAP = new Map<string, RateLimitEntry>();
/** The rate limit window in milliseconds. */
const RATE_LIMIT_WINDOW = 60000;
/** The maximum number of requests allowed per rate limit window. */
const RATE_LIMIT_MAX_REQUESTS = 10;

/**
 * Checks if the rate limit has been exceeded for the given identifier.
 * @param identifier The identifier to check.
 * @returns True if the rate limit has been exceeded, false otherwise.
 * @example
 * const rateLimitExceeded = checkRateLimit('my-identifier');
 * if (rateLimitExceeded) {
 *   // Handle rate limit exceeded
 * }
 */
export const checkRateLimit = (identifier: string): boolean => {
  const now = Date.now();
  const userLimit = RATE_LIMIT_MAP.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    RATE_LIMIT_MAP.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
};

/**
 * Cleans up the rate limit map.
 * This is called every 60 seconds to ensure that rate limits are not exceeded indefinitely.
 * It is recommended to call this function in a setInterval to clean up the rate limit map.
 * @example
 * setInterval(cleanupInterval, 60000);
 */
export const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, value] of RATE_LIMIT_MAP.entries()) {
    if (now > value.resetTime) {
      RATE_LIMIT_MAP.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

/**
 * Validates the environment variables.
 * @returns The validated environment variables.
 * @throws {Error} If the environment variables are missing or invalid.
 */
export const validateEnvironment = (): EnvironmentConfig => {
  const { CF_ACCOUNT_ID: accountId, CF_API_TOKEN: apiToken } = process.env;

  if (!accountId || !apiToken) {
    throw new Error('Missing required environment variables');
  }

  if (typeof accountId !== 'string' || typeof apiToken !== 'string') {
    throw new Error('Invalid environment variable types');
  }

  return { accountId, apiToken };
};

/**
 * Builds a GraphQL query for the Cloudflare API.
 * @param accountTag The Cloudflare account ID.
 * @param startDate The start date for the query.
 * @param endDate The end date for the query.
 * @returns The GraphQL query.
 */
export const buildAnalyticsQuery = (accountTag: string, startDate: string, endDate: string) => ({
  query: `query GetR2Analytics($accountTag: String!, $startDate: Time!, $endDate: Time!) {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        r2StorageAdaptiveGroups(
          limit: 100
          filter: {
            datetime_geq: $startDate
            datetime_leq: $endDate
          }
          orderBy: [datetime_DESC]
        ) {
          max {
            objectCount
            uploadCount
            payloadSize
            metadataSize
          }
          dimensions {
            datetime
            bucketName
          }
        }
        r2OperationsAdaptiveGroups(
          limit: 100
          filter: {
            datetime_geq: $startDate
            datetime_leq: $endDate
          }
          orderBy: [datetime_DESC]
        ) {
          sum {
            requests
          }
          dimensions {
            datetime
            actionType
          }
        }
      }
    }
  }`,
  variables: { accountTag, startDate, endDate },
});

/**
 * Fetches data from the Cloudflare API.
 * @param query The GraphQL query to send to the API.
 * @param apiToken The Cloudflare API token.
 * @returns The response from the API.
 */
export const fetchCloudflareData = async (
  query: GraphQLQuery,
  apiToken: string,
): Promise<CloudflareApiResponse> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Analytics-Service/1.0',
      },
      body: JSON.stringify(query),
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
 * Fetches data from the Cloudflare API.
 * @param query The GraphQL query to send to the API.
 * @param apiToken The Cloudflare API token.
 * @returns The response from the API.
 */
const getCachedAnalytics = async (
  accountId: string,
  apiToken: string,
  startDate: string,
  endDate: string,
): Promise<CloudflareResponse> => {
  const query = buildAnalyticsQuery(accountId, startDate, endDate);
  return await fetchCloudflareData(query, apiToken);
};

/**
 * Fetches data from the Cloudflare API and caches the response.
 */
export const getCachedCloudflareAnalytics = unstable_cache(
  getCachedAnalytics,
  ['cloudflare-analytics'],
  {
    revalidate: 300,
    tags: ['analytics'],
  },
);

/**
 * Calculates the total number of requests for each operation class.
 * @param operations The Cloudflare operations data.
 * @returns The total number of requests for each operation class.
 */
export const calculateOperationTotals = (
  operations: CloudflareOperationData[],
): OperationsTotals => {
  let classATotal = 0;
  let classBTotal = 0;

  for (const operation of operations) {
    const { requests } = operation.sum;
    const { actionType } = operation.dimensions;

    if (OPERATION_CLASSES.classA.has(actionType as ActionType)) {
      classATotal += requests;
    } else if (OPERATION_CLASSES.classB.has(actionType as ActionType)) {
      classBTotal += requests;
    }
  }

  return { classA: classATotal, classB: classBTotal };
};

/**
 * Retrieves the client IP address from the request headers.
 * @param req The request object.
 * @returns The client IP address.
 */
export const getClientIp = (req: NextRequest): string => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  return forwardedFor ? forwardedFor.split(',')[0].trim() : 'unknown';
};

/**
 * Generates a date range for the Cloudflare Analytics API.
 * @returns The start and end dates for the date range.
 */
export const generateDateRange = (): { startDate: string; endDate: string } => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const endDate = now.toISOString();

  return { startDate, endDate };
};

/**
 * Calculates the current usage for the given storage data and operation totals.
 * @param storageData The Cloudflare storage data.
 * @param operationTotals The total number of requests for each operation class.
 * @returns The current usage.
 */
export const calculateUsage = (
  storageData: CloudflareStorageData,
  operationTotals: OperationsTotals,
): CurrentUsage => {
  const currentUsage = storageData.max;
  const totalStorageBytes = currentUsage.payloadSize + currentUsage.metadataSize;
  const totalStorageCapacity = 10_000_000_000;

  return {
    objectCount: currentUsage.objectCount,
    totalStorage: formatBytes(totalStorageBytes),
    storageCapacity: formatBytes(totalStorageCapacity),
    storageUsage: `${formatBytes(totalStorageBytes)} / ${formatBytes(totalStorageCapacity)}`,
    storageUsagePercentage: `${((totalStorageBytes / totalStorageCapacity) * 100).toFixed(2)}%`,
    totalStorageBytes,
    payloadSize: formatBytes(currentUsage.payloadSize),
    metadataSize: formatBytes(currentUsage.metadataSize),
    uploadCount: currentUsage.uploadCount,
    operations: operationTotals,
  };
};

/**
 * Creates an error response with the given error message and status code.
 * @param error The error message.
 * @param status The status code.
 * @param headers The headers to include in the response.
 * @returns The error response.
 */
export const createErrorResponse = (
  error: string,
  status: number,
  headers?: Record<string, string>,
): NextResponse<ErrorResponse> => {
  return NextResponse.json({ error }, { status, headers });
};

/**
 * Creates a success response with the given data.
 * @param data The data to include in the response.
 * @returns The success response.
 */
export const createSuccessResponse = (data: AnalyticsResponse): NextResponse<AnalyticsResponse> => {
  return NextResponse.json(data);
};
