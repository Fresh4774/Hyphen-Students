'use client';

import { useClassSession } from '@/hooks/useClassSession';
import { useFightDetection } from '@/hooks/useFightDetection';
import { PhotoCapture } from '@/components/PhotoCapture';
import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const { sessionId, isRecording, startSession, endSession } = useClassSession();
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-600 flex flex-col items-center justify-center p-6">
      {!isRecording ? (
        <>
          <h1 className="text-4xl font-bold text-white mb-12 text-center">
            SigmaSkibidi
          </h1>
          
          <button
            onClick={startSession}
            className="w-64 h-64 bg-white text-blue-600 rounded-full shadow-2xl flex items-center justify-center text-3xl font-bold hover:scale-105 transition-transform"
          >
            Start Class
          </button>

          <div className="mt-12 space-y-4 w-full max-w-xs">
            <Link
              href="/teacher"
              className="block w-full bg-white text-blue-600 py-4 rounded-lg text-center font-semibold"
            >
              Teacher Portal
            </Link>
            <Link
              href="/chat"
              className="block w-full bg-white text-blue-600 py-4 rounded-lg text-center font-semibold"
            >
              AI Chat
            </Link>
          </div>
        </>
      ) : (
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-4 h-4 bg-red-600 rounded-full mx-auto mb-4 animate-pulse" />
            <p className="text-xl font-semibold text-gray-800">Recording...</p>
            <p className="text-gray-600 mt-2">Session in progress</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setShowCamera(true)}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold"
            >
              📸 Capture Note
            </button>

            <button
              onClick={endSession}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-semibold"
            >
              End Class
            </button>
          </div>
        </div>
      )}

      {showCamera && sessionId && (
        <PhotoCapture sessionId={sessionId} onClose={() => setShowCamera(false)} />
      )}
    </div>
  );
}