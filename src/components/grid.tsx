import { Album } from '@/types/types';
import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import TopAlbum from './top-album';

interface GridProps {
  topAlbums: Array<Album | null>;
  setTopAlbums: (albums: Array<Album | null>) => void;
  handleAlbumClick: (index: number) => void;
}

function Grid({ topAlbums, setTopAlbums, handleAlbumClick }: GridProps) {
  const moveAlbum = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedAlbums = [...topAlbums];
      const [draggedAlbum] = updatedAlbums.splice(dragIndex, 1);
      updatedAlbums.splice(hoverIndex, 0, draggedAlbum);
      setTopAlbums(updatedAlbums);
    },
    [topAlbums]
  );

  return (
    <DndProvider
      backend={isMobile ? TouchBackend : HTML5Backend}
      options={isMobile ? { enableMouseEvents: true } : ''}
    >
      <div className="px-2 sm:px-4 pb-2 grid gap-1 md:gap-2 grid-cols-4 sm:grid-cols-5 w-screen max-w-5xl">
        {topAlbums.map((album, index) => (
          <TopAlbum
            key={index}
            album={album}
            index={index}
            handleAlbumClick={() => handleAlbumClick(index)}
            moveAlbum={moveAlbum}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default Grid;
