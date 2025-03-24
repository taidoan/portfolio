import { getServerSideURL } from '@/lib/utilities/getURLs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPreviousLabel,
  PaginationNextLabel,
  PaginationArchiveItem,
} from './components';

const SERVER_SIDE_URL = getServerSideURL();

export type ProjectPaginationProps = {
  className?: string;
  data: {
    prevProject: {
      slug: string;
      title: string;
      id: string;
    };
    nextProject: {
      slug: string;
      title: string;
      id: string;
    };
  };
};

export const ProjectPagination = ({ className, data, ...props }: ProjectPaginationProps) => {
  return (
    <Pagination className={className} {...props}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPreviousLabel />
          <PaginationLink href={`/projects/${data.prevProject.slug}`} type='previous'>
            {data.prevProject.title}
          </PaginationLink>
        </PaginationItem>
        <PaginationArchiveItem />
        <PaginationItem>
          <PaginationNextLabel />
          <PaginationLink href={`/projects/${data.nextProject.slug}`} type='next'>
            {data.nextProject.title}
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
