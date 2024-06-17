import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-center justify-between">
        
      <div className="w-1/3 min-h-screen p-4 border-solid border-0 border-r border-primary">
        <h1 className="text-4xl font-bold text-center pt-8 pb-10">Top Albums</h1>
        <Input placeholder="Search for an album" />
        <div className="grid grid-cols-3 gap-4 h-full py-4">
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
      <div className="flex min-h-screen w-full flex-row items-center justify-center p-16">
        <div className="grid grid-cols-5 gap-4 h-full">
          <div className="border h-32 w-32 border-primary"></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
          <div className="border h-32 w-32 border-primary" ></div>
        </div>
      </div> 
    </main>
  );
}
