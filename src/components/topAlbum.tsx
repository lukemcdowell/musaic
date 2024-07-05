import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import { useDrop } from 'react-dnd';

interface TopAlbumProps {
  album?: Album | null;
  key?: number;
  onDrop: (album: Album) => void;
}

function TopAlbum({ album, key, onDrop }: TopAlbumProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'album',
    drop: (item: { album: Album }) => {
      onDrop(item.album);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return album ? (
    <div
      ref={drop}
      key={album.id}
      className={`border h-32 w-32 ${isOver ? 'bg-blue-200' : ''}`}
    >
      <img
        src={album.images[0]?.url}
        alt={album.name}
        title={`${album.name} - ${joinArtists(album.artists)}`}
      />
    </div>
  ) : (
    <div key={key} className="border h-32 w-32 border-primary"></div>
  );
}

export default TopAlbum;
