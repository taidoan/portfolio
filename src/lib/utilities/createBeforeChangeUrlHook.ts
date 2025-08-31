import type { CollectionBeforeChangeHook, TypeWithID } from 'payload';
import { generateUrl } from './generateUrl';

export const createBeforeChangeUrlHook = <T extends TypeWithID>(
  collectionPath?: string,
): CollectionBeforeChangeHook<T> => {
  return async ({ data }) => {
    const d = data as Partial<{ slug?: string; url?: string }>;
    if (d.slug) {
      d.url = generateUrl(d.slug, collectionPath);
    }

    return d as T;
  };
};
