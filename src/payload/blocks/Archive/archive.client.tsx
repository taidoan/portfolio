'use client';

import { useState } from 'react';
import { Archive } from '@/components/ui/Archive';
import { Spinner } from '@/components/ui/Spinner';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrev,
  PaginationNext,
} from '@/components/ui/Pagination';
import type { ArchiveBlockProps } from '@/payload-types';
import { fetchArchiveData } from '@/lib/utilities/fetchArchiveData';

export type Props = {
  className?: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  initialContent?: any;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  initialCategories?: any[];
  initialTotalPages?: number;
  initialCurrentPage?: number;
} & ArchiveBlockProps;

export const ArchiveClientBlock = ({
  data,
  className,
  showFilter,
  categoriesToArchive,
  filterShowAllButton,
  viewType,
  page,
  numberOfProjects,
  initialContent = [],
  initialCategories = [],
  initialTotalPages = 1,
  initialCurrentPage = 1,
}: Props) => {
  const [contentData, setContentData] = useState(initialContent);
  const [categories, _setCategories] = useState(initialCategories);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);

  const handlePageChange = async (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages || isLoading) return;
    setIsLoading(true);

    try {
      const result = await fetchArchiveData(
        data,
        pageNumber,
        numberOfProjects || 4,
        data === 'categories'
          ? categoriesToArchive?.length
            ? categoriesToArchive.map((category) =>
                typeof category === 'string' ? category : category.id,
              )
            : undefined
          : undefined,
      );
      if (result.success && result.data) {
        setContentData(result.data.docs);
        setTotalPages(result.data.totalPages);
        setCurrentPage(pageNumber);
      } else {
        console.error('Error fetching archive data:', result.error);
      }
    } catch (error) {
      console.error('Error fetching archive data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Archive
        data={contentData}
        relation={data === 'categories' ? 'projects' : data}
        categories={categories}
        filter={showFilter}
        filterShowAll={filterShowAllButton || true}
        view={viewType}
        className={className}
        page={page}
      />
      {isLoading && (
        <div>
          <Spinner />
        </div>
      )}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1 || isLoading}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => handlePageChange(page)}
                  disabled={isLoading}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || isLoading}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};
