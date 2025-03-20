import { render, screen } from '@testing-library/react';
import { DetailsList, DetailsItem } from './details/components';
import { ProjectDetails } from './details';
import type { Project } from '@/payload-types';

describe('<DetailsList>', () => {
  it('renders a details list component', () => {
    render(
      <DetailsList data-testid='details-list'>
        <DetailsItem type='client'>Example Client</DetailsItem>
        <DetailsItem type='tools'>Example Tools</DetailsItem>
      </DetailsList>,
    );

    expect(screen.getByTestId('details-list')).toBeInTheDocument();
    expect(screen.getByText('Client:')).toBeInTheDocument();
    expect(screen.getByText('Example Client')).toBeInTheDocument();
    expect(screen.getByText('Tools:')).toBeInTheDocument();
    expect(screen.getByText('Example Tools')).toBeInTheDocument();
    expect(screen.getByTestId('client-icon')).toBeInTheDocument();
    expect(screen.getByTestId('tools-icon')).toBeInTheDocument();
  });
});

describe('<ProjectDetails />', () => {
  const mockDetails: Pick<Project, 'details'> = {
    details: {
      date: '2024-10-17T12:00:00.000Z',
      type: 'Branding & Website',
      tools: 'Figma, NextJS, SCSS',
      name: 'Urban Bites',
      url: 'https://example.com',
      previewLabel: 'Live Preview',
      previewUrl: 'https://preview.com',
    },
  };

  it('renders project details correctly', () => {
    render(<ProjectDetails data={mockDetails} className='project__info' />);

    expect(screen.getByText('17/10/2024')).toBeInTheDocument(); // Check formatted date
    expect(screen.getByText('Figma, NextJS, SCSS')).toBeInTheDocument();
    expect(screen.getByText('Urban Bites')).toBeInTheDocument();
    expect(screen.getByText('Live Preview')).toBeInTheDocument();
  });

  it('renders client name as a link when url is provided', () => {
    render(<ProjectDetails data={mockDetails} className='project__info' />);

    const clientLink = screen.getByRole('link', { name: 'Urban Bites' });
    expect(clientLink).toHaveAttribute('href', 'https://example.com');
    expect(clientLink).toHaveAttribute('target', '_blank');
    expect(clientLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders preview label as a link when previewUrl is provided', () => {
    render(<ProjectDetails data={mockDetails} className='project__info' />);

    const previewLink = screen.getByRole('link', { name: 'Live Preview' });
    expect(previewLink).toHaveAttribute('href', 'https://preview.com');
  });

  it('renders text without links when URLs are missing', () => {
    const mockNoLinks = {
      details: {
        ...mockDetails.details,
        url: undefined,
        previewUrl: undefined,
      },
    };

    render(<ProjectDetails data={mockNoLinks} className='project__info' />);

    expect(screen.getByText('Urban Bites')).toBeInTheDocument();
    expect(screen.getByText('Live Preview')).toBeInTheDocument();
  });
});
