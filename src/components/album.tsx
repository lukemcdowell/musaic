import { joinArtists } from '@/lib/utils';
import { AlbumType } from '@/types/types';

interface AlbumProps {
  album?: AlbumType | null;
  key?: number;
}

function Album({ album }: AlbumProps) {
  return album ? (
    <div className="border h-32 w-32">
      <img
        src={album.images[0]?.url}
        alt={album.name}
        title={`${album.name} - ${joinArtists(album.artists)}`}
      />
    </div>
  ) : (
    <div className="border h-32 w-32 border-primary"></div>
  );
}

export default Album;
