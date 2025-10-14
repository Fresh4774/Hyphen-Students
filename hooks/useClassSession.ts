import { useState } from 'react';
import { getDB } from '@/lib/db';
import { useRecording } from './useRecording';

export function useClassSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { isRecording, startRecording, stopRecording } = useRecording();

  const startSession = async () => {
    const id = `session-${Date.now()}`;
    const location = await getLocation();
    
    await startRecording();
    
    const db = await getDB();
    await db.add('sessions', {
      id,
      startTime: Date.now(),
      location
    });
    
    setSessionId(id);
    return id;
  };

  const endSession = async () => {
    if (!sessionId) return;

    const videoBlob = await stopRecording();
    
    const db = await getDB();
    const session = await db.get('sessions', sessionId);
    if (session) {
      session.endTime = Date.now();
      session.videoBlob = videoBlob;
      await db.put('sessions', session);
    }

    // Trigger background processing
    await processSession(sessionId);
    setSessionId(null);
  };

  return { sessionId, isRecording, startSession, endSession };
}

async function getLocation() {
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return { lat: pos.coords.latitude, lng: pos.coords.longitude };
  } catch {
    return undefined;
  }
}

async function processSession(sessionId: string) {
  // Trigger API route for background processing
  await fetch('/api/process-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId })
  });
}