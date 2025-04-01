import { render, screen, act } from '@testing-library/react';
import { Card, CardTitle, CardBody, CardImage, CardContent } from './index';
import style from './style.module.scss';
import { mockProjects } from '@/mocks/data/mockProjects';

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
      <Card data={mockProjects[0]}>
        <CardTitle />
      </Card>,
    );
    const cardTitle = screen.getByText('Vibz');
    expect(cardTitle).toBeInTheDocument();
  });

  it('renders a card title wrapped in a link if the link is provided', async () => {
    await act(async () => {
      render(
        <Card data={mockProjects[0]} href='/example' target='_blank' title='Example Link'>
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
    const expectedUrl = `https://ik.imagekit.io/1ih3i3bte/media/tr:w-3840,q-80,f-auto,tr-progressive/vibz-thumbnail.webp`;

    render(
      <Card>
        <CardImage src={mockProjects[0].thumbnail?.filename || null} alt='Example Image' />
      </Card>,
    );
    const cardImage = screen.getByAltText('Example Image');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', expectedUrl);
  });

  it('renders an overlay if the relation is projects', async () => {
    await act(async () => {
      render(
        <Card relation='projects' data={mockProjects[0]}>
          <CardImage alt='Example Image' />
        </Card>,
      );
    });
    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeInTheDocument();
  });

  it('renders a thumbnail if the data has a thumbnail', () => {
    const expectedUrl = `https://ik.imagekit.io/1ih3i3bte/media/tr:w-3840,q-80,f-auto,tr-progressive/vibz-thumbnail.webp`;

    render(
      <Card data={mockProjects[0]}>
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
        <Card data={mockProjects[0]} href='/example' target='_blank' title='Example Link'>
          <CardImage alt='Example Image' />
        </Card>,
      );
    });
    const cardLink = screen.getByRole('link');
    expect(cardLink).toBeInTheDocument();
    expect(cardLink).toHaveAttribute('href', '/example');
    expect(cardLink).toHaveAttribute('target', '_blank');
    expect(cardLink).toHaveAttribute('title', 'Example Link');
    const expectedUrl = `https://ik.imagekit.io/1ih3i3bte/media/tr:w-3840,q-80,f-auto,tr-progressive/vibz-thumbnail.webp`;
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
