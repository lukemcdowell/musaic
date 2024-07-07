import { joinArtists } from '@/lib/utils';
import { Album } from '@/types/types';

interface ResultAlbumProps {
  album?: Album | null;
  onClick?: () => void;
}

function ResultAlbum({ album, onClick }: ResultAlbumProps) {
  return album ? (
    <div
      className={`border h-32 w-32 rounded cursor-pointer`}
      onClick={onClick}
    >
      <img
        src={album.images[0]?.url}
        alt={album.name}
        title={`${album.name} - ${joinArtists(album.artists)}`}
      />
    </div>
  ) : (
    <div className="border h-32 w-32 rounded"></div>
  );
}

export default ResultAlbum;
