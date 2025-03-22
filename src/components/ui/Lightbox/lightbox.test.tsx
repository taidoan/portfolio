import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Lightbox } from '.';

describe('<Lightbox>', () => {
  it('renders the lightbox when open', () => {
    render(
      <Lightbox data-testid='lightbox' open={true}>
        <div>Lightbox Content</div>
      </Lightbox>,
    );

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
    expect(screen.getByTestId('lightbox')).toBeInTheDocument();
    expect(screen.getByText('Lightbox Content')).toBeInTheDocument();
  });

  it('it closes the lightbox when the close button is clicked', async () => {
    const closeLightbox = (HTMLDialogElement.prototype.close = vi.fn());
    render(
      <Lightbox onClose={closeLightbox} open={true}>
        Lightbox Content
      </Lightbox>,
    );

    const closeButton = screen.getByTestId('closeLightbox');
    fireEvent.click(closeButton);

    expect(closeLightbox).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByTestId('lightbox')).not.toBeInTheDocument();
    });
  });

  it('closes the lightbox when the overlay is clicked', async () => {
    const mockGetBoundingClientRect = vi.fn().mockReturnValue({
      left: 100,
      right: 300,
      top: 100,
      bottom: 300,
    });
    const closeMock = vi.fn();
    const onCloseMock = vi.fn();
    render(
      <Lightbox onClose={onCloseMock} data-testid='lightbox' open={true}>
        Lightbox Content
      </Lightbox>,
    );

    const dialog = screen.getByTestId('lightbox') as HTMLDialogElement;

    dialog.getBoundingClientRect = mockGetBoundingClientRect;
    dialog.close = closeMock;

    fireEvent.click(dialog, { clientX: 50, clientY: 50 });

    expect(closeMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledTimes(1);

    closeMock.mockClear();
    onCloseMock.mockClear();

    fireEvent.click(dialog, { clientX: 200, clientY: 200 });

    expect(closeMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
