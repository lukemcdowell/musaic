import ResultAlbum from '@/components/result-album';
import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import { fireEvent, render, screen } from '@testing-library/react';

const mockAlbum: Album = {
  id: '1',
  name: 'Test Album',
  artists: [{ name: 'Artist 1' }, { name: 'Artist 2' }],
  images: [{ url: 'https://example.com/image.jpg' }],
};

describe('ResultAlbum', () => {
  it('renders correctly with an album', () => {
    render(<ResultAlbum album={mockAlbum} />);

    const imgElement = screen.getByRole('img', {
      name: `Search result: ${mockAlbum.name}`,
    });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockAlbum.images[0].url);
    expect(imgElement).toHaveAttribute(
      'title',
      `${mockAlbum.name} - ${joinArtists(mockAlbum.artists)}`
    );
  });

  it('renders correctly without an album', () => {
    render(<ResultAlbum />);

    const imgElement = screen.queryByRole('img');
    expect(imgElement).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<ResultAlbum album={mockAlbum} onClick={handleClick} />);

    const imgElement = screen.getByRole('img', {
      name: `Search result: ${mockAlbum.name}`,
    });
    fireEvent.click(imgElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
