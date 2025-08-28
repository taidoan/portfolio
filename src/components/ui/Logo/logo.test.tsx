import { render, screen } from '@testing-library/react';
import { Logo } from '.';
import style from './style.module.scss';

describe('Logo', () => {
  it('renders the site logo', () => {
    render(<Logo />);
    const logo = screen.getByRole('img');
    expect(logo).toBeInTheDocument();
  });

  it('renders the site logo with a custom class', () => {
    render(<Logo className='test-class' />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveClass('test-class');
  });

  it('renders the site logo with a custom link class', () => {
    render(<Logo linkClassName='test-link-class' />);
    const link = screen.getByRole('link');
    expect(link).toHaveClass('test-link-class');
  });

  it('renders a link to the homepage', () => {
    render(<Logo />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders a light logo', () => {
    render(<Logo colour='light' />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveClass(style['logo--light']);
  });

  it('renders an accent logo', () => {
    render(<Logo colour='accent' />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveClass(style['logo--accent']);
  });

  it('renders a secondary logo', () => {
    render(<Logo colour='secondary' />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveClass(style['logo--secondary']);
  });

  it('renders a primary logo', () => {
    render(<Logo colour='primary' />);
    const logo = screen.getByRole('img');
    expect(logo).toHaveClass(style['logo--primary']);
  });
});
