import type { SiteSetting } from '@/payload-types';

import { getPayload } from 'payload';
import configPromise from '@/payload.config';

/**
 * Retrieves the live (uncached) `maintenanceMode` value from the `site-settings` global.
 *
 * This function bypasses any caching layers and fetches the most up-to-date
 * `maintenanceMode` value directly from the Payload CMS database.
 *
 * @returns A Promise that resolves to the current `maintenanceMode` setting,
 * which is a boolean or `null` depending on the database value.
 *
 * @example
 * const isMaintenanceMode = await getMaintenanceMode();
 * if (isMaintenanceMode) {
 *   // Display maintenance message
 * }
 */
export const getMaintenanceMode = async (): Promise<SiteSetting['maintenanceMode']> => {
  const payload = await getPayload({ config: configPromise });
  const liveSettings = await payload.findGlobal({
    slug: 'site-settings',
  });

  return liveSettings.maintenanceMode;
};
