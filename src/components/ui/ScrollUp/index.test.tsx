import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ScrollUpButton } from './index';

describe('ScrollUpButton', () => {
  let originalScrollY: number;
  let scrollToMock: ReturnType<typeof vi.fn>;
  let matchMediaMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    originalScrollY = window.scrollY;
    scrollToMock = vi.fn();
    matchMediaMock = vi.fn().mockReturnValue({ matches: false });
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0,
    });
    window.scrollTo = scrollToMock;
    window.matchMedia = matchMediaMock;
  });

  afterEach(() => {
    window.scrollY = originalScrollY;
    vi.restoreAllMocks();
  });

  it('renders with default props', () => {
    const { getByLabelText } = render(<ScrollUpButton />);
    expect(getByLabelText('Scroll to top')).toBeInTheDocument();
  });

  it('is hidden when scrollY is below threshold', () => {
    window.scrollY = 0;
    const { container } = render(<ScrollUpButton threshold={100} />);
    const button = container.querySelector('button');
    expect(button?.className).toMatch(/hidden/);
  });

  it('becomes visible when scrollY exceeds threshold', () => {
    window.scrollY = 500;
    const { container } = render(<ScrollUpButton threshold={300} />);
    // Simulate scroll event
    fireEvent.scroll(window);
    const button = container.querySelector('button');
    expect(button).not.toHaveClass('hidden');
  });

  it('calls window.scrollTo with smooth behavior by default', () => {
    window.scrollY = 500;
    const { getByRole } = render(<ScrollUpButton />);
    fireEvent.click(getByRole('button'));
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('renders with custom label and className', () => {
    const { getByLabelText } = render(<ScrollUpButton label='Go Up' className='custom-class' />);
    expect(getByLabelText('Go Up')).toBeInTheDocument();
  });
});
