'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Home() {
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
        console.log(data);
        setResults(data.albums.items);
      } else {
        setError(data.error.message);
      }
    } catch (error) {
      setError('An error occurred while fetching data');
    }
  };

  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
      <div className="w-1/4 min-h-screen p-4 border-solid border-0 border-r border-primary flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center pt-8 pb-10">
          Top Album Grid
        </h1>
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
          {results.map((album) => (
            <div key={album.id} className="border h-32 w-32 border-primary">
              <img src={album.images[0]?.url} alt={album.name} />
            </div>
          ))}
        </div>
      </div>
      <div className="w-3/4 min-h-screen flex flex-row items-center justify-center p-16">
        <div className="grid grid-cols-5 gap-4 h-full">
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
        </div>
      </div>
    </main>
  );
}
