import type { TabbedContentBlockProps } from '@/payload-types';

import { TabbedContent } from '@/components/ui/TabbedContent';
import { getPayload } from 'payload';
import config from '@/payload.config';

export const TabbedContentBlock = async ({ className }: TabbedContentBlockProps) => {
  const payload = await getPayload({ config: config });
  const { docs: services } = await payload.find({
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

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  return <TabbedContent categories={services as any} className={className} />;
};
