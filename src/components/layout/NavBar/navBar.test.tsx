import type { Header } from '@/payload-types';

import { render, screen } from '@testing-library/react';
import { NavBar } from './navBar';
import { mockSocialAccounts } from '@/mocks/data/mockSocial';
import { mockNavItems } from '@/mocks/data/mockNavItems';

const mockData = {
  id: 'nav-bar',
  navItems: mockNavItems,
} as Header;

describe('NavBar', () => {
  it('renders the navigation bar', () => {
    render(<NavBar data={mockData} social={mockSocialAccounts} data-testid='nav-bar' />);
    const nav = screen.getByTestId('nav-bar');
    expect(nav).toBeInTheDocument();
  });

  it('renders the navigation bar with a custom class', () => {
    render(<NavBar data={mockData} social={mockSocialAccounts} className='test-class' />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('test-class');
  });

  it('shows all navigation links', () => {
    render(<NavBar data={mockData} social={mockSocialAccounts} />);
    mockData.navItems.forEach((item) => {
      expect(screen.getByText(item.link.label)).toBeInTheDocument();
    });
  });

  it('shows all social links', () => {
    render(<NavBar data={mockData} social={mockSocialAccounts} />);
    mockSocialAccounts?.forEach((item) => {
      expect(screen.getByLabelText(`Follow me on ${item.network}`)).toBeInTheDocument();
    });
  });
});
