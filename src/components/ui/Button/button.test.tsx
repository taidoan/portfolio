import { render, screen } from '@testing-library/react';
import { Button } from '.';
import { IconChevronUp } from '@tabler/icons-react';
import style from './style.module.scss';

describe('Button', () => {
  it('renders a button', () => {
    render(<Button>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders a button with a custom class', () => {
    render(<Button className='test-class'>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('test-class');
  });

  it('renders a button with a custom color', () => {
    render(<Button color='primary'>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(style['button--clr-primary']);
  });

  it('renders a button with a custom shadow', () => {
    render(<Button shadow='small'>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(style['button--shadow-small']);
  });

  it('renders a circle button', () => {
    render(<Button shape='circle'>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass(style['button-shape--circle']);
  });

  it('renders a back to top circle button', () => {
    render(
      <Button shape='circle'>
        <IconChevronUp />
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass(style['button-shape--circle']);
    const icon = button.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('renders a button with a custom href', () => {
    render(<Button href='/'>Button</Button>);
    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('href', '/');
  });

  it('renders a button with a custom target', () => {
    render(
      <Button target='_blank' href='/'>
        Button
      </Button>,
    );
    const button = screen.getByRole('link');
    expect(button).toHaveAttribute('target', '_blank');
  });

  it('renders a button with a custom title', () => {
    render(<Button title='Button'>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Button');
  });

  it('renders a button with a custom type', () => {
    render(<Button type='submit'>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders a button with an action', () => {
    const action = vi.fn();
    render(<Button action={action}>Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
    button.click();
    expect(action).toHaveBeenCalled();
  });
});
