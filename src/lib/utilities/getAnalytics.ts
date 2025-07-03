/**
 * Fetches Cloudflare R2 object metrics data from the server.
 * @param headers Optional headers to include in the request.
 * @returns The Cloudflare R2 object metrics data.
 * @example
 * const metrics = await getCloudflareMetrics();
 * console.log(metrics);
 *
 * // Output:
 * // {
 * //   success: true,
 * //   bucketName: 'my-bucket',
 * //   currentUsage: {
 * //     objectCount: 1000,
 * //     totalStorage: '1 GB',
 * //     storageCapacity: '10 GB',
 * //     storageUsage: '10%',
 * //     storageUsagePercentage: '10%',
 * //     totalStorageBytes: 1073741824,
 * //     payloadSize: '500 MB',
 * //     metadataSize: '100 MB',
 * //     uploadCount: 200,
 * //     operations: {
 * //       classA: 150,
 * //       classB: 50
 * //     },
 * //     usedStorageSizeNoFormat: 1073741824,
 * //     totalStorageBytesNoFormat: 10737418240
 * //   },
 * //   dateRange: {
 * //     startDate: '2023-01-01',
 * //     endDate: '2023-01-31'
 * //   },
 * //   message: 'Metrics fetched successfully',
 * // }
 */
export const getCloudflareMetrics = async (headers?: HeadersInit) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/metrics/cloudflare`, {
      headers: headers || {},
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching R2 analytics data:', error);
    throw error;
  }
};

/**
 * Fetches ImageKit metrics data from the server.
 * @param headers Optional headers to include in the request.
 * @returns The ImageKit metrics data.
 * @example
 * const metrics = await getImageKitMetrics();
 * console.log(metrics);
 *
 * // Output:
 * // {
 * //   success: true,
 * //   bandwidthBytes: 123456789,
 * //   mediaLibraryStorageBytes: 987654321,
 * //   videoProcessingUnitsCount: 123,
 * //   originalCacheStorageBytes: 456789,
 * //   startDate: '2023-03-01',
 * //   endDate: '2023-03-31'
 * // }
 */
export const getImageKitMetrics = async (
  headers?: HeadersInit,
  startDate?: string,
  endDate?: string,
) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/metrics/imagekit`);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);

    const response = await fetch(url.toString(), {
      headers: headers || {},
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ImageKit metrics data:', error);
    throw error;
  }
};

type Provider = 'cloudflare' | 'imagekit';

/**
 * Fetches metrics data from the server.
 * @param provider The provider to fetch metrics for.
 * @param headers Optional headers to include in the request.
 * @returns The metrics data.
 */
export const getMetrics = async (
  provider: Provider,
  headers?: HeadersInit,
  startDate?: string,
  endDate?: string,
) => {
  if (provider === 'cloudflare') {
    return getCloudflareMetrics(headers);
  }

  if (provider === 'imagekit') {
    return getImageKitMetrics(headers, startDate, endDate);
  }
};
