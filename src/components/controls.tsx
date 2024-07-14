import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CirclePlus, CircleX, Info } from 'lucide-react';
import { useState } from 'react';
import DownloadButton from './download-button';
import InfoDialog from './info-dialog';
import { Button } from './ui/button';

interface ControlsProps {
  imageUrls: string[];
  openModalWithNoIndex: () => void;
  gridNotEmpty: boolean;
  gridFull: boolean;
  clearGrid: () => void;
}

function Controls({
  imageUrls,
  openModalWithNoIndex,
  gridNotEmpty,
  gridFull,
  clearGrid,
}: ControlsProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={() => setOpenModal(true)}>
              <Info />
            </Button>
          </TooltipTrigger>
          <TooltipContent>About & How to Use Musaic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <DownloadButton imageUrls={imageUrls} gridFull={gridFull} />
            </span>
          </TooltipTrigger>
          <TooltipContent>Download As Image</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="outline"
                onClick={openModalWithNoIndex}
                disabled={gridFull}
              >
                <CirclePlus />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Add Albums</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button onClick={clearGrid} disabled={!gridNotEmpty}>
                <CircleX />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Clear Grid</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <InfoDialog openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Controls;
