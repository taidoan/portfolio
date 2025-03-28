import { ArchiveClientBlock } from '@/blocks/Archive/archive.client';
import { ArchiveBlockProps } from '@/payload-types';
import config from '@payload-config';
import { getPayload } from 'payload';

export type Props = {
  className?: string;
} & ArchiveBlockProps;

export const ArchiveBlock = async ({
  data,
  className,
  showFilter,
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

  let content;
  if (data === 'projects') {
    content = await payload.find({
      collection: 'projects',
      ...queryOptions,
    });
  } else if (data === 'posts') {
    content = await payload.find({
      collection: 'posts',
      ...queryOptions,
    });
  }

  const { docs: contentData } = content || { docs: [] };
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
    <ArchiveClientBlock
      data={data}
      className={className}
      showFilter={showFilter}
      filterShowAllButton={filterShowAllButton}
      viewType={viewType}
      numberOfProjects={numberOfProjects}
      initialContent={contentData}
      initialCategories={categories}
      initialTotalPages={content?.totalPages || 1}
      initialCurrentPage={content?.page || 1}
      blockType='archiveBlock'
    />
  );
};
