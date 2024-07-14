import { Download, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';

interface DownloadButtonProps {
  imageUrls: string[];
  gridFull: boolean;
}

function DownloadButton({ imageUrls, gridFull }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDownloadCollage = async () => {
    setLoading(true);

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

      toast({
        description: `Musaic downloaded successfully`,
      });
    } catch (error) {
      console.error('Error downloading collage:', error);
      toast({
        variant: 'destructive',
        title: 'There was a problem downloading your Musaic',
        description: 'Please refresh and try again',
      });
    }
    setLoading(false);
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownloadCollage}
      disabled={!gridFull || loading}
    >
      {loading ? <Loader2 className="animate-spin" /> : <Download />}
    </Button>
  );
}

export default DownloadButton;
