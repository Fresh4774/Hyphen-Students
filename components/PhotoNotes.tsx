'use client';

import { useState } from 'react';
import CameraCapture from './CameraCapture';

interface PhotoNotesProps {
  onClose: () => void;
}

export default function PhotoNotes({ onClose }: PhotoNotesProps) {
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState<Array<{ image: string; analysis: string }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handleCapture = async (imageData: string) => {
    setShowCamera(false);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData, type: 'detailed' }),
      });
      const { analysis } = await response.json();
      
      setPhotos([...photos, { image: imageData, analysis }]);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Analysis failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const sendEmail = async () => {
    if (!email) {
      alert('Please enter email');
      return;
    }

    try {
      const combinedNotes = photos.map((p, i) => 
        `Photo ${i + 1}:\n${p.analysis}`
      ).join('\n\n---\n\n');

      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          transcript: combinedNotes,
          summary: 'Visual Notes Summary'
        }),
      });
      alert('Email sent successfully!');
      onClose();
    } catch (error) {
      console.error('Email error:', error);
      alert('Email send failed');
    }
  };

  if (showCamera) {
    return <CameraCapture onCapture={handleCapture} onClose={() => setShowCamera(false)} />;
  }

  return (
    <div className="fixed inset-0 bg-black z-40 overflow-y-auto">
      <div className="min-h-screen p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-4 mb-6">
            <h2 className="text-white text-xl">Photo Notes</h2>
            <button
              onClick={onClose}
              className="text-white text-2xl"
            >
              ×
            </button>
          </div>

          {isProcessing && (
            <div className="text-white text-center py-10">Processing...</div>
          )}

          <div className="space-y-6">
            {photos.map((photo, index) => (
              <div key={index} className="border border-zinc-800 rounded p-4">
                <img src={photo.image} alt={`Capture ${index + 1}`} className="w-full rounded mb-4" />
                <div className="text-white text-sm whitespace-pre-wrap">{photo.analysis}</div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 bg-black pt-6 pb-4 space-y-4">
            <button
              onClick={() => setShowCamera(true)}
              className="w-full px-8 py-4 bg-white text-black rounded-full text-base font-sans tracking-wider hover:bg-zinc-200 transition-colors"
            >
              {photos.length === 0 ? 'CAPTURE PHOTO' : 'CAPTURE ANOTHER'}
            </button>

            {photos.length > 0 && (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-800 rounded focus:outline-none focus:border-white"
                />
                <button
                  onClick={sendEmail}
                  className="w-full px-8 py-4 bg-white text-black rounded-full text-base font-sans tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  SEND TO EMAIL
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}