'use client';

import { useState } from 'react';
import { Input } from './ui/input';

function Search() {
  const [results, setResults] = useState<any[] | null>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchTerm: String) => {
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
  };

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
        {results?.map((album) => (
          <div key={album.id} className="border h-32 w-32 border-primary">
            <img src={album.images[0]?.url} alt={album.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
