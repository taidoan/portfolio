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
 * //   bandwidthBytes: 123456789,
 * //   mediaLibraryStorageBytes: 987654321,
 * //   videoProcessingUnitsCount: 123,
 * //   originalCacheStorageBytes: 456789,
 * //   startDate: '2023-03-01',
 * //   endDate: '2023-03-31'
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
export const getImageKitMetrics = async (headers?: HeadersInit) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/metrics/imagekit`, {
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
export const getMetrics = async (provider: Provider, headers?: HeadersInit) => {
  if (provider === 'cloudflare') {
    return getCloudflareMetrics(headers);
  }

  if (provider === 'imagekit') {
    return getImageKitMetrics(headers);
  }
};
