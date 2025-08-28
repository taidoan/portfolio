import { render, screen, fireEvent } from '@testing-library/react';
import style from './style.module.scss';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrev,
  PaginationNext,
  PaginationDots,
} from '.';

describe('<Pagination>', () => {
  it('should render correctly', () => {
    render(<Pagination />);
    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  it('should render with custom class', () => {
    render(<Pagination className='test' />);
    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveClass('test');
  });

  it('should render with custom aria-label', () => {
    render(<Pagination aria-label='test' />);
    const pagination = screen.getByRole('navigation');
    expect(pagination).toHaveAttribute('aria-label', 'test');
  });

  it('should render with a test id', () => {
    render(<Pagination data-testid='test' />);
    const pagination = screen.getByTestId('test');
    expect(pagination).toBeInTheDocument();
  });

  it('should render a pagination content', () => {
    render(<PaginationContent />);
    const paginationContent = screen.getByRole('list');
    expect(paginationContent).toBeInTheDocument();
  });

  it('should render a pagination item', () => {
    render(<PaginationItem />);
    const paginationItem = screen.getByRole('listitem');
    expect(paginationItem).toBeInTheDocument();
  });

  it('should render a pagination link', () => {
    render(<PaginationLink />);
    const paginationLink = screen.getByRole('button');
    expect(paginationLink).toBeInTheDocument();
  });

  it('should render a pagination link with custom class', () => {
    render(<PaginationLink className='test' />);
    const paginationLink = screen.getByRole('button');
    expect(paginationLink).toHaveClass('test');
  });

  it('should render a pagination link with custom aria-label', () => {
    render(<PaginationLink aria-label='test' />);
    const paginationLink = screen.getByRole('button');
    expect(paginationLink).toHaveAttribute('aria-label', 'test');
  });

  it('should render a pagination link with custom aria-current', () => {
    render(<PaginationLink aria-current='page' />);
    const paginationLink = screen.getByRole('button');
    expect(paginationLink).toHaveAttribute('aria-current', 'page');
  });

  it('should render a pagination link with isActive prop', () => {
    render(<PaginationLink isActive />);
    const paginationLink = screen.getByRole('button');
    expect(paginationLink).toHaveClass(style['pagination__link--active']);
  });

  it('should fire a click event on a pagination link', () => {
    const handleClick = vi.fn();
    render(<PaginationLink onClick={handleClick} />);
    const paginationLink = screen.getByRole('button');
    fireEvent.click(paginationLink);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should render a pagination prev link', () => {
    render(<PaginationPrev />);
    const paginationPrev = screen.getByRole('button');
    expect(paginationPrev).toBeInTheDocument();
  });

  it('should render a pagination prev link with custom class', () => {
    render(<PaginationPrev className='test' />);
    const paginationPrev = screen.getByRole('button');
    expect(paginationPrev).toHaveClass('test');
  });

  it('should render a pagination prev link with custom aria-label', () => {
    render(<PaginationPrev aria-label='test' />);
    const paginationPrev = screen.getByRole('button');
    expect(paginationPrev).toHaveAttribute('aria-label', 'test');
  });

  it('should render a pagination next link', () => {
    render(<PaginationNext />);
    const paginationNext = screen.getByRole('button');
    expect(paginationNext).toBeInTheDocument();
  });

  it('should render a pagination next link with custom class', () => {
    render(<PaginationNext className='test' />);
    const paginationNext = screen.getByRole('button');
    expect(paginationNext).toHaveClass('test');
  });

  it('should render a pagination next link with custom aria-label', () => {
    render(<PaginationNext aria-label='test' />);
    const paginationNext = screen.getByRole('button');
    expect(paginationNext).toHaveAttribute('aria-label', 'test');
  });

  it('should render a pagination dots link', () => {
    render(<PaginationDots />);
    const paginationDots = screen.getByRole('button');
    expect(paginationDots).toBeInTheDocument();
  });

  it('should render a pagination dots link with custom class', () => {
    render(<PaginationDots className='test' />);
    const paginationDots = screen.getByRole('button');
    expect(paginationDots).toHaveClass('test');
  });

  it('should render a pagination dots link with custom aria-label', () => {
    render(<PaginationDots aria-label='test' />);
    const paginationDots = screen.getByRole('button');
    expect(paginationDots).toHaveAttribute('aria-label', 'test');
  });
});
