import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CirclePlus, CircleX, Download, Info, Share } from 'lucide-react';
import { useState } from 'react';
import InfoDialog from './infoDialog';
import { Button } from './ui/button';

interface ControlsProps {
  openModalWithNoIndex: () => void;
  gridNotEmpty: boolean;
  gridFull: boolean;
  clearGrid: () => void;
}

function Controls({
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
          <TooltipContent>How to Use Musaic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="outline"
                onClick={openModalWithNoIndex}
                disabled={!gridNotEmpty}
              >
                <Download />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Download Your Musaic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="outline"
                onClick={openModalWithNoIndex}
                disabled={!gridNotEmpty}
              >
                <Share />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Share Your Musaic</TooltipContent>
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
          <TooltipContent>Add Albums to Musaic</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button onClick={clearGrid} disabled={!gridNotEmpty}>
                <CircleX />
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent>Clear Your Musaic</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <InfoDialog openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Controls;
