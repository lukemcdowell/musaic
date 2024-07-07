'use client';

import InfoDialog from '@/components/infoDialog';
import SearchDialog from '@/components/searchDialog';
import TopAlbum from '@/components/topAlbum';
import { Button } from '@/components/ui/button';
import { Album } from '@/types/types';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Home() {
  const [topAlbums, setTopAlbums] = useState<Array<Album | null>>(
    Array(25).fill(null)
  );
  const [openModal, setOpenModal] = useState<number | null>(null);

  const handleImageClick = (album: Album) => {
    const firstEmptyIndex = topAlbums.findIndex((album) => album === null);
    if (firstEmptyIndex !== -1) {
      const newTopAlbums = [...topAlbums];
      newTopAlbums[firstEmptyIndex] = album;
      setTopAlbums(newTopAlbums);
    }
  };

  const handleDrop = (fromIndex: number, toIndex: number) => {
    const newTopAlbums = [...topAlbums];

    [newTopAlbums[toIndex], newTopAlbums[fromIndex]] = [
      newTopAlbums[fromIndex],
      newTopAlbums[toIndex],
    ];

    setTopAlbums(newTopAlbums);
  };

  const clearGrid = () => {
    setTopAlbums(Array(25).fill(null));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="max-w-screen-md min-h-screen m-auto">
        <div className="flex w-full min-h-screen flex-col items-center">
          <div className="flex w-full justify-between py-6 px-12">
            <h1 className="text-4xl font-bold text-center">Top Album Grid</h1>
            <div className="flex gap-2">
              <InfoDialog />
              <Button onClick={clearGrid}>Clear</Button>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 h-full">
            {topAlbums.map((album, index) => (
              <TopAlbum
                key={index}
                album={album}
                index={index}
                handleClick={() => setOpenModal(index)}
                onDrop={handleDrop}
              />
            ))}
          </div>
        </div>
        <SearchDialog
          open={openModal}
          setOpen={setOpenModal}
          onImageClick={handleImageClick}
        />
      </main>
    </DndProvider>
  );
}
