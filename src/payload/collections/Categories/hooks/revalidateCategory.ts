import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import type { Category } from '@/payload-types';
import { revalidatePath, revalidateTag } from 'next/cache';

export const revalidateCategory: CollectionAfterChangeHook<Category> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/categories/${doc.slug}`;
    payload.logger.info(`Revalidating category at path: ${path}`);

    revalidatePath(path);
  }

  return doc;
};

export const revalidateDelete: CollectionAfterDeleteHook<Category> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/categories/${doc.slug}`;
    revalidatePath(path);
  }

  return doc;
};
