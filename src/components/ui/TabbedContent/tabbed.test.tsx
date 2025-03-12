import { render, screen, fireEvent } from '@testing-library/react';
import { TabbedContent } from '.';
import { TabFilterCategories } from './types';
import { ReactNode } from 'react';

vi.mock('../Carousel', () => ({
  Carousel: ({ children }: { children: ReactNode }) => <div data-testid='carousel'>{children}</div>,
}));

const mockCategories: TabFilterCategories = [
  {
    title: 'Branding',
    id: '59ef0733-32c0-4f20-ad1c-6aaf4d5f4836',
    slug: '/services/branding',
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
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    items: [
      {
        title: 'Logo Design',

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
                    text: 'Logo Design testy',
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
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },

        image: {
          alt: 'Branding Icon',
          prefix: 'media',
          filename: 'branding.svg',
          mimeType: 'image/svg+xml',
          filesize: 3860,
          width: 214,
          height: 200,
          createdAt: '2025-03-12T10:19:56.275Z',
          updatedAt: '2025-03-12T10:19:56.275Z',
          id: '67d15fcc40d3105ab50713e7',
          url: '/api/media/file/branding.svg',
          thumbnailURL: null,
        },
        id: '67d1ad63a5fcbb6c11527e83',
      },

      {
        title: 'Social Media',

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
                    text: 'Social media Design testy',
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
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'root',
            version: 1,
          },
        },

        image: {
          alt: 'Branding Icon',
          prefix: 'media',
          filename: 'branding.svg',
          mimeType: 'image/svg+xml',
          filesize: 3860,
          width: 214,
          height: 200,
          createdAt: '2025-03-12T10:19:56.275Z',
          updatedAt: '2025-03-12T10:19:56.275Z',
          id: '67d15fcc40d3105ab50713e7',
          url: '/api/media/file/branding.svg',
          thumbnailURL: null,
        },
        id: '67d1ad77a5fcbb6c11527e88',
      },
    ],
  },
  {
    title: 'UI & UX',
    id: 'f4f1e5f4-4784-493e-b161-cf606b2b1741',
    slug: '/services/ui-ux',
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
                text: 'UI/UX service description',
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
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
  },
  {
    title: 'Graphic Design',
    id: '072f9bed-78d7-426a-9793-81da79aaad8f',
    slug: '/services/graphic-design',
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
                text: 'Graphic design service description',
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
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
  },
  {
    title: 'Development',
    id: '58de7f8f-2ef8-46a0-a4da-34c0ce21ccec',
    slug: '/services/development',
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
                text: 'Development service description',
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
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
  },
];

describe('<TabbedContent>', () => {
  it('should render correctly', () => {
    render(<TabbedContent categories={mockCategories} />);
    expect(screen.getByTestId('tabbed-content')).toBeInTheDocument();
    mockCategories.forEach((category) => {
      const button = screen.getByRole('button', { name: category.title });
      expect(button).toBeInTheDocument();
    });
  });

  it('should set the active category to the first by default', () => {
    render(<TabbedContent categories={mockCategories} />);
    expect(screen.getByText('Branding service description')).toBeInTheDocument();

    expect(screen.getByText('Logo Design')).toBeInTheDocument();
  });

  it('should display the description of the clicked category', () => {
    render(<TabbedContent categories={mockCategories} />);
    const graphicDesignCategory = screen.getByText('Graphic Design');
    fireEvent.click(graphicDesignCategory);

    expect(screen.getByText('Graphic design service description')).toBeInTheDocument();
  });
});
