import { SQUARE_DIMENSIONS } from '@/constants/constants';
import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface TopAlbumProps {
  album: Album | null;
  index: number;
  handleAlbumClick: () => void;
  moveAlbum: (dragIndex: number, hoverIndex: number) => void;
}

function TopAlbum({
  album,
  index,
  handleAlbumClick,
  moveAlbum,
}: TopAlbumProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'album',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'album',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveAlbum(item.index, index);
        item.index = index;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  let dropStyle = 'bg-transparent';
  if (isActive) {
    dropStyle = 'border-primary';
  } else if (canDrop) {
    dropStyle = 'bg-secondary';
  }
  let albumStyle = `border ${SQUARE_DIMENSIONS} rounded hover:border-primary hover:cursor-pointer ${dropStyle}`;

  drag(drop(ref));

  return (
    <div ref={ref} onClick={handleAlbumClick} className={albumStyle}>
      {album && (
        <img
          className={`${canDrop ? 'opacity-70' : ''}`}
          src={album.images[0]?.url}
          alt={album.name}
          title={`${album.name} - ${joinArtists(album.artists)}`}
        />
      )}
    </div>
  );
}

export default TopAlbum;
