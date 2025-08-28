import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '.';
import { mockAccordionItems } from '@/mocks/data/mockAccordionItems';

describe('<Accordion>', () => {
  it('renders the component with items', () => {
    render(<Accordion items={mockAccordionItems} />);
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toBeInTheDocument();
  });

  it('renders the component with a custom class', () => {
    render(<Accordion items={mockAccordionItems} className='test-class' />);
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toHaveClass('test-class');
  });

  it('renders the component with no container', () => {
    render(<Accordion items={mockAccordionItems} />);
    const accordion = screen.getByTestId('accordion');
    expect(accordion).toBeInTheDocument();
    expect(accordion).not.toHaveClass('card');
  });

  it('renders the component inside a card', () => {
    render(<Accordion items={mockAccordionItems} container='card' />);
    const accordion = screen.getByTestId('accordion-card');
    expect(accordion).toBeInTheDocument();
  });

  it('renders the component with index counter', () => {
    render(<Accordion items={mockAccordionItems} indexCounter='true' />);
    const counters = screen.getAllByTestId(/accordion-counter/i);
    expect(counters).toHaveLength(3);
  });

  it('should render all the accordion items', () => {
    render(<Accordion items={mockAccordionItems} />);
    const items = screen.getAllByTestId('accordion-content');
    expect(items).toHaveLength(3);
  });

  it('should render the correct content for each item', () => {
    render(<Accordion items={mockAccordionItems} />);
    const items = screen.getAllByTestId('accordion-content');
    expect(items[0]).toHaveTextContent('Content 1');
    expect(items[1]).toHaveTextContent('Content 2');
    expect(items[2]).toHaveTextContent('Content 3');
  });

  it('should render the correct title for each item', () => {
    render(<Accordion items={mockAccordionItems} />);
    const header = screen.getAllByTestId('accordion-header');
    expect(header[0]).toHaveTextContent('Item 1');
    expect(header[1]).toHaveTextContent('Item 2');
    expect(header[2]).toHaveTextContent('Item 3');
  });

  it('should toggle the visibility of content when the header is clicked', () => {
    render(<Accordion items={mockAccordionItems} />);
    const title = screen.getByText('Item 2');
    const content = screen.getByText('Content 2');

    expect(content).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(title);
    expect(content).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(title);
    expect(content).toHaveAttribute('aria-expanded', 'false');
  });

  it('should toggle the index circle when content is active', () => {
    render(<Accordion items={mockAccordionItems} indexCounter='true' />);
    const title = screen.getByText('Item 2');
    const index = screen.getByTestId(`accordion-counter-1`);

    expect(index).toHaveAttribute('data-active', 'false');

    fireEvent.click(title);
    expect(index).toHaveAttribute('data-active', 'true');

    fireEvent.click(title);
    expect(index).toHaveAttribute('data-active', 'false');
  });

  it('renders a warning when accordion content is empty', () => {
    render(<Accordion items={[]} />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });
});
