'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-black flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-black  overflow-hidden p-6 space-y-4">
        {/* School Name */}
        <div className="text-center border-b border-zinc-800 pb-3">
          <h1 className="text-xl font-sans font-light tracking-widest text-white">
            Neerja Modi School
          </h1>
        </div>

        {/* Photo */}
        <div className="flex justify-center py-4">
          <div className="size-[240px]">
            <img 
              src="/images/pfp.png" 
              alt="Student Photo" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* All Info in Single Column */}
        <div className="space-y-3 text-white overflow-hidden">
          <div className="border-b border-zinc-800 pb-2">
            <div className="text-xs text-zinc-500 mb-1">NAME</div>
            <div className="text-sm tracking-wide font-sans">ROHIT SHARMA</div>
          </div>

          <div className="border-b border-zinc-800 pb-2">
            <div className="text-xs text-zinc-500 mb-1">CLASS</div>
            <div className="text-sm tracking-wide">XI - A</div>
          </div>

          <div className="border-b border-zinc-800 pb-2">
            <div className="text-xs text-zinc-500 mb-1">DATE OF BIRTH</div>
            <div className="text-sm tracking-wide">1 JANUATY 2008</div>
          </div>

          <div className="border-b border-zinc-800 pb-2">
            <div className="text-xs text-zinc-500 mb-1">ID NUMBER</div>
            <div className="text-sm tracking-widest">NGL-12345-TBH-67890-IDK</div>
          </div>

          <div className="border-b border-zinc-800 pb-2">
            <div className="text-xs text-zinc-500 mb-1">ADDRESS</div>
            <div className="text-sm tracking-wide">SANTA CLAUS, NORTH POLE, H0H 0H0, CANADA</div>
          </div>

          <div className="border-b border-zinc-800 pb-2">
            <div className="text-xs text-zinc-500 mb-1">PHONE</div>
            <div className="text-sm tracking-wide">+91 100 112 100</div>
          </div>

          <div className="border-b border-zinc-800 pb-2">
            <div className="text-xs text-zinc-500 mb-1">EMAIL</div>
            <div className="text-sm tracking-wide">rohitSharma@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}