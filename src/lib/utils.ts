import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function joinArtists(artists: { name: string }[]) {
  return artists.map((artist) => artist.name).join(', ');
}
