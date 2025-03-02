import { render, screen } from '@testing-library/react';
import { NavBar } from './navBar';
import type { Header, Social } from '@/payload-types';

const mockData = {
  id: 'nav-bar',
  navItems: [
    {
      id: 'home',
      link: {
        type: 'custom',
        label: 'Home',
        url: '/',
      },
    },
    {
      id: 'about',
      link: {
        type: 'custom',
        label: 'About',
        url: '/about',
      },
    },
    {
      id: 'projects',
      link: {
        type: 'custom',
        label: 'Projects',
        url: '/projects',
      },
    },
    {
      id: 'services',
      link: {
        type: 'custom',
        label: 'Services',
        url: '/services',
      },
    },
    {
      id: 'contact',
      link: {
        type: 'custom',
        label: 'Contact',
        url: '/contact',
      },
    },
  ],
} as Header;

const mockSocial = {
  id: 'social',
  'social-network': [
    {
      username: 'taidoan',
      network: 'github',
      id: 'github',
    },
    {
      username: 'taidoan',
      network: 'linkedin',
      id: 'linkedin',
    },
    {
      username: 'taidoan',
      network: 'instagram',
      id: 'instagram',
    },
    {
      username: 'taidoan',
      network: 'youtube',
      id: 'youtube',
    },
    {
      username: 'taidoan',
      network: 'x',
      id: 'x',
    },
  ],
} as Social;

describe('NavBar', () => {
  it('renders the navigation bar', () => {
    render(<NavBar data={mockData} social={mockSocial} data-testid='nav-bar' />);
    const nav = screen.getByTestId('nav-bar');
    expect(nav).toBeInTheDocument();
  });

  it('renders the navigation bar with a custom class', () => {
    render(<NavBar data={mockData} social={mockSocial} className='test-class' />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('test-class');
  });

  it('shows all navigation links', () => {
    render(<NavBar data={mockData} social={mockSocial} />);
    mockData.navItems.forEach((item) => {
      expect(screen.getByText(item.link.label)).toBeInTheDocument();
    });
  });

  it('shows all social links', () => {
    render(<NavBar data={mockData} social={mockSocial} />);
    mockSocial['social-network']?.forEach((item) => {
      expect(screen.getByLabelText(`Follow me on ${item.network}`)).toBeInTheDocument();
    });
  });
});
