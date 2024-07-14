import { SQUARE_DIMENSIONS } from '@/constants/constants';
import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';
import Image from 'next/image';

interface ResultAlbumProps {
  album?: Album | null;
  onClick?: () => void;
}

function ResultAlbum({ album, onClick }: ResultAlbumProps) {
  return album ? (
    <div
      className={`border ${SQUARE_DIMENSIONS} rounded cursor-pointer`}
      onClick={onClick}
    >
      <Image
        src={album.images[0]?.url}
        alt={album.name}
        title={`${album.name} - ${joinArtists(album.artists)}`}
      />
    </div>
  ) : (
    <div className={`border ${SQUARE_DIMENSIONS} rounded`}></div>
  );
}

export default ResultAlbum;
