'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

function Search() {
  const [results, setResults] = useState<any[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const handleSearch = async (searchTerm: String) => {
    setResults(null);
    setLoading(true);

    if (searchTerm === null || searchTerm.trim() === '') {
      setResults(null);
    } else {
      try {
        const response = await fetch(`/api/search?query=${searchTerm}`);
        const data = await response.json();

        if (response.ok) {
          setResults(data.albums.items);
        } else {
          setError(data.error.message);
        }
      } catch (error) {
        setError('An error occurred while fetching data');
      }
    }

    setLoading(false);
  };

  const renderEmptyDivs = () =>
    Array.from({ length: 9 }).map((_, index) => (
      <div key={index} className="border h-32 w-32 border-primary"></div>
    ));

  const renderAlbums = () =>
    results?.map((album) => (
      <div key={album.id} className="border h-32 w-32">
        <img src={album.images[0]?.url} alt={album.name} />
      </div>
    ));

  const renderSkeletons = () =>
    Array.from({ length: 9 }).map((_, index) => (
      <Skeleton key={index} className="h-32 w-32" />
    ));

  return (
    <div className="w-full px-5">
      <Input
        className="w-full"
        placeholder="Search for an album..."
        type="text"
        autoFocus
        onChange={(e) => handleSearch(e.target.value)}
      />

      {error ?? <p>{error}</p>}

      <div className="grid grid-cols-3 gap-4 h-full py-4">
        {(results === null || results.length === 0) && !loading
          ? renderEmptyDivs()
          : renderAlbums()}
        {loading && renderSkeletons()}
      </div>
    </div>
  );
}

export default Search;
