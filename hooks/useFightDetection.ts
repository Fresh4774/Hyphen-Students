import { useEffect, useRef, useState } from 'react';

export function useFightDetection(stream: MediaStream | null) {
  const [alertDetected, setAlertDetected] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!stream) return;

    // Audio analysis for shouting/distress
    const audioContext = new AudioContext();
    const analyzer = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    
    source.connect(analyzer);
    analyzer.fftSize = 2048;
    
    audioContextRef.current = audioContext;
    analyzerRef.current = analyzer;

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    
    const checkAudio = () => {
      analyzer.getByteFrequencyData(dataArray);
      
      // Detect sudden loud noises (shouting)
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
      if (average > 150) { // Threshold for loud sounds
        sendAlert('Loud disturbance detected');
        setAlertDetected(true);
      }

      requestAnimationFrame(checkAudio);
    };
    
    checkAudio();

    return () => {
      audioContext.close();
    };
  }, [stream]);

  return { alertDetected };
}

async function sendAlert(message: string) {
  await fetch('/api/send-alert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, timestamp: Date.now() })
  });
}