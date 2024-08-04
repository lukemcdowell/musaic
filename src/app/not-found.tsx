import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function NotFound() {
  return (
    <div
      className={cn(
        inter.className,
        'dark w-screen h-screen flex flex-col items-center justify-center gap-16'
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Logo className="w-24 h-24" />
        <div className="flex flex-col items-center justify-center sm:items-start">
          <h1 className="text-primary scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            404
          </h1>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Page Not Found
          </h1>
        </div>
      </div>
      <Button variant="outline" asChild aria-label="return to home">
        <Link href="/">Return to Musaic</Link>
      </Button>
    </div>
  );
}

export default NotFound;
