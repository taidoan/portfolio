'use client';
import { useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrev,
  PaginationNext,
} from '@components/ui/Pagination';

export const PaginationSearch = ({
  currentPage,
  totalPages,
  query,
  collection,
  perPage,
}: {
  currentPage: number;
  totalPages: number;
  query: string;
  collection: string;
  perPage: number;
}) => {
  const router = useRouter();
  if (totalPages <= 1) return null;

  const createPageUrl = (pageNum: number) => {
    const params = new URLSearchParams();
    params.set('query', query);
    if (collection) params.set('collection', collection);
    params.set('page', pageNum.toString());
    params.set('perPage', perPage.toString());

    return `/search?${params.toString()}`;
  };

  const handlePageChange = (pageNum: number) => {
    router.push(createPageUrl(pageNum));
  };

  const pageNumbers = [];
  const maxPagesToShow = 6;

  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrev
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(Number(currentPage) - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((pageNum) => {
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={Number(currentPage) === pageNum}
                disabled={pageNum === currentPage}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            disabled={currentPage >= totalPages}
            onClick={() => handlePageChange(Number(currentPage) + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
