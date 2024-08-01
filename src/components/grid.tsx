import { Album } from '@/types/types';
import { useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import withScrolling, {
  BoxType,
  createHorizontalStrength,
  createVerticalStrength,
  Point,
} from 'react-dnd-scrolling';
import { TouchBackend } from 'react-dnd-touch-backend';
import TopAlbum from './top-album';

interface GridProps {
  topAlbums: Array<Album | null>;
  setTopAlbums: (albums: Array<Album | null>) => void;
  handleAlbumClick: (index: number) => void;
}

function Grid({ topAlbums, setTopAlbums, handleAlbumClick }: GridProps) {
  const ScrollingComponent = withScrolling('div');

  const linearHorizontalStrength = createHorizontalStrength(150);
  const linearVerticalStrength = createVerticalStrength(150);

  // this easing function is from https://gist.github.com/gre/1650294 and
  // expects/returns a number between [0, 1], however strength functions
  // expects/returns a value between [-1, 1]
  function ease(val: number) {
    const t = (val + 1) / 2; // [-1, 1] -> [0, 1]
    const easedT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    return easedT * 2 - 1; // [0, 1] -> [-1, 1]
  }

  function hStrength(box: BoxType, point: Point) {
    return ease(linearHorizontalStrength(box, point));
  }

  function vStrength(box: BoxType, point: Point) {
    return ease(linearVerticalStrength(box, point));
  }

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
      <ScrollingComponent
        className="grid gap-2 h-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-5"
        verticalStrength={vStrength}
        horizontalStrength={hStrength}
      >
        {topAlbums.map((album, index) => (
          <TopAlbum
            key={index}
            album={album}
            index={index}
            handleAlbumClick={() => handleAlbumClick(index)}
            moveAlbum={moveAlbum}
          />
        ))}
      </ScrollingComponent>
    </DndProvider>
  );
}

export default Grid;
