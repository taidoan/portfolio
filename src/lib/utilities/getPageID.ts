import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';

/**
 * Get the ID of a page by its slug.
 * @param {string} slug - The slug of the page.
 * @returns {Promise<string>} - The ID of the page.
 */
const getPageID = async (slug: string) => {
  const payload = await getPayload({ config: configPromise });
  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    overrideAccess: false,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const page = result?.docs?.[0];

  if (!page?.id) {
    throw new Error(`Page with slug "${slug}" not found.`);
  }

  return page.id;
};

export const getCachedPageID = (slug: string) =>
  unstable_cache(() => getPageID(slug), [`page_id_${slug}`], {
    revalidate: 21600,
  })();
