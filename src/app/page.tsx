'use client';

import Search from '@/components/search';
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

  const handleImageClick = (album: Album) => {
    const firstEmptyIndex = topAlbums.findIndex((square) => square === null);
    if (firstEmptyIndex !== -1) {
      const newTopAlbums = [...topAlbums];
      newTopAlbums[firstEmptyIndex] = album;
      setTopAlbums(newTopAlbums);
    }
  };

  const handleDrop = (album: Album, index: number) => {
    const newTopAlbums = [...topAlbums];
    newTopAlbums[index] = album;
    setTopAlbums(newTopAlbums);
  };

  const clearGrid = () => {
    setTopAlbums(Array(25).fill(null));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="max-w-screen-xl min-h-screen m-auto">
        <div className="flex min-h-screen flex-row items-center justify-between">
          <div className="flex-none min-w-[416px] min-h-screen border-solid border-0 border-r border-primary flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center pb-10">
              Top Album Grid
            </h1>
            <Search onImageClick={handleImageClick} />
          </div>
          <div className="flex-grow min-h-screen flex flex-row items-center justify-center py-8">
            <div className="grid grid-cols-5 gap-2 h-full">
              {topAlbums.map((album, index) => (
                <TopAlbum
                  key={index}
                  album={album}
                  onDrop={(droppedAlbum) => handleDrop(droppedAlbum, index)}
                />
              ))}
            </div>
            <Button onClick={clearGrid}>Clear</Button>
          </div>
        </div>
      </main>
    </DndProvider>
  );
}
