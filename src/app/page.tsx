'use client';

import Grid from '@/components/grid';
import InfoDialog from '@/components/infoDialog';
import SearchDialog from '@/components/searchDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import '@/styles/fade.css';
import { Album } from '@/types/types';
import { CirclePlus, CircleX } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [topAlbums, setTopAlbums] = useState<Array<Album | null>>(
    Array(20).fill(null)
  );
  const [openModal, setOpenModal] = useState(false);
  const [gridIndex, setGridIndex] = useState(-1);
  const [loaded, setLoaded] = useState(false);

  const { toast } = useToast();

  const gridNotEmpty = topAlbums.some((album) => album !== null);

  const gridFull = topAlbums.every((album) => album !== null);

  const addAlbumToGridIndex = (album: Album, index: number) => {
    const newTopAlbums = [...topAlbums];
    newTopAlbums[index] = album;
    setTopAlbums(newTopAlbums);

    confirmationMessage(album);
    setOpenModal(false);
  };

  const addAlbumToFirstEmptySquare = (album: Album) => {
    const firstEmptyIndex = topAlbums.findIndex((album) => album === null);
    if (firstEmptyIndex !== -1) {
      const newTopAlbums = [...topAlbums];
      newTopAlbums[firstEmptyIndex] = album;
      setTopAlbums(newTopAlbums);

      confirmationMessage(album);
    }
  };

  const confirmationMessage = (album: Album) => {
    toast({
      description: `Added ${album.name} by ${album.artists[0].name} to the grid`,
    });
  };

  const handleAlbumClick = (index: number) => {
    setOpenModal(true);
    setGridIndex(index);
  };

  const openModalWithNoIndex = () => {
    setOpenModal(true);
    setGridIndex(-1);
  };

  const clearGrid = () => {
    setTopAlbums(Array(20).fill(null));
    localStorage.setItem('topAlbums', JSON.stringify(Array(20).fill(null)));
  };

  useEffect(() => {
    if (gridNotEmpty) {
      localStorage.setItem('topAlbums', JSON.stringify(topAlbums));
    }
  }, [topAlbums]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/mock/topAlbums.json');
        const jsonData = await response.json();
        setTopAlbums(jsonData);
        localStorage.setItem('topAlbums', JSON.stringify(jsonData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    const storedTopAlbums = localStorage.getItem('topAlbums');
    if (
      !storedTopAlbums ||
      JSON.parse(storedTopAlbums).every((album: Album) => album === null)
    ) {
      fetchData();
    } else {
      setTopAlbums(JSON.parse(storedTopAlbums));
    }

    setLoaded(true);
  }, []);

  return (
    <>
      <div className="flex w-full min-h-screen flex-col items-center">
        <div className="flex w-full justify-between py-6">
          <h1 className="text-4xl font-bold text-center">Top Album Grid</h1>
          <div className="flex gap-2">
            <InfoDialog />
            <Button
              variant="outline"
              onClick={openModalWithNoIndex}
              disabled={gridFull}
            >
              <div className="pr-2">
                <CirclePlus />
              </div>
              Add Albums
            </Button>
            <Button onClick={clearGrid} disabled={!gridNotEmpty}>
              <div className="pr-2">
                <CircleX />
              </div>
              Clear
            </Button>
          </div>
        </div>

        <div className={`fade-in ${loaded ? 'visible' : ''}`}>
          <Grid
            topAlbums={topAlbums}
            setTopAlbums={setTopAlbums}
            handleAlbumClick={handleAlbumClick}
          />
        </div>
      </div>

      <SearchDialog
        open={openModal}
        setOpen={setOpenModal}
        gridIndex={gridIndex}
        addAlbumToGrid={
          gridIndex !== -1 ? addAlbumToGridIndex : addAlbumToFirstEmptySquare
        }
      />
    </>
  );
}
