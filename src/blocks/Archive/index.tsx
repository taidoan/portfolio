import { Archive } from '@/components/ui/Archive';
import { ArchiveBlockProps } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';

export type Props = {
  className?: string;
} & ArchiveBlockProps;

export const ArchiveBlock = async ({
  data,
  className,
  filterShowAllButton,
  viewType,
  numberOfProjects,
}: Props) => {
  const payload = await getPayload({ config: config });

  const queryOptions = {
    depth: 1,
    limit: numberOfProjects || 4,
    overrideAccess: false,
  };

  // Adjust query based on whether we're fetching 'projects' or 'services'
  let content;
  if (data === 'projects') {
    content = await payload.find({
      collection: 'projects',
      ...queryOptions,
    });
  } else if (data === 'services') {
    content = await payload.find({
      collection: 'services',
      ...queryOptions,
    });
  }

  const { docs: contentData } = content || { docs: [] };

  // Handle categories for both collections
  const categoryIdsWithProjects = new Set();

  contentData.forEach((item) => {
    item?.categories?.forEach((category) => {
      if (typeof category === 'object' && category?.id) {
        categoryIdsWithProjects.add(category.id);
      }
    });
  });

  const { docs: categories } = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: { title: true, slug: true, description: true, updatedAt: true, createdAt: true },
    where: { id: { in: Array.from(categoryIdsWithProjects) }, parentCategory: { exists: false } },
  });

  return (
    <Archive
      data={contentData}
      categories={categories}
      filterShowAll={filterShowAllButton}
      view={viewType}
      className={className}
    />
  );
};
