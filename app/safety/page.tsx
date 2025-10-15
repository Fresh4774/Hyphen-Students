'use client';

import { useState, useEffect, useRef } from 'react';

export default function SafetyPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const motionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastFrameRef = useRef<ImageData | null>(null);
  const alertAudioRef = useRef<HTMLAudioElement | null>(null);
  
  const audioThresholdCountRef = useRef(0);
  const audioAboveThresholdTimeRef = useRef(0);
  const motionThresholdCountRef = useRef(0);
  const motionAboveThresholdTimeRef = useRef(0);
  const lastAudioCheckRef = useRef(Date.now());
  const lastMotionCheckRef = useRef(Date.now());
  
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [motionLevel, setMotionLevel] = useState(0);
  const [isAlertActive, setIsAlertActive] = useState(false);
  const lastTapRef = useRef<number>(0);

  useEffect(() => {
    // Initialize alert audio
    alertAudioRef.current = new Audio('/almain.mp3');
    alertAudioRef.current.volume = 1.0; // Full volume
    alertAudioRef.current.preload = 'auto';

    return () => {
      if (alertAudioRef.current) {
        alertAudioRef.current.pause();
        alertAudioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => stopMonitoring();
  }, [isMonitoring]);

  const startMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          setTimeout(() => {
            monitorMotion();
          }, 500);
        };
      }

      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      analyzerRef.current.smoothingTimeConstant = 0.8;
      source.connect(analyzerRef.current);

      audioThresholdCountRef.current = 0;
      audioAboveThresholdTimeRef.current = 0;
      motionThresholdCountRef.current = 0;
      motionAboveThresholdTimeRef.current = 0;
      lastAudioCheckRef.current = Date.now();
      lastMotionCheckRef.current = Date.now();

      monitorAudio();
    } catch (error) {
      console.error('Error accessing media:', error);
      setAlert('FAILED TO ACCESS CAMERA/MICROPHONE');
    }
  };

  const stopMonitoring = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (motionTimerRef.current) {
      clearTimeout(motionTimerRef.current);
      motionTimerRef.current = null;
    }

    lastFrameRef.current = null;
    setAudioLevel(0);
    setMotionLevel(0);
    
    audioThresholdCountRef.current = 0;
    audioAboveThresholdTimeRef.current = 0;
    motionThresholdCountRef.current = 0;
    motionAboveThresholdTimeRef.current = 0;
  };

  const monitorAudio = () => {
    if (!analyzerRef.current || !isMonitoring) return;

    const dataArray = new Uint8Array(analyzerRef.current.frequencyBinCount);
    analyzerRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average);

    const now = Date.now();
    const timeSinceLastCheck = now - lastAudioCheckRef.current;

    if (average > 150) {
      audioAboveThresholdTimeRef.current += timeSinceLastCheck;
      audioThresholdCountRef.current++;

      if (audioAboveThresholdTimeRef.current > 3000) {
        triggerAlert('SUSTAINED LOUD NOISE - POSSIBLE SHOUTING OR DISTRESS');
        audioAboveThresholdTimeRef.current = 0;
        audioThresholdCountRef.current = 0;
      } else if (audioThresholdCountRef.current >= 2) {
        triggerAlert('REPEATED LOUD NOISE - POSSIBLE SHOUTING OR DISTRESS');
        audioThresholdCountRef.current = 0;
      }
    } else {
      audioAboveThresholdTimeRef.current = 0;
      
      if (timeSinceLastCheck > 3000) {
        audioThresholdCountRef.current = 0;
      }
    }

    lastAudioCheckRef.current = now;
    animationFrameRef.current = requestAnimationFrame(monitorAudio);
  };

  const monitorMotion = () => {
    if (!videoRef.current || !canvasRef.current || !isMonitoring) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (!ctx || video.readyState !== video.HAVE_ENOUGH_DATA) {
      motionTimerRef.current = setTimeout(monitorMotion, 100);
      return;
    }

    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (lastFrameRef.current && currentFrame.data.length === lastFrameRef.current.data.length) {
      let diffCount = 0;
      const threshold = 40;
      const step = 4;

      for (let i = 0; i < currentFrame.data.length; i += step) {
        const rDiff = Math.abs(currentFrame.data[i] - lastFrameRef.current.data[i]);
        const gDiff = Math.abs(currentFrame.data[i + 1] - lastFrameRef.current.data[i + 1]);
        const bDiff = Math.abs(currentFrame.data[i + 2] - lastFrameRef.current.data[i + 2]);
        const avgDiff = (rDiff + gDiff + bDiff) / 3;

        if (avgDiff > threshold) {
          diffCount++;
        }
      }

      const totalPixels = currentFrame.data.length / 4;
      const motionPercent = (diffCount / totalPixels) * 100;
      setMotionLevel(motionPercent);

      const now = Date.now();
      const timeSinceLastCheck = now - lastMotionCheckRef.current;

      if (motionPercent > 40) {
        motionAboveThresholdTimeRef.current += timeSinceLastCheck;
        motionThresholdCountRef.current++;

        if (motionAboveThresholdTimeRef.current > 1000) {
          triggerAlert('SUSTAINED RAPID MOTION - POSSIBLE AGGRESSIVE BEHAVIOR');
          motionAboveThresholdTimeRef.current = 0;
          motionThresholdCountRef.current = 0;
        } else if (motionThresholdCountRef.current >= 2) {
          triggerAlert('REPEATED RAPID MOTION - POSSIBLE AGGRESSIVE BEHAVIOR');
          motionThresholdCountRef.current = 0;
        }
      } else {
        motionAboveThresholdTimeRef.current = 0;
        
        if (timeSinceLastCheck > 3000) {
          motionThresholdCountRef.current = 0;
        }
      }

      lastMotionCheckRef.current = now;
    }

    lastFrameRef.current = currentFrame;
    motionTimerRef.current = setTimeout(monitorMotion, 100);
  };

  const triggerAlert = (message: string) => {
    setAlert(message);
    setIsAlertActive(true);
    
    // Play alert audio at full volume
    if (alertAudioRef.current) {
      alertAudioRef.current.currentTime = 0; // Reset to beginning
      alertAudioRef.current.play().catch(error => {
        console.error('Error playing alert audio:', error);
      });
    }
    
    setTimeout(() => setAlert(null), 3000);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;
    
    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap detected
      setIsAlertActive(false);
      setAlert(null);
      
      // Stop alert audio
      if (alertAudioRef.current) {
        alertAudioRef.current.pause();
        alertAudioRef.current.currentTime = 0;
      }
    }
    
    lastTapRef.current = now;
  };

  return (
    <div 
      className={`min-h-screen p-4 font-mono transition-colors duration-300 ${
        isAlertActive ? 'bg-red-600' : 'bg-black'
      }`}
      onClick={handleDoubleTap}
    >
      {isAlertActive && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="text-center">
            <div className="text-9xl font-bold text-white animate-pulse mb-4">
              ⚠ ALERT ⚠
            </div>
            <div className="text-2xl text-white font-bold">
              {alert}
            </div>
            <div className="text-lg text-white mt-8">
              DOUBLE TAP TO DISMISS
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-md mx-auto space-y-4">
        <div className="border-b border-zinc-700 pb-3">
          <h1 className={`text-xl tracking-widest ${isAlertActive ? 'text-white' : 'text-white'}`}>
            SAFETY MONITORING
          </h1>
          <p className={`text-xs mt-1 ${isAlertActive ? 'text-red-200' : 'text-zinc-500'}`}>
            AI THREAT DETECTION
          </p>
        </div>

        {alert && !isAlertActive && (
          <div className="bg-white text-black p-3 text-xs font-bold animate-pulse border-2 border-white">
            ⚠ {alert}
          </div>
        )}

        <button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={`w-full py-3 text-sm font-bold tracking-wider transition-colors ${
            isMonitoring 
              ? isAlertActive 
                ? 'bg-red-800 hover:bg-red-700 border border-white text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 border border-white' 
              : isAlertActive
                ? 'bg-white text-red-600 hover:bg-red-50'
                : 'bg-white text-black hover:bg-zinc-200'
          }`}
        >
          {isMonitoring ? '■ STOP MONITORING' : '▶ START MONITORING'}
        </button>

        <div className={`relative border ${isAlertActive ? 'bg-red-900 border-red-400' : 'bg-zinc-900 border-zinc-700'}`}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-auto"
          />
          {isMonitoring && (
            <div className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold ${
              isAlertActive ? 'bg-red-600 text-white' : 'bg-white text-black'
            }`}>
              ● LIVE
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {isMonitoring && (
          <div className="space-y-3">
            <div className="bg-zinc-900 p-3 border border-zinc-700">
              <div className="text-xs text-zinc-500 mb-2">AUDIO LEVEL</div>
              <div className="text-xl font-bold mb-2">{Math.round(audioLevel)}</div>
              <div className="w-full bg-zinc-800 h-1.5">
                <div 
                  className="bg-white h-1.5 transition-all duration-100"
                  style={{ width: `${Math.min((audioLevel / 255) * 100, 100)}%` }}
                />
              </div>
              <div className="text-xs text-zinc-600 mt-1">THRESHOLD: 150 (3S SUSTAINED OR 2X IN 3S)</div>
            </div>

            <div className="bg-zinc-900 p-3 border border-zinc-700">
              <div className="text-xs text-zinc-500 mb-2">MOTION LEVEL</div>
              <div className="text-xl font-bold mb-2">{motionLevel.toFixed(1)}%</div>
              <div className="w-full bg-zinc-800 h-1.5">
                <div 
                  className="bg-white h-1.5 transition-all duration-100"
                  style={{ width: `${Math.min(motionLevel * 2.5, 100)}%` }}
                />
              </div>
              <div className="text-xs text-zinc-600 mt-1">THRESHOLD: 40% (1S SUSTAINED OR 2X IN 3S)</div>
            </div>
          </div>
        )}

        <div className="text-center text-xs text-zinc-600 border-t border-zinc-800 pt-3">
          {isMonitoring ? '● SYSTEM ACTIVE' : '○ SYSTEM STANDBY'}
        </div>
      </div>
    </div>
  );
}