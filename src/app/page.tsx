import Search from '@/components/search';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
      <div className="w-1/4 min-h-screen p-4 border-solid border-0 border-r border-primary flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center pt-8 pb-10">
          Top Album Grid
        </h1>
        <Search />
      </div>
      <div className="w-3/4 min-h-screen flex flex-row items-center justify-center p-16">
        <div className="grid grid-cols-5 gap-4 h-full">
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary"></div>
        </div>
      </div>
    </main>
  );
}
