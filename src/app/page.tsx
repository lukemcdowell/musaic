'use client';

import Grid from '@/components/grid';
import InfoDialog from '@/components/infoDialog';
import SearchDialog from '@/components/searchDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Album } from '@/types/types';
import { CirclePlus, CircleX } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const [topAlbums, setTopAlbums] = useState<Array<Album | null>>(
    Array(20).fill(null)
  );
  const [openModal, setOpenModal] = useState(false);
  const [gridIndex, setGridIndex] = useState(-1);

  const { toast } = useToast();

  const isGridEmpty = topAlbums.every((album) => album === null);

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
  };

  return (
    <>
      <div className="flex w-full min-h-screen flex-col items-center">
        <div className="flex w-full justify-between py-6">
          <h1 className="text-4xl font-bold text-center">Top Album Grid</h1>
          <div className="flex gap-2">
            <InfoDialog />
            <Button variant="outline" onClick={openModalWithNoIndex}>
              <div className="pr-2">
                <CirclePlus />
              </div>
              Add Albums
            </Button>
            {!isGridEmpty && (
              <Button onClick={clearGrid}>
                <div className="pr-2">
                  <CircleX />
                </div>
                Clear
              </Button>
            )}
          </div>
        </div>

        <Grid
          topAlbums={topAlbums}
          setTopAlbums={setTopAlbums}
          handleAlbumClick={handleAlbumClick}
        />
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
