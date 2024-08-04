import SearchDialog from '@/components/search-dialog';
import { fireEvent, render, screen } from '@testing-library/react';

const mockSetOpen = jest.fn();
const mockAddAlbumToGrid = jest.fn();

describe('SearchDialog', () => {
  it('renders correctly when the dialog is open', () => {
    render(
      <SearchDialog
        open={true}
        setOpen={mockSetOpen}
        gridIndex={0}
        addAlbumToGrid={mockAddAlbumToGrid}
      />
    );

    const dialogElement = screen.getByRole('dialog');
    expect(dialogElement).toBeInTheDocument();
  });

  it('calls setOpen handler when the dialog is closed', () => {
    render(
      <SearchDialog
        open={true}
        setOpen={mockSetOpen}
        gridIndex={0}
        addAlbumToGrid={mockAddAlbumToGrid}
      />
    );

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
