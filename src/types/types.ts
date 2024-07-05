export interface AlbumType {
  id: string;
  name: string;
  artists: { name: string }[];
  images: { url: string }[];
}
