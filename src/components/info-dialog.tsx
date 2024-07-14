import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

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
        <DialogTitle>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            About
          </h1>
        </DialogTitle>
        <DialogDescription>
          <p className="mb-4 text-left">
            Musaic showcases your favourite music visually.
          </p>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left">
            How to Use
          </h3>
          <div className="mt-2 mb-4 ml-4 [&>p]:mt-2 marker:text-primary text-left">
            <p>
              <strong className="text-primary">- Add an Album:</strong> Click on
              a square to search for an album and click on the album cover to
              add it to the grid.
            </p>
            <p>
              <strong className="text-primary">- Add Multiple Albums:</strong>{' '}
              Use the &quot;Add Albums&quot; button to populate the grid with
              multiple albums.
            </p>
            <p>
              <strong className="text-primary">- Clear Grid:</strong> Use the
              &quot;Clear Grid&quot; button to reset the grid.
            </p>
            <p>
              <strong className="text-primary">- Download Grid:</strong> Use the
              &quot;Download As Image&quot; button to download your grid as an
              image. You can only download a full grid of 20 albums.
            </p>
          </div>
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-left">
            Data Source
          </h3>
          <p className="my-2 text-left">
            All music data is fetched in real-time from the Spotify API.
          </p>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;
