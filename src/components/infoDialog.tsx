import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
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
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Information</DialogTitle>
          <DialogDescription>
            Information about how to use this app
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;
