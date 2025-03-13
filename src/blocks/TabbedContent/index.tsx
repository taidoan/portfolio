import type { TabbedContentBlockProps } from '@/payload-types';

import { TabbedContent } from '@/components/ui/TabbedContent';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const TabbedContentBlock = async ({
  className,
  contentType,
  content,
}: TabbedContentBlockProps) => {
  const payload = await getPayload({ config: config });
  let contentToUse;

  if (contentType === 'services') {
    const query = await payload.find({
      collection: 'services',
      limit: 10,
      depth: 1,
      pagination: false,
      overrideAccess: false,
      select: {
        title: true,
        id: true,
        slug: true,
        description: true,
        image: true,
        items: true,
      },
      sort: 'title',
    });

    contentToUse = query.docs;
  }

  if (contentType === 'custom') {
    contentToUse = content?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        items: item.items?.map((item) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image,
          };
        }),
      };
    });
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return <TabbedContent categories={contentToUse as any} className={className} />;
};
