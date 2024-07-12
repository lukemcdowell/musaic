import { cn } from '@/lib/utils';

function Logo() {
  const square = (classToAdd?: string) => (
    <div
      className={cn('h-4 w-4 border border-primary rounded', classToAdd)}
    ></div>
  );

  return (
    <div className="grid grid-cols-2 gap-1">
      {square('bg-primary')}
      {square()}
      {square()}
      {square()}
    </div>
  );
}

export default Logo;
