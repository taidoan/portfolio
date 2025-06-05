import type { SiteSetting } from '@/payload-types';

import { getPayload } from 'payload';
import configPromise from '@/payload.config';

/**
 * Retrieves the live (uncached) `maintenanceStatus` value from the `site-settings` global.
 *
 * This function bypasses any caching layers and fetches the most up-to-date
 * `maintenanceStatus` value directly from the Payload CMS database.
 *
 * @returns A Promise that resolves to the current `maintenanceStatus` setting,
 * which is a boolean or `null` depending on the database value.
 *
 * @example
 * const isMaintenanceStatus = await getMaintenanceStatus();
 * if (isMaintenanceStatus) {
 *   // Display maintenance message
 * }
 */
export const getMaintenanceStatus = async (): Promise<SiteSetting> => {
  const payload = await getPayload({ config: configPromise });
  const liveSettings = await payload.findGlobal({
    slug: 'site-settings',
  });

  return liveSettings;
};
