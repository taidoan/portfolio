import type { AnalyticsResponse, ErrorResponse } from './types';
import type { AuthResult } from '@/lib/utilities/validateAuth';

import { getPayload } from 'payload';
import { NextResponse, NextRequest } from 'next/server';
import { validateAuth } from '@/lib/utilities/validateAuth';
import {
  checkRateLimit,
  cleanupInterval,
  validateEnvironment,
  getCachedCloudflareAnalytics,
  calculateOperationTotals,
  getClientIp,
  generateDateRange,
  calculateUsage,
  createSuccessResponse,
  RATE_LIMIT_MAP,
} from './utils';
import { createErrorResponse } from '@/lib/utilities/createResponse';

import configPromise from '@payload-config';

export async function GET(
  req: NextRequest,
): Promise<NextResponse<AnalyticsResponse | ErrorResponse>> {
  const payload = await getPayload({ config: configPromise });

  try {
    const clientIp = getClientIp(req);
    if (!checkRateLimit(clientIp)) {
      return createErrorResponse('Rate limit exceeded. Please try again later.', 429, {
        'Retry-After': '60',
      });
    }

    const authResult: AuthResult = await validateAuth(req);
    if (authResult.error) {
      return createErrorResponse('Authentication failed', 401);
    }

    const { accountId, apiToken } = validateEnvironment();

    const { startDate, endDate } = generateDateRange();

    const json = await getCachedCloudflareAnalytics(accountId, apiToken, startDate, endDate);

    if (json.errors) {
      payload.logger.error({ errors: json.errors }, 'GraphQL errors from Cloudflare');
      return createErrorResponse('Failed to retrieve analytics data', 502);
    }

    const account = json.data?.viewer?.accounts?.[0];
    if (!account) return createErrorResponse('No analytics data available for this account', 404);

    if (!account.r2StorageAdaptiveGroups?.length)
      return createSuccessResponse({
        success: true,
        message: 'No R2 usage data found for the current period',
        bucketName: null,
        currentUsage: null,
        dateRange: { startDate, endDate },
      });

    const latestData = account.r2StorageAdaptiveGroups[0];
    const operations = account.r2OperationsAdaptiveGroups || [];
    const operationTotals = calculateOperationTotals(operations);
    const currentUsage = calculateUsage(latestData, operationTotals);

    const reponse: AnalyticsResponse = {
      success: true,
      bucketName: latestData.dimensions.bucketName,
      currentUsage,
      lastUpdated: latestData.dimensions.datetime,
      dateRange: { startDate, endDate },
    };

    return createSuccessResponse(reponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    payload.logger.error(
      {
        error: errorMessage,
        stack: errorStack,
        endpoint: '/api/metrics/cloudflare',
      },
      'Analytics API error',
    );

    return createErrorResponse('Internal server error', 500);
  }
}
