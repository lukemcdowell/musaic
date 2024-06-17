'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();

      if (response.ok) {
        setResults(data.albums.items);
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      setError('An error occurred while fetching data');
    }
  };

  return (
    <>
      <form className="w-full flex" onSubmit={handleSearch}>
        <Input
          className="w-full"
          placeholder="Search for an album..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="grid grid-cols-3 gap-4 h-full py-4">
        {error ?? <p>{error}</p>}
        {results.map((album) => (
          <div key={album.id} className="border h-32 w-32 border-primary">
            <img src={album.images[0]?.url} alt={album.name} />
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;
