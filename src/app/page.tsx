import Album from '@/components/album';
import Search from '@/components/search';

export default function Home() {
  return (
    <main className="max-w-screen-xl min-h-screen m-auto">
      <div className="flex min-h-screen flex-row items-center justify-between">
        <div className="flex-none min-w-[416px] min-h-screen border-solid border-0 border-r border-primary flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center pb-10">
            Top Album Grid
          </h1>
          <Search />
        </div>
        <div className="flex-grow min-h-screen flex flex-row items-center justify-center py-8">
          <div className="grid grid-cols-5 gap-2 h-full">
            {Array.from({ length: 25 }).map((_, index) => (
              <Album key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
