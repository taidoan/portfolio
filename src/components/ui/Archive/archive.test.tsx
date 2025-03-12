import { render, screen, fireEvent } from '@testing-library/react';
import { Archive } from './index';
import type { Category } from '@/payload-types';
import { ReactNode } from 'react';

vi.mock('motion/react', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LazyMotion: ({ children }: { children: ReactNode; features?: any }) => <>{children}</>,
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  domAnimation: {},
}));

vi.mock('motion/react-m', () => ({
  div: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

vi.mock('../Carousel', () => ({
  Carousel: ({ children }: { children: ReactNode }) => <div data-testid='carousel'>{children}</div>,
}));

vi.mock('@/components/ui/Card', () => ({
  Card: ({ children, relation, href }: { children: ReactNode; relation: string; href: string }) => (
    <div data-testid='card' data-relation={relation} data-href={href}>
      {children}
    </div>
  ),
  CardBody: ({ children }: { children: ReactNode }) => (
    <div data-testid='card-body'>{children}</div>
  ),
  CardImage: ({ align, borderRadius }: { align: string; borderRadius: string }) => (
    <div data-testid='card-image' data-align={align} data-border-radius={borderRadius}></div>
  ),
  CardContent: ({ children }: { children: ReactNode }) => (
    <div data-testid='card-content'>{children}</div>
  ),
  CardTitle: () => <div data-testid='card-title'>Mocked Title</div>,
  CardContext: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Provider: ({ children, value }: { children: ReactNode; value: any }) => (
      <div data-testid='card-context-provider' data-value={JSON.stringify(value)}>
        {children}
      </div>
    ),
  },
}));

vi.mock('@components/ui/Filter', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Filter: ({ categories, onSelectCategoryAction }: any) => (
    <div data-testid='filter' data-categories={JSON.stringify(categories)}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {categories.map((category: any) => (
        <button key={category.id} onClick={() => onSelectCategoryAction(category.id)}>
          {category.title}
        </button>
      ))}
    </div>
  ),
}));

vi.mock('@components/ui/Alert', () => ({
  Alert: ({ children, severity }: { children: ReactNode; severity: string }) => (
    <div data-testid='alert' data-severity={severity}>
      {children}
    </div>
  ),
  AlertTitle: ({ children }: { children: ReactNode }) => (
    <div data-testid='alert-title'>{children}</div>
  ),
}));

const mockCategories: Category[] = [
  {
    description: 'Creating visually appealing and functional designs for physical materials.',
    slug: 'print',
    slugLock: true,
    createdAt: '2025-03-10T11:33:28.064Z',
    updatedAt: '2025-03-10T11:58:03.266Z',
    title: 'Print',
    id: '67cece0800d7591f31a00957',
  },
  {
    description: 'Crafting visually compelling websites that are easy to navigate.',
    slug: 'web-design',
    slugLock: true,
    parentCategory: {
      description: 'Your online presence is everything.',
      slug: 'digital',
      slugLock: true,
      createdAt: '2025-03-10T11:28:22.674Z',
      updatedAt: '2025-03-10T11:59:44.547Z',
      title: 'Digital',
      id: '67ceccd600d7591f31a008bc',
    },
    createdAt: '2025-03-10T11:32:12.746Z',
    updatedAt: '2025-03-10T11:58:10.905Z',
    title: 'Web Design',
    id: '67cecdbc00d7591f31a0091b',
  },
];

const mockData = [
  {
    title: 'Post 1',
    details: {
      type: 'Website',
    },
    thumbnail: 'https://placeimg.com/640/480/animals',
    slug: 'post-1',
    id: '67c1bd0b9fb50c2e22c139f5',
    categories: [
      {
        slug: 'print',
        title: 'Print',
        id: '67cece0800d7591f31a00957',
        updatedAt: '2025-03-10T11:33:28.064Z',
        createdAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
  {
    title: 'Post 2',
    details: {
      type: 'Website',
    },
    thumbnail: 'https://placeimg.com/640/480/animals',
    slug: 'post-2',
    id: '67c1bgg0b9fb50c2e22c139f12',
    categories: [
      {
        title: 'Print',
        slug: 'print',
        id: '67cece0800d7591f31a00957',
        updatedAt: '2025-03-10T11:33:28.064Z',
        createdAt: '2025-03-10T11:33:28.064Z',
      },
    ],
  },
  {
    title: 'Post 3',
    thumbnail: 'https://placeimg.com/640/480/animals',
    slug: 'post-3',
    id: '67c1bgg0b9fb50c2e22c139f13',
    details: {
      type: 'Website',
    },
    categories: [
      {
        title: 'Web Design',
        slug: 'web-design',
        id: '67cecdbc00d7591f31a0091b',
        updatedAt: '2025-03-10T11:58:10.905Z',
        createdAt: '2025-03-10T11:58:10.905Z',
      },
    ],
  },
];

describe('<Archive>', () => {
  it('should render correctly', () => {
    render(
      <Archive
        relation='posts'
        view='grid'
        data={mockData}
        categories={mockCategories}
        data-testid='archive'
      />,
    );

    expect(screen.getByTestId('archive')).toBeInTheDocument();

    const filter = screen.getByTestId('filter');
    expect(filter).toBeInTheDocument();

    expect(screen.getByTestId('carousel')).toBeInTheDocument();

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockData.length);

    mockData.forEach((item, index) => {
      expect(cards[index]).toHaveAttribute('data-href', `posts/${item.slug}`);
    });
  });

  it('should render in list view', () => {
    render(
      <Archive
        relation='posts'
        view='list'
        data={mockData}
        categories={mockCategories}
        data-testid='archive'
      />,
    );

    expect(screen.queryByTestId('carousel')).not.toBeInTheDocument();

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockData.length);
  });

  it('should filter data when a category is selected', () => {
    render(
      <Archive
        relation='posts'
        view='grid'
        data={mockData}
        categories={mockCategories}
        data-testid='archive'
      />,
    );

    const webDesignButton = screen.getByText('Web Design');
    fireEvent.click(webDesignButton);

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(1);
    expect(cards[0]).toHaveAttribute('data-href', 'posts/post-3');
  });

  it('should show warning when no data is found', () => {
    render(
      <Archive
        relation='posts'
        view='grid'
        data={[]}
        categories={mockCategories}
        data-testid='archive'
      />,
    );

    const alert = screen.getByTestId('alert');
    expect(alert).toHaveAttribute('data-severity', 'warning');
    expect(screen.getByText('No Projects')).toBeInTheDocument();
  });
});
