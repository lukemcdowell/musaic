import { joinArtists } from '@/lib/utils';
import { AlbumType } from '@/types/types';

interface AlbumProps {
  album: AlbumType;
}

function Album({ album }: AlbumProps) {
  return (
    <div key={album.id} className="border h-32 w-32">
      <img
        src={album.images[0]?.url}
        alt={album.name}
        title={`${album.name} - ${joinArtists(album.artists)}`}
      />
    </div>
  );
}

export default Album;
