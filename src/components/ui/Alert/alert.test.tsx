import { render, screen } from '@testing-library/react';
import { Alert } from '.';
import { AlertTitle } from './AlertTitle';
import style from './style.module.scss';

describe('Alert Component', () => {
  it('renders the component', () => {
    render(<Alert severity='success'>Success Message</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('renders the component with a filled class by default', () => {
    render(<Alert severity='warning'>Warning message</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass(style['alert--filled']);
  });

  it('renders the component with a outlined class when selected in props', () => {
    render(
      <Alert severity='info' variant='outlined'>
        Info message
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass(style['alert--outlined']);
  });

  it('renders the component with a success class', () => {
    render(<Alert severity='success'>Success Message</Alert>);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass(style['alert--success']);
  });

  it('renders the component with a warning and outlined class when passed in props', () => {
    render(
      <Alert severity='warning' variant='outlined'>
        Warning Message
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass(style['alert--warning']);
    expect(alert).toHaveClass(style['alert--outlined']);
  });

  it('renders a success icon when severity is success', () => {
    render(<Alert severity='success'>Big success!</Alert>);
    const icon = screen.getByLabelText('Success Alert');
    expect(icon).toBeInTheDocument();
  });

  it('renders a warning icon when severity is warning', () => {
    render(<Alert severity='warning'>Warning!</Alert>);
    const icon = screen.getByLabelText('Warning Alert');
    expect(icon).toBeInTheDocument();
  });

  it('renders an info icon when severity is info', () => {
    render(<Alert severity='info'>Info message</Alert>);
    const icon = screen.getByLabelText('Info Alert');
    expect(icon).toBeInTheDocument();
  });

  it('renders an error icon when severity is error', () => {
    render(<Alert severity='error'>Error message</Alert>);
    const icon = screen.getByLabelText('Error Alert');
    expect(icon).toBeInTheDocument();
  });

  it('renders a title when component is put in the children', () => {
    render(
      <Alert severity='warning'>
        <AlertTitle>Warning</AlertTitle>
        Warning message
      </Alert>,
    );
    const title = screen.getByText('Warning');
    expect(title).toBeInTheDocument();
  });
});
