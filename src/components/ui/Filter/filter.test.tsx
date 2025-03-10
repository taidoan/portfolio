import { render, screen, fireEvent } from '@testing-library/react';
import { Filter } from './index';
import type { ServiceWithDescription } from './types';
import type { Category } from '@/payload-types';
import style from './style.module.scss';

const mockCategories: Category[] = [
  {
    description:
      'Creating visually appealing and functional designs for physical materials, such as brochures, posters, flyers, business cards, and packaging. I ensure your printed materials leave a lasting impression.',
    slug: 'print',
    slugLock: true,
    createdAt: '2025-03-10T11:33:28.064Z',
    updatedAt: '2025-03-10T11:58:03.266Z',
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
        "Your online presence is everything, and I’m here to help you make it unforgettable. From sleek, responsive websites to engaging digital experiences, I design with purpose and creativity. Whether it's building a site from scratch or enhancing your existing one, I focus on user-friendly, beautiful designs that work seamlessly across devices. Let’s bring your digital vision to life and make sure it stands out in the crowded online world.",
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

const mockServices: ServiceWithDescription[] = [
  {
    meta: {},

    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Branding service description',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    slug: 'branding',
    slugLock: true,

    breadcrumbs: [],
    createdAt: '2025-03-10T11:54:55.104Z',
    updatedAt: '2025-03-10T11:56:16.354Z',
    title: 'Branding',
    id: '67ced30f00d7591f31a00bae',
  },
  {
    meta: {
      title: 'UI/UX | Tai Doan',
    },

    slug: 'ui-ux',
    slugLock: false,

    breadcrumbs: [
      {
        relationTo: {
          relationTo: 'pages',
          value: '67c1bd0b9fb50c2e22c139f5',
        },
        label: 'Home',
        id: '67cc09822867aed869c98c21',
      },

      {
        relationTo: {
          relationTo: 'pages',
          value: '67c469d99fb50c2e22c14045',
        },
        label: 'Services',
        id: '67cb3ca8afe3837fb56b4a8b',
      },
    ],
    createdAt: '2025-03-07T18:29:33.880Z',
    updatedAt: '2025-03-10T11:56:32.904Z',

    description: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'UI/UX Description',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
            textFormat: 0,
            textStyle: '',
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },

    title: 'UI/UX',
    id: '67cb3b0d00d7591f319f8bc2',
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

  it('should render correctly with service items', () => {
    render(
      <Filter
        categories={mockServices}
        selectedCategory={'67ced30f00d7591f31a00bae'}
        onSelectCategoryAction={mockOnSelectCategory}
        data-testid='filter'
      />,
    );

    expect(screen.getByTestId('filter')).toBeInTheDocument();
    mockServices.forEach((service) => {
      expect(screen.getByText(service.title)).toBeInTheDocument();
    });
  });

  it('the branding service should be selected by default', () => {
    render(
      <Filter
        categories={mockServices}
        selectedCategory={'67ced30f00d7591f31a00bae'}
        onSelectCategoryAction={mockOnSelectCategory}
        data-testid='filter'
      />,
    );
    const brandingService = screen.getByText('Branding');
    expect(brandingService).toHaveClass(style['filter__button--active']);
  });

  it('should call onSelectCategoryAction when a service is clicked', () => {
    render(
      <Filter
        categories={mockServices}
        selectedCategory={'67ced30f00d7591f31a00bae'}
        onSelectCategoryAction={mockOnSelectCategory}
        data-testid='filter'
      />,
    );

    const uiUxService = screen.getByText('UI/UX');
    fireEvent.click(uiUxService);

    expect(mockOnSelectCategory).toHaveBeenCalledWith('67cb3b0d00d7591f319f8bc2');
  });
});
