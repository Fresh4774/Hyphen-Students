'use client';

import { useRouter } from 'next/navigation';

export default function ClassPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-md bg-black p-6 space-y-6">
        {/* Header with Back Button */}
        <div className="flex items-center border-b border-zinc-800 pb-4">
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-zinc-400 transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </button>
        </div>

        {/* Centered Button */}
        <div className="flex items-center justify-center py-20">
          <button
            onClick={() => {
              // Add your navigation or action here
              console.log('Starting class notes session');
            }}
            className="w-full px-8 py-6 bg-white text-black rounded-full text-base font-sans tracking-wider hover:bg-zinc-200 transition-colors"
          >
            START CLASS NOTES SESSION
          </button>
        </div>
      </div>
    </div>
  );
}