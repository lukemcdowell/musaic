import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import { useDrag, useDrop } from 'react-dnd';

interface TopAlbumProps {
  album?: Album | null;
  index: number;
  onDrop: (fromIndex: number, toIndex: number) => void;
}

function TopAlbum({ album, index, onDrop }: TopAlbumProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'albumIndex',
    drop: (item: { index: number }) => {
      onDrop(item.index, index);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'albumIndex',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const isActive = canDrop && isOver;

  let dropStyle = 'bg-transparent';
  if (isActive) {
    dropStyle = 'bg-primary';
  } else if (canDrop) {
    dropStyle = 'bg-secondary';
  }
  let albumStyle = `border h-32 w-32 rounded ${dropStyle}`;

  function dragDropRef(element: HTMLDivElement | null) {
    if (element) {
      drag(element);
      drop(element);
    }
  }

  return album ? (
    <div ref={dragDropRef} className={albumStyle}>
      <img
        className={`${albumStyle} ${canDrop ? 'opacity-70' : ''}`}
        src={album.images[0]?.url}
        alt={album.name}
        title={`${album.name} - ${joinArtists(album.artists)}`}
      />
    </div>
  ) : (
    <div ref={dragDropRef} className={albumStyle}></div>
  );
}

export default TopAlbum;
