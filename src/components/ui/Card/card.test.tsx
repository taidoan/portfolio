import { render, screen, act } from '@testing-library/react';
import { Card, CardTitle, CardBody, CardImage, CardContent } from '.';
import { getCDNURL } from '@/lib/utilities/getURLs';
import style from './style.module.scss';

const mockData = {
  id: '679a37928643d526c4e122da',
  slug: 'urban-bites',
  title: 'Urban Bites',
  details: {
    type: 'Website',
    date: '2022-01-01',
  },
  thumbnail: {
    id: '67a369aea507939cb6c21476',
    alt: 'Urban Bites Thumbnail',
    prefix: 'media',
    filename: 'Urban Bites Thumbnail.webp',
    mimeType: 'image/webp',
    filesize: 14576,
    width: 1600,
    height: 900,
    focalX: 50,
    focalY: 50,
    createdAt: '2025-02-05T13:37:50.875Z',
    updatedAt: '2025-02-05T13:37:50.875Z',
    url: '/api/media/file/Urban%20Bites%20Thumbnail.webp',
    thumbnailURL: null,
  },
  categories: [
    {
      id: '67cece0800d7591f31a00957',
      title: 'Print',
      slug: 'print',
      description:
        'Creating visually appealing and functional designs for physical materials like brochures and posters.',
      updatedAt: '2025-03-10T11:33:28.064Z',
      createdAt: '2025-03-10T11:33:28.064Z',
    },
    {
      id: '67cecd3c00d7591f31a008d7',
      title: 'Graphic Design',
      slug: 'graphic-design',
      description: 'Crafting stunning visuals for marketing campaigns and branding.',
      updatedAt: '2025-03-10T11:58:52.603Z',
      createdAt: '2025-03-10T11:58:52.603Z',
    },
  ],
};

describe('<CardTitle>', () => {
  it('renders a card title with children', () => {
    render(
      <Card>
        <CardTitle>This Is A Card Title</CardTitle>
      </Card>,
    );
    const cardTitle = screen.getByText('This Is A Card Title');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders a card title from data if no children are provided', () => {
    render(
      <Card data={mockData}>
        <CardTitle />
      </Card>,
    );
    const cardTitle = screen.getByText('Urban Bites');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders a card title wrapped in a link if the link is provided', async () => {
    await act(async () => {
      render(
        <Card data={mockData} href='/example' target='_blank' title='Example Link'>
          <CardTitle />
        </Card>,
      );
    });
    const cardLink = screen.getByRole('link');
    expect(cardLink).toBeInTheDocument();
    expect(cardLink).toHaveAttribute('href', '/example');
    expect(cardLink).toHaveAttribute('target', '_blank');
    expect(cardLink).toHaveAttribute('title', 'Example Link');
  });
});

describe('<CardBody>', () => {
  it('renders a card body component', () => {
    render(
      <Card>
        <CardBody></CardBody>
      </Card>,
    );
    const cardBody = screen.getByTestId('card-body');
    expect(cardBody).toBeInTheDocument();
  });

  it('renders a card body with children', () => {
    render(
      <Card>
        <CardBody>This is a card body</CardBody>
      </Card>,
    );
    const cardBody = screen.getByText('This is a card body');
    expect(cardBody).toBeInTheDocument();
  });
});

describe('<CardImage>', () => {
  it('renders a card image component', () => {
    const expectedUrl = `https://ik.imagekit.io/1ih3i3bte/media/tr:w-3840,q-80,f-auto,tr-progressive//api/media/file/Urban%2520Bites%2520Thumbnail.webp`;

    render(
      <Card>
        <CardImage src={mockData.thumbnail?.url || null} alt='Example Image' />
      </Card>,
    );
    const cardImage = screen.getByAltText('Example Image');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', expectedUrl);
  });

  it('renders an overlay if the relation is projects', async () => {
    await act(async () => {
      render(
        <Card relation='projects' data={mockData}>
          <CardImage alt='Example Image' />
        </Card>,
      );
    });
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();
  });

  it('renders a thumbnail if the data has a thumbnail', () => {
    const mockCDNUrl = getCDNURL();
    const expectedUrl = `${mockCDNUrl}/tr:w-3840,q-80,f-auto,tr-progressive/${encodeURI(mockData.thumbnail.filename)}`;

    render(
      <Card data={mockData}>
        <CardImage alt='Example Image' />
      </Card>,
    );
    const cardImage = screen.getByAltText('Example Image');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', expectedUrl);
  });

  it('renders a image wrapped in a link if the link is provided', async () => {
    await act(async () => {
      render(
        <Card data={mockData} href='/example' target='_blank' title='Example Link'>
          <CardImage alt='Example Image' />
        </Card>,
      );
    });
    const cardLink = screen.getByRole('link');
    expect(cardLink).toBeInTheDocument();
    expect(cardLink).toHaveAttribute('href', '/example');
    expect(cardLink).toHaveAttribute('target', '_blank');
    expect(cardLink).toHaveAttribute('title', 'Example Link');
    const mockCDNUrl = getCDNURL();
    const expectedUrl = `${mockCDNUrl}/tr:w-3840,q-80,f-auto,tr-progressive/${encodeURI(mockData.thumbnail.filename)}`;
    const cardImage = screen.getByAltText('Example Image');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', expectedUrl);
  });
});

describe('<CardContent>', () => {
  it('renders a card content component', () => {
    render(
      <Card>
        <CardContent>This is a card content</CardContent>
      </Card>,
    );
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toBeInTheDocument();
  });

  it('renders the component with the inside container class', () => {
    render(
      <Card>
        <CardContent insideContainer={true}>This is a card content</CardContent>
      </Card>,
    );
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toHaveClass(style['card__content--inside']);
  });

  it('renders the component with the projects class if the relation is projects', () => {
    render(
      <Card relation='projects'>
        <CardContent>This is a card content</CardContent>
      </Card>,
    );
    const cardContent = screen.getByTestId('card-content');
    expect(cardContent).toHaveClass(style['card__content--project']);
  });

  it('renders the component with a project icon if the relation is projects and the link is provided', () => {
    render(
      <Card relation='projects' href='/example'>
        <CardContent>This is a card content</CardContent>
      </Card>,
    );
    const projectIcon = screen.getByTestId('project-icon');
    expect(projectIcon).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/example');
  });
});
