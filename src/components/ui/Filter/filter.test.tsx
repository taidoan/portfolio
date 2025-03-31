import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from './index';
import type { Category } from '@/payload-types';

type CategoryWithoutCTA = Omit<Category, 'ctaLink'>;

const mockCategories: CategoryWithoutCTA[] = [
  {
    description:
      'Creating visually appealing and functional designs for physical materials, such as brochures, posters, flyers, business cards, and packaging. I ensure your printed materials leave a lasting impression.',
    slug: 'print',
    slugLock: true,
    title: 'Print',
    id: '67cece0800d7591f31a00957',
  },
  {
    description:
      'Crafting visually compelling websites that are easy to navigate and responsive across all devices. I focus on layout, typography, and interactive elements to create websites that look great and work even better.',
    slug: 'web-design',
    slugLock: true,
    parentCategory: {
      description:
        "Your online presence is everything, and I'm here to help you make it unforgettable. From sleek, responsive websites to engaging digital experiences, I design with purpose and creativity. Whether it's building a site from scratch or enhancing your existing one, I focus on user-friendly, beautiful designs that work seamlessly across devices. Let's bring your digital vision to life and make sure it stands out in the crowded online world.",
      slug: 'digital',
      slugLock: true,
      title: 'Digital',
      id: '67ceccd600d7591f31a008bc',
    } as Category,
    title: 'Web Design',
    id: '67cecdbc00d7591f31a0091b',
  },
];

const mockOnSelectCategory = vi.fn();

describe('<Filter>', () => {
  it('should render correctly', () => {
    render(
      <Filter
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategoryAction={mockOnSelectCategory}
        data-testid='filter'
      />,
    );
    expect(screen.getByTestId('filter')).toBeInTheDocument();

    mockCategories.forEach((category) => {
      expect(screen.getByText(category.title)).toBeInTheDocument();
    });
  });

  it('should render with a custom className if passed', () => {
    render(
      <Filter
        categories={mockCategories}
        className='test'
        data-testid='filter'
        selectedCategory={null}
        onSelectCategoryAction={mockOnSelectCategory}
      />,
    );
    const filter = screen.getByTestId('filter');
    expect(filter).toBeInTheDocument();
    expect(filter).toHaveClass('test');
  });

  it('should call onSelectCategoryAction when a category is clicked', () => {
    render(
      <Filter
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategoryAction={mockOnSelectCategory}
        data-testid='filter'
      />,
    );

    const printCategory = screen.getByText('Print');
    fireEvent.click(printCategory);

    expect(mockOnSelectCategory).toHaveBeenCalledWith('67cece0800d7591f31a00957');
  });

  it('should render an all button if option is passed as prop', () => {
    render(
      <Filter
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategoryAction={mockOnSelectCategory}
        showAllButton
        allButtonLabel='All'
        data-testid='filter'
      />,
    );

    const allButton = screen.getByText('All');
    expect(allButton).toBeInTheDocument();
  });

  it('should set the selected category to null when the all button is clicked', () => {
    render(
      <Filter
        categories={mockCategories}
        selectedCategory={null}
        onSelectCategoryAction={mockOnSelectCategory}
        showAllButton
        allButtonLabel='All'
        data-testid='filter'
      />,
    );

    const allButton = screen.getByText('All');
    fireEvent.click(allButton);

    expect(mockOnSelectCategory).toHaveBeenCalledWith(null);
  });
});
