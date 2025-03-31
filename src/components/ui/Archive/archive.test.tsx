import { render, screen, fireEvent } from '@testing-library/react';
import { Archive } from './index';
import { ReactNode } from 'react';
import { mockCategories, mockPosts as mockData } from './mocks';

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

describe('<Archive>', () => {
  it('should render correctly', () => {
    render(<Archive relation='posts' view='grid' data={mockData} categories={mockCategories} />);

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
    render(<Archive relation='posts' view='list' data={mockData} categories={mockCategories} />);

    expect(screen.queryByTestId('carousel')).not.toBeInTheDocument();

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(mockData.length);
  });

  it('should filter data when a category is selected', () => {
    render(<Archive relation='posts' view='grid' data={mockData} categories={mockCategories} />);

    const webDesignButton = screen.getByText('Web Design');
    fireEvent.click(webDesignButton);

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(1);
    expect(cards[0]).toHaveAttribute('data-href', 'posts/post-4');
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
