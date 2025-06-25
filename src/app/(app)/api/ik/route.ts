import type { MetricsResponse } from './types';
import type { AuthResult } from '@/lib/utilities/validateAuth';
import { getPayload } from 'payload';
import { NextRequest } from 'next/server';
import {
  validateEnvironment,
  createSuccessResponse,
  getCachedImageKitMetrics,
  generateDateRange,
} from './utils';
import { createErrorResponse } from '@/lib/utilities/createResponse';
import { validateAuth } from '@/lib/utilities/validateAuth';
import configPromise from '@payload-config';

export async function GET(request: NextRequest) {
  const payload = await getPayload({ config: configPromise });

  const authResult: AuthResult = await validateAuth(request);
  if (authResult.error) {
    return createErrorResponse('Authentication failed', 401);
  }

  const { privateKey } = validateEnvironment();
  const { startDateFromUrl, endDateFromUrl } = generateDateRange(request);

  if (!startDateFromUrl || !endDateFromUrl) {
    return createErrorResponse('Missing startDate or endDate', 400);
  }

  try {
    const data = await getCachedImageKitMetrics(startDateFromUrl, endDateFromUrl, privateKey);

    const metricsResponse: MetricsResponse = {
      success: true,
      bandwidthBytes: data.bandwidthBytes,
      mediaLibraryStorageBytes: data.mediaLibraryStorageBytes,
      videoProcessingUnitsCount: data.videoProcessingUnitsCount,
      originalCacheStorageBytes: data.originalCacheStorageBytes,
      startDate: startDateFromUrl,
      endDate: endDateFromUrl,
    };

    return createSuccessResponse(metricsResponse);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;

    payload.logger.error(
      {
        error: errorMessage,
        stack: errorStack,
        endpoint: '/api/ik',
      },
      'ImageKit Metrics API error',
    );

    return createErrorResponse('Internal server error', 500);
  }
}
