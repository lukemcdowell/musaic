import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'small' | 'large';
}

function Logo({ size = 'small' }: LogoProps) {
  const sizeClass = size === 'small' ? 'w-4 h-4' : 'w-12 h-12';

  const square = (classToAdd?: string) => (
    <div
      className={cn(
        sizeClass,
        'border border-primary rounded hover:bg-primary',
        classToAdd
      )}
    ></div>
  );

  return (
    <div className="grid grid-cols-2 gap-1">
      {square('bg-primary hover:bg-black')}
      {square()}
      {square()}
      {square()}
    </div>
  );
}

export default Logo;
