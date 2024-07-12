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
    <div className="flex gap-2">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" onClick={() => setOpenModal(true)}>
              <Info />
            </Button>
          </TooltipTrigger>
          <TooltipContent>How to use</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={openModalWithNoIndex}
              disabled={!gridNotEmpty}
            >
              <Download />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download grid</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={openModalWithNoIndex}
              disabled={!gridNotEmpty}
            >
              <Share />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Share grid</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              onClick={openModalWithNoIndex}
              disabled={gridFull}
            >
              <CirclePlus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Add albums</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={clearGrid} disabled={!gridNotEmpty}>
              <CircleX />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Clear grid</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <InfoDialog openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
}

export default Controls;
