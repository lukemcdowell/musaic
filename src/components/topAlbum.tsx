import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import { useDrop } from 'react-dnd';

interface TopAlbumProps {
  album?: Album | null;
  onDrop: (album: Album) => void;
}

function TopAlbum({ album, onDrop }: TopAlbumProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'album',
    drop: (item: { album: Album }) => {
      onDrop(item.album);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  let albumStyle = 'border h-32 w-32 bg-transparent';
  if (isActive) {
    albumStyle = 'border h-32 w-32 bg-primary';
  } else if (canDrop) {
    albumStyle = 'border h-32 w-32 bg-secondary';
  }

  return album ? (
    <div ref={drop} className={`${albumStyle}`}>
      <img
        className={`${albumStyle} ${canDrop ? 'opacity-70' : ''}`}
        src={album.images[0]?.url}
        alt={album.name}
        title={`${album.name} - ${joinArtists(album.artists)}`}
      />
    </div>
  ) : (
    <div ref={drop} className={`${albumStyle}`}></div>
  );
}

export default TopAlbum;
