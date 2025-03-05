import { render, screen } from '@testing-library/react';
import { Alert } from '.';
import style from './style.module.scss';

describe('Alert Component', () => {
  it('renders the component', () => {
    render(<Alert severity='success'>Success Message</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('renders the error component', () => {
    render(<Alert severity='error'>Error Message</Alert>);
    const alert = screen.getByText('error');
    expect(alert).toBeInTheDocument();
  });

  it('renders the info component', () => {
    render(<Alert severity='info'>Info Message</Alert>);
    const alert = screen.getByText('info');
    expect(alert).toBeInTheDocument();
  });

  it('renders the warning component', () => {
    render(<Alert severity='warning'>Warning Message</Alert>);
    const alert = screen.getByText('warning');
    expect(alert).toBeInTheDocument();
  });

  it('renders the success component', () => {
    render(<Alert severity='success'>Success Message</Alert>);
    const alert = screen.getByText('success');
    expect(alert).toBeInTheDocument();
  });
});
