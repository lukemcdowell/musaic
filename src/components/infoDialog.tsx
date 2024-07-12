import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogDescription>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              About
            </h3>
            <p className="mt-2 mb-4">
              Musaic showcases your favorite music visually.
            </p>

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              How to Use
            </h3>
            <ul className="mt-2 mb-4 ml-6 list-disc [&>li]:mt-2 marker:text-primary">
              <li>
                <strong className="text-primary">Add an Album:</strong> Click on
                a square to search for an album and click on the album cover to
                add it to the grid.
              </li>
              <li>
                <strong className="text-primary">Add Multiple Albums:</strong>{' '}
                Use the "Add Albums" button to populate the grid with multiple
                albums.
              </li>
              <li>
                <strong className="text-primary">Clear Grid:</strong> Use the
                "Clear Grid" button to reset the grid.
              </li>
              <li>
                <strong className="text-primary">Download Grid:</strong> Use the
                "Download As Image" button to download your grid as an image.
              </li>
              <li>
                <strong className="text-primary">Share Grid:</strong> Use the
                "Share Grid" to share your grid on your social media.
              </li>
            </ul>

            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              Data Source
            </h3>
            <p className="my-2">
              All music data is fetched in real-time from the Spotify API.
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;
