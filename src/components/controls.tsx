import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { CirclePlus, CircleX, Share } from 'lucide-react';
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
  return (
    <div className="flex gap-2">
      <TooltipProvider delayDuration={0}>
        {/* <InfoDialog />

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
          <TooltipContent>
            <p>Tooltip</p>
          </TooltipContent>
        </Tooltip> */}

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Hover</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to library</p>
          </TooltipContent>
        </Tooltip>

        <Button
          variant="outline"
          onClick={openModalWithNoIndex}
          disabled={!gridNotEmpty}
        >
          <Share />
        </Button>

        <Button
          variant="outline"
          onClick={openModalWithNoIndex}
          disabled={gridFull}
        >
          <CirclePlus />
        </Button>

        <Button onClick={clearGrid} disabled={!gridNotEmpty}>
          <CircleX />
        </Button>
      </TooltipProvider>
    </div>
  );
}

export default Controls;
