import { render, screen } from '@testing-library/react';
import { Divider } from './index';
import style from './styles.module.scss';

describe('Divider', () => {
  it('renders a divider', () => {
    render(<Divider type='content' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toBeInTheDocument();
  });

  it('renders a divider with class of thin when weight is thin', () => {
    render(<Divider type='section' weight='thin' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style.thin);
  });

  it('renders a divider with class of light when weight is thick', () => {
    render(<Divider type='section' weight='thick' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style.thick);
  });

  it('renders a divider with class of thin when weight is undefined', () => {
    render(<Divider type='content' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style.thin);
  });

  it('renders a divider with class of half when width is half', () => {
    render(<Divider type='content' width='half' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style.half);
  });

  it('renders a divider with class of full when width is full', () => {
    render(<Divider type='content' width='full' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style.full);
  });

  it('renders a divider with a class of centered when centered in true', () => {
    render(<Divider type='content' width='full' centered={true} />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style.centered);
  });

  it('renders a divider with a class of accent when color is accent', () => {
    render(<Divider type='content' color='accent' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style['clr-accent']);
  });

  it('renders a divider with a class of secondary when color is secondary', () => {
    render(<Divider type='content' color='secondary' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style['clr-secondary']);
  });

  it('renders a divider with a color class of primary when color is primary', () => {
    render(<Divider type='content' color='primary' />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveClass(style['clr-primary']);
  });

  it('it renders a divider with an inline style of opacity when opacity is passed', () => {
    render(<Divider type='content' opacity={1} />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveStyle({ opacity: '1' });
  });
});
