import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import { useDrag } from 'react-dnd';

interface ResultAlbumProps {
  album?: Album | null;
  key?: number;
  onClick?: () => void;
}

function ResultAlbum({ album, key, onClick }: ResultAlbumProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'album',
    item: { album },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return album ? (
    <div
      ref={drag}
      key={album.id}
      className={`border h-32 w-32  ${isDragging ? 'opacity-50' : ''}`}
      onClick={onClick}
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

export default ResultAlbum;
