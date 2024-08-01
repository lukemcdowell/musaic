import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import '../styles/custom.css';
import { Separator } from './ui/separator';

interface InfoDialogProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

function InfoDialog({ openModal, setOpenModal }: InfoDialogProps) {
  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={closeModal}>
      <DialogContent className="w-full sm:w-max">
        <DialogHeader>
          <DialogTitle>
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight">
              About
            </h1>
          </DialogTitle>
          <DialogDescription>
            Musaic showcases your favourite music visually.
            <Separator className="my-2" />
            <div>
              <h5 className="scroll-m-20 text-xl text-primary font-semibold tracking-tight text-center sm:text-left">
                How to Use
              </h5>
              <ul className="ml-6 mb-2 list-disc mt-except-first">
                <li>
                  <strong className="">Add an Album:</strong> Click on a square
                  to search for an album and click on the album cover to add it
                  to the grid. Use the &quot;Add Albums&quot; button to populate
                  the grid with multiple albums.
                </li>
                <li>
                  <strong className="">Rearrange Albums:</strong> Drag albums to
                  rearrange them on the grid.
                </li>
                <li>
                  <strong className="">Clear Grid:</strong> Use the &quot;Clear
                  Grid&quot; button to reset the grid.
                </li>
                <li>
                  <strong className="">Download Grid:</strong> Use the
                  &quot;Download As Image&quot; button to download your grid as
                  an image. You can only download a full grid of 20 albums.
                </li>
              </ul>
              <h3 className="scroll-m-20 text-xl text-primary font-semibold tracking-tight text-center sm:text-left">
                Data Source
              </h3>
              <p className="text-center sm:text-left">
                All music data is fetched in real-time from the Spotify API.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;
