'use client';

import { useRef, useState } from 'react';
import { getDB } from '@/lib/db';

export function PhotoCapture({ sessionId }: { sessionId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const openCamera = async () => {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    });
    if (videoRef.current) {
      videoRef.current.srcObject = mediaStream;
    }
    setStream(mediaStream);
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const photo = {
        id: `photo-${Date.now()}`,
        sessionId,
        blob,
        timestamp: Date.now()
      };

      const db = await getDB();
      await db.add('photos', photo);

      // Process with GPT-4 Vision
      await fetch('/api/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoId: photo.id })
      });

      closeCamera();
    });
  };

  const closeCamera = () => {
    stream?.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {stream ? (
        <>
          <video ref={videoRef} autoPlay playsInline className="flex-1" />
          <div className="p-4 flex gap-4">
            <button
              onClick={capturePhoto}
              className="flex-1 bg-blue-600 text-white py-4 rounded-lg text-lg font-bold"
            >
              Capture
            </button>
            <button
              onClick={closeCamera}
              className="px-6 bg-gray-600 text-white py-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={openCamera}
          className="m-4 bg-blue-600 text-white py-4 rounded-lg text-lg font-bold"
        >
          Open Camera
        </button>
      )}
    </div>
  );
}