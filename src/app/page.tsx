'use client';

import Controls from '@/components/controls';
import Grid from '@/components/grid';
import Logo from '@/components/logo';
import SearchDialog from '@/components/searchDialog';
import { useToast } from '@/components/ui/use-toast';
import '@/styles/fade.css';
import { Album } from '@/types/types';
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
      <div className="flex w-full min-h-screen flex-col items-center pb-8">
        <div className="flex flex-col w-full justify-between items-center gap-4 py-6 sm:flex-row ">
          <div className="flex items-center gap-4">
            <Logo />
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Musaic
            </h1>
          </div>
          <Controls
            openModalWithNoIndex={openModalWithNoIndex}
            gridNotEmpty={gridNotEmpty}
            gridFull={gridFull}
            clearGrid={clearGrid}
          />
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
