import TopAlbum from '@/components/top-album';
import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import { fireEvent, render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const mockAlbum: Album = {
  id: '1',
  name: 'Test Album',
  artists: [{ name: 'Artist 1' }, { name: 'Artist 2' }],
  images: [{ url: 'https://example.com/image.jpg' }],
};

const mockHandleAlbumClick = jest.fn();
const mockMoveAlbum = jest.fn();

describe('TopAlbum', () => {
  it('renders correctly with an album', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <TopAlbum
          album={mockAlbum}
          index={1}
          handleAlbumClick={mockHandleAlbumClick}
          moveAlbum={mockMoveAlbum}
        />
      </DndProvider>
    );

    const imgElement = screen.getByRole('img', {
      name: `Top album: ${mockAlbum.name}`,
    });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', mockAlbum.images[0].url);
    expect(imgElement).toHaveAttribute(
      'title',
      `${mockAlbum.name} - ${joinArtists(mockAlbum.artists)}`
    );
  });

  it('renders correctly without an album', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <TopAlbum
          album={null}
          index={1}
          handleAlbumClick={mockHandleAlbumClick}
          moveAlbum={mockMoveAlbum}
        />
      </DndProvider>
    );

    const imgElement = screen.queryByRole('img');
    expect(imgElement).not.toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    render(
      <DndProvider backend={HTML5Backend}>
        <TopAlbum
          album={mockAlbum}
          index={1}
          handleAlbumClick={mockHandleAlbumClick}
          moveAlbum={mockMoveAlbum}
        />
      </DndProvider>
    );

    const imgElement = screen.getByRole('img', {
      name: `Top album: ${mockAlbum.name}`,
    });
    fireEvent.click(imgElement);

    expect(mockHandleAlbumClick).toHaveBeenCalledTimes(1);
  });
});
