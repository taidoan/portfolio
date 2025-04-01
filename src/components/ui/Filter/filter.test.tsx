import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from './index';
import { mockCategories } from '@/mocks/data/mockCategories';

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

    mockCategories.forEach((category) => {
      const categoryButton = screen.getByText(category.title);
      fireEvent.click(categoryButton);
      expect(mockOnSelectCategory).toHaveBeenCalledWith(category.id);
    });
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
