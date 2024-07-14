import { Download } from 'lucide-react';
import { Button } from './ui/button';

interface DownloadButtonProps {
  imageUrls: string[];
  gridFull: boolean;
}

function DownloadButton({ imageUrls, gridFull }: DownloadButtonProps) {
  const handleDownloadCollage = async () => {
    console.log('download button clicked');

    try {
      const response = await fetch('/api/collage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrls }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate collage');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'musaic.png';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading collage:', error);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownloadCollage}
      disabled={!gridFull}
    >
      <Download />
    </Button>
  );
}

export default DownloadButton;
