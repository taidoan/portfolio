import type { GlobalAfterChangeHook } from 'payload';
import { revalidateTag } from 'next/cache';

export const revalidateGlobal = (globalSlug: string): GlobalAfterChangeHook => {
  return ({ doc, req: { payload, context } }) => {
    if (!context.disableRevalidate) {
      payload.logger.info(`Revalidating ${globalSlug}`);

      revalidateTag(`global_${globalSlug}`);
    }

    return doc;
  };
};
