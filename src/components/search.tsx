'use client';

import { Album } from '@/types/types';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import ResultAlbum from './resultAlbum';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

interface SearchProps {
  onImageClick: (album: Album) => void;
}

function Search({ onImageClick }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Array<Album | null>>(
    Array(9).fill(null)
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (newSearchTerm: string) => {
    if (newSearchTerm.trim() === '') {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/search?query=${newSearchTerm}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.albums.items);
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      setError('An error occurred while fetching data');
    }

    setLoading(false);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults(Array(9).fill(null));
    setError(null);
  };

  const debouncedSearch = useCallback(
    debounce((term: string) => handleSearch(term), 300),
    []
  );

  useEffect(() => {
    setResults(Array(9).fill(null));
    setLoading(true);
    if (searchTerm.trim() !== '') {
      debouncedSearch(searchTerm);
    } else {
      setLoading(false);
    }
  }, [searchTerm]);

  const renderAlbums = () =>
    results?.map((album, index) => (
      <ResultAlbum
        album={album}
        key={index}
        onClick={album ? () => onImageClick(album) : undefined}
      />
    ));

  const renderSkeletons = () =>
    Array.from({ length: 9 }).map((_, index) => (
      <Skeleton key={index} className="h-32 w-32" />
    ));

  return (
    <div className="w-full px-5">
      <div className="flex flex-row gap-2 align-center">
        <Input
          className="w-full"
          placeholder="Search for an album..."
          type="text"
          autoFocus
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm !== '' && <Button onClick={clearSearch}>Clear</Button>}
      </div>

      {error && <p>{error}</p>}

      <div className="grid grid-cols-3 gap-4 h-full py-4">
        {loading ? renderSkeletons() : renderAlbums()}
      </div>
    </div>
  );
}

export default Search;
