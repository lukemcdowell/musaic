import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

function Logo({ className }: LogoProps) {
  const square = (classToAdd?: string) => (
    <div
      className={cn(
        'w-full h-full border border-primary rounded hover:bg-primary',
        classToAdd
      )}
    ></div>
  );

  return (
    <div className={cn('grid grid-cols-2 gap-1 w-10 h-10', className)}>
      {square('bg-primary hover:bg-black')}
      {square()}
      {square()}
      {square()}
    </div>
  );
}

export default Logo;
