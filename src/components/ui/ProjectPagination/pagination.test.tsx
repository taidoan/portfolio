import { render, screen } from '@testing-library/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationArchiveItem,
  PaginationLink,
  PaginationNextLabel,
  PaginationPreviousLabel,
} from '.';
import { getServerSideURL } from '@/lib/utilities/getURLs';
const SERVER_SIDE_URL = getServerSideURL();

describe('Pagination', () => {
  it('renders the pagination', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href='#' type='previous'>
              Web Project
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href='#' type='next'>
              Branding Project
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Web Project')).toBeInTheDocument();
    expect(screen.getByText('Branding Project')).toBeInTheDocument();
  });
});

describe('PaginationArchiveItem', () => {
  it('renders the archive item', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationArchiveItem />
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByTestId('archive-icon')).toBeInTheDocument();
    const link = screen.getByLabelText('Project Archive');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `${SERVER_SIDE_URL}/projects/`);
  });
});

describe('Pagination Labels', () => {
  it('renders the previous label', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href='#' type='previous'>
              <PaginationPreviousLabel>Previous Project</PaginationPreviousLabel>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Previous Project')).toBeInTheDocument();
  });

  it('renders the next label', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href='#' type='next'>
              <PaginationNextLabel>Next Project</PaginationNextLabel>
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('Next Project')).toBeInTheDocument();
  });
});

describe('PaginationLink', () => {
  it('renders the link', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href='#' type='previous'>
              Web Project
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    const link = screen.getByText('Web Project');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });
});
