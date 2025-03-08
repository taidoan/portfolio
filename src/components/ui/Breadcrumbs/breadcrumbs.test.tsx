import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './index'; // Adjust import path as needed
import * as hooks from '@/lib/hooks/useMediaQuery';
import style from './style.module.scss';

// Mock the hooks and utilities
vi.mock('@/lib/hooks/useMediaQuery', () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock('@/lib/utilities/getURLs', () => ({
  getServerSideURL: vi.fn(() => 'https://example.com'),
}));

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    __esModule: true,
    default: ({
      href,
      children,
      className,
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
    }) => {
      return (
        <a href={href} className={className}>
          {children}
        </a>
      );
    },
  };
});

describe('Breadcrumbs', () => {
  const mockBreadcrumbs = [
    { id: '1', title: 'Home', slug: 'home', url: '/' },
    { id: '2', title: 'Products', slug: 'products', url: '/products' },
    { id: '3', title: 'Item', slug: 'item', url: '/products/item' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when breadcrumbs are null', () => {
    render(<Breadcrumbs breadcrumbs={null} />);
    expect(screen.queryByTestId('breadcrumbs')).not.toBeInTheDocument();
  });

  it('renders nothing when breadcrumbs are undefined', () => {
    render(<Breadcrumbs breadcrumbs={undefined} />);
    expect(screen.queryByTestId('breadcrumbs')).not.toBeInTheDocument();
  });

  it('renders nothing when breadcrumbs are empty array', () => {
    render(<Breadcrumbs breadcrumbs={[]} />);
    expect(screen.queryByTestId('breadcrumbs')).not.toBeInTheDocument();
  });

  it('renders all breadcrumbs correctly', () => {
    vi.mocked(hooks.useMediaQuery).mockReturnValue(true);

    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} />);

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Item')).toBeInTheDocument();
  });

  it('renders the last item without a link', () => {
    vi.mocked(hooks.useMediaQuery).mockReturnValue(true);

    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} />);

    const homeLink = screen.getByText('Home').closest('a');
    const productsLink = screen.getByText('Products').closest('a');
    const itemElement = screen.getByText('Item');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(productsLink).toHaveAttribute('href', '/products');
    expect(itemElement.closest('a')).toBeNull();
    expect(itemElement.closest('span')).toHaveAttribute('aria-current', 'page');
  });

  it('renders home icon on mobile screens', () => {
    vi.mocked(hooks.useMediaQuery).mockReturnValue(false);

    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} />);

    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });

  it('uses custom medium screen value when provided', () => {
    vi.mocked(hooks.useMediaQuery).mockReturnValue(false); // Internal hook says mobile

    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} isMediumScreen={true} />);

    // Even though the hook returns false, we should see "Home" text because we passed true
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
  });

  it('applies boxed container class when specified', () => {
    vi.mocked(hooks.useMediaQuery).mockReturnValue(true);

    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} container='boxed' />);

    const container = screen.getByTestId('breadcrumbs').querySelector('ol');
    expect(container).toHaveClass(style['breadcrumbs__container--boxed']);
  });

  it('applies background classes correctly', () => {
    vi.mocked(hooks.useMediaQuery).mockReturnValue(true);

    render(<Breadcrumbs breadcrumbs={mockBreadcrumbs} container='boxed' background='light' />);

    const container = screen.getByTestId('breadcrumbs').querySelector('ol');
    expect(container).toHaveClass(style['breadcrumbs__bg--light']);
  });

  it('uses url when available instead of constructing from slug', () => {
    vi.mocked(hooks.useMediaQuery).mockReturnValue(true);

    const customBreadcrumbs = [
      { id: '1', title: 'Home', url: '/custom-home' },
      { id: '2', title: 'Products', slug: 'products' },
      { id: '3', title: 'Item', slug: 'item' },
    ];

    render(<Breadcrumbs breadcrumbs={customBreadcrumbs} />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveAttribute('href', '/custom-home');

    const productsLink = screen.getByRole('link', { name: /Products/i });
    expect(productsLink).toBeInTheDocument();

    const item = screen.getByText('Item');
    expect(item).not.toHaveAttribute('href');
  });
});
