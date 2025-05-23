import { render, screen, fireEvent } from '@testing-library/react';
import { TagCloud } from '.';
import { mockTags } from '@/mocks/data/mockTags';

describe('TagCloud', () => {
  it('renders a tag cloud component', () => {
    render(<TagCloud tags={mockTags} showCount={true} data-testid='tag-cloud' />);

    const tagCloud = screen.getByTestId('tag-cloud');
    expect(tagCloud).toBeInTheDocument();
  });

  it('renders a tag cloud component with a custom class', () => {
    render(
      <TagCloud tags={mockTags} className='test-class' showCount={true} data-testid='tag-cloud' />,
    );

    const tagCloud = screen.getByTestId('tag-cloud');
    expect(tagCloud).toHaveClass('test-class');
  });

  it('initially renders the alphabetically sorted tags', () => {
    render(<TagCloud tags={mockTags} showCount={true} data-testid='tag-cloud' />);

    const tags = screen.getAllByRole('link');
    expect(tags[0]).toHaveAttribute('href', '/search?query=accessibility&collection=tags');
    expect(tags[1]).toHaveAttribute('href', '/search?query=branding&collection=tags');
  });

  it('sorts the tags alphabetically when the switcher is clicked to "Alphabetically"', () => {
    render(<TagCloud tags={mockTags} showCount={true} data-testid='tag-cloud' />);

    const switcher = screen.getByRole('button', { name: 'Alphabetically' });
    fireEvent.click(switcher);

    const tags = screen.getAllByRole('link');
    expect(tags[2]).toHaveAttribute('href', '/search?query=digital&collection=tags');
    expect(tags[5]).toHaveAttribute('href', '/search?query=motion&collection=tags');
  });

  it('sorts the tags by size when the switcher is clicked to "Size"', () => {
    render(<TagCloud tags={mockTags} showCount={true} data-testid='tag-cloud' />);

    const switcher = screen.getByRole('button', { name: 'Size' });
    fireEvent.click(switcher);

    const tags = screen.getAllByRole('link');
    expect(tags[0]).toHaveAttribute('href', '/search?query=digital&collection=tags');
    expect(tags[1]).toHaveAttribute('href', '/search?query=ux&collection=tags');
  });

  it('does not show the count when showCount is false', () => {
    render(<TagCloud tags={mockTags} showCount={false} data-testid='tag-cloud' />);

    const tags = screen.getAllByRole('link');
    expect(tags[2]).toHaveTextContent('digital');
    expect(tags[2]).not.toHaveTextContent('5');
  });

  it('shows the count when showCount is true', () => {
    render(<TagCloud tags={mockTags} showCount={true} data-testid='tag-cloud' />);

    const tags = screen.getAllByRole('link');
    expect(tags[2]).toHaveTextContent('digital');
    expect(tags[2]).toHaveTextContent('5');
  });
});
