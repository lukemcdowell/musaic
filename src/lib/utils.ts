import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function joinArtists(artists: { name: string }[]) {
  return artists.map((artist) => artist.name).join(', ');
}

export async function warmup() {
  try {
    const response = await fetch(`/api/search?query=warmup`);

    if (response.ok) {
      console.log('Warmed up /search function');
    }
  } catch (error) {
    console.log('Attempting to warm up /search function');
  }
}
