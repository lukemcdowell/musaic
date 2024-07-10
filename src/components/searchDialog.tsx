'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SQUARE_DIMENSIONS } from '@/constants/constants';
import { Album } from '@/types/types';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';
import ResultAlbum from './resultAlbum';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Skeleton } from './ui/skeleton';

interface SearchProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  gridIndex: number;
  addAlbumToGrid: (album: Album, index: number) => void;
}

function SearchDialog({
  open,
  setOpen,
  gridIndex,
  addAlbumToGrid,
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Array<Album | null>>(
    Array(9).fill(null)
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const emptyResults = results.length === 0 && searchTerm !== '';

  const closeModal = () => {
    setOpen(false);
    clearSearch();
  };

  const handleClick = (album: Album) => {
    addAlbumToGrid(album, gridIndex);
    closeModal();
  };

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
        key={index}
        album={album}
        onClick={album ? () => handleClick(album) : undefined}
      />
    ));

  const renderSkeletons = () =>
    Array.from({ length: 9 }).map((_, index) => (
      <Skeleton key={index} className={`${SQUARE_DIMENSIONS}`} />
    ));

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>Add Album</DialogTitle>
        </DialogHeader>
        <div>
          <div className="flex flex-row gap-2 align-center">
            <Input
              className=""
              placeholder="Search for an album..."
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== '' && <Button onClick={clearSearch}>Clear</Button>}
          </div>

          {error && <p>{error}</p>}
          {!error && !loading && emptyResults && (
            <p className="text-center pt-8">No Results Found</p>
          )}

          <div className="grid grid-cols-3 gap-2 pt-4">
            {loading ? renderSkeletons() : renderAlbums()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SearchDialog;
