import { Album } from '@/types/types';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TopAlbum from './topAlbum';

interface GridProps {
  topAlbums: Array<Album | null>;
  handleAlbumClick: (index: number) => void;
}

function Grid({ topAlbums, handleAlbumClick }: GridProps) {
  const moveAlbum = () => {};

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-5 gap-2 h-full">
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
