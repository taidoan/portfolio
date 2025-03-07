import { render, screen } from '@testing-library/react';
import SpotifyRenderTracks from './render';
import { ReactNode } from 'react';

vi.mock('./utils/api', () => ({
  getTopTracks: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    width,
    height,
    className,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
  }) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      data-testid='mock-image'
    />
  ),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    target,
    rel,
    className,
    children,
  }: {
    href: string;
    target?: string;
    rel?: string;
    className?: string;
    children: ReactNode;
  }) => (
    <a href={href} target={target} rel={rel} className={className} data-testid='mock-link'>
      {children}
    </a>
  ),
}));

vi.mock('@/components/ui/Card', () => ({
  Card: ({ className, children }: { className?: string; children: ReactNode }) => (
    <div className={className} data-testid='mock-card'>
      {children}
    </div>
  ),
  CardBody: ({ children }: { children: ReactNode }) => (
    <div data-testid='mock-card-body'>{children}</div>
  ),
}));

vi.mock('@/components/ui/Alert', () => ({
  Alert: ({ severity, children }: { severity: string; children: ReactNode }) => (
    <div data-severity={severity} data-testid='mock-alert'>
      {children}
    </div>
  ),
  AlertTitle: ({ children }: { children: ReactNode }) => (
    <div data-testid='mock-alert-title'>{children}</div>
  ),
}));

const mockTrack = {
  key: 1,
  title: 'Test Song',
  songUrl: 'https://spotify.com/song/1',
  albumCover: {
    url: 'https://example.com/album.jpg',
    height: 100,
    width: 100,
  },
  artists: [
    { name: 'Artist 1', url: 'https://spotify.com/artist/1' },
    { name: 'Artist 2', url: 'https://spotify.com/artist/2' },
  ],
};

describe('<SpotifyRenderTracks>', () => {
  it('renders track info correctly without a card container', () => {
    render(<SpotifyRenderTracks track={mockTrack} />);

    expect(screen.getByText('Test Song')).toBeInTheDocument();
    expect(screen.getByText('Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Artist 2')).toBeInTheDocument();

    const links = screen.getAllByTestId('mock-link');
    expect(
      links.some((link) => link.getAttribute('href') === 'https://spotify.com/song/1'),
    ).toBeTruthy();
    expect(
      links.some((link) => link.getAttribute('href') === 'https://spotify.com/artist/1'),
    ).toBeTruthy();
    expect(
      links.some((link) => link.getAttribute('href') === 'https://spotify.com/artist/2'),
    ).toBeTruthy();

    const images = screen.getAllByTestId('mock-image');
    expect(
      images.some((img) => img.getAttribute('src') === 'https://example.com/album.jpg'),
    ).toBeTruthy();
    expect(
      images.some((img) => img.getAttribute('src') === 'assets/icons/spotify-logo-black.svg'),
    ).toBeTruthy();

    expect(screen.queryByTestId('mock-card')).not.toBeInTheDocument();
  });

  it('renders track info correctly with a card container', () => {
    render(<SpotifyRenderTracks track={mockTrack} container='card' />);
    expect(screen.getByTestId('mock-card')).toBeInTheDocument();
    expect(screen.getByTestId('mock-card-body')).toBeInTheDocument();
  });

  it('renders the spotify logo correctly', () => {
    render(<SpotifyRenderTracks track={mockTrack} container='card' />);
    const images = screen.getAllByTestId('mock-image');
    expect(
      images.some((img) => img.getAttribute('src') === 'assets/icons/spotify-logo.svg'),
    ).toBeTruthy();
  });

  it('renders an error when track is not provided', () => {
    // @ts-expect-error - intentionally passing undefined for testing
    render(<SpotifyRenderTracks track={undefined} />);
    expect(screen.getByTestId('mock-alert')).toBeInTheDocument();
    expect(screen.getByTestId('mock-alert').getAttribute('data-severity')).toBe('error');
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(
      screen.getByText('Something went wrong, could not fetch top tracks.'),
    ).toBeInTheDocument();
  });

  it('renders multiple artists correctly', () => {
    render(<SpotifyRenderTracks track={mockTrack} />);
    const artistSection = screen.getByText('Artist 1').closest('p');
    expect(artistSection).toHaveTextContent('Artist 1');
    expect(artistSection).toHaveTextContent('Artist 2');
    expect(artistSection).toHaveTextContent(','); // Check for comma presence
  });
});
