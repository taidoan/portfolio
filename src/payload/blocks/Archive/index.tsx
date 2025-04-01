import { ArchiveClientBlock } from '@/payload/blocks/Archive/archive.client';
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
  categoriesToArchive,
  filterShowAllButton,
  viewType,
  numberOfProjects,
  page,
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
  } else if (data === 'categories') {
    if (categoriesToArchive && categoriesToArchive.length > 0) {
      content = await payload.find({
        collection: 'projects',
        where: {
          categories: {
            in: categoriesToArchive.map((category) =>
              typeof category === 'string' ? category : category.id,
            ),
          },
        },
        ...queryOptions,
      });
    } else {
      content = { docs: [] };
    }
  } else {
    content = { docs: [] };
  }

  const { docs: contentData } = content || { docs: [] };
  const categoryIdsWithProjects = new Set();

  contentData.forEach((item) => {
    item?.categories?.forEach((category) => {
      if (typeof category === 'string') {
        categoryIdsWithProjects.add(category);
      }
    });
  });

  const { docs: categories } = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: { title: true, slug: true, description: true },
    where: { id: { in: Array.from(categoryIdsWithProjects) }, parentCategory: { exists: false } },
  });

  return (
    <ArchiveClientBlock
      data={data}
      className={className}
      showFilter={showFilter}
      filterShowAllButton={filterShowAllButton}
      viewType={viewType}
      page={page}
      numberOfProjects={numberOfProjects}
      initialContent={contentData}
      initialCategories={categories}
      initialTotalPages={content?.totalPages || 1}
      initialCurrentPage={content?.page || 1}
      blockType='archiveBlock'
    />
  );
};
