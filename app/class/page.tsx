'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';

export default function ClassPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Recording error:', error);
      alert('Microphone access denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);

    try {
      // Transcribe
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const transcribeRes = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });
      const { transcript } = await transcribeRes.json();
      setTranscript(transcript);

      // Summarize
      const summarizeRes = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });
      const { summary } = await summarizeRes.json();
      setSummary(summary);
      
      setShowEmailInput(true);
    } catch (error) {
      console.error('Processing error:', error);
      alert('Processing failed');
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
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, transcript, summary }),
      });
      alert('Email sent successfully!');
      setEmail('');
    } catch (error) {
      console.error('Email error:', error);
      alert('Email send failed');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-mono">
      <div className="w-full max-w-2xl bg-black p-6 space-y-6">
        <div className="flex items-center border-b border-zinc-800 pb-4">
          <button
            onClick={() => router.push('/')}
            className="text-white hover:text-zinc-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {!transcript && !isProcessing && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-full px-8 py-6 rounded-full text-base font-sans tracking-wider transition-colors ${
                isRecording 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-white text-black hover:bg-zinc-200'
              }`}
            >
              {isRecording ? 'STOP RECORDING' : 'START CLASS NOTES SESSION'}
            </button>

            <button
              onClick={() => console.log('Capture Knowledge')}
              className="w-full px-8 py-6 bg-white text-black rounded-full text-base font-sans tracking-wider hover:bg-zinc-200 transition-colors"
            >
              CAPTURE KNOWLEDGE
            </button>

            <button
              onClick={() => console.log('Previous Classes')}
              className="w-full px-8 py-6 bg-white text-black rounded-full text-base font-sans tracking-wider hover:bg-zinc-200 transition-colors"
            >
              PREVIOUS CLASSES
            </button>
          </div>
        )}

        {isProcessing && (
          <div className="text-white text-center py-20">
            <div className="text-xl">Processing...</div>
          </div>
        )}

        {transcript && (
          <div className="space-y-6 text-white">
            <div className="border border-zinc-800 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">AI Summary</h3>
              <div className="whitespace-pre-wrap text-sm">{summary}</div>
            </div>

            <div className="border border-zinc-800 p-4 rounded">
              <h3 className="text-lg font-bold mb-2">Transcript</h3>
              <div className="whitespace-pre-wrap text-sm max-h-64 overflow-y-auto">{transcript}</div>
            </div>

            {showEmailInput && (
              <div className="border-t border-zinc-800 pt-6 space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-zinc-900 text-white border border-zinc-800 rounded focus:outline-none focus:border-white"
                />
                <button
                  onClick={sendEmail}
                  className="w-full px-8 py-6 bg-white text-black rounded-full text-base font-sans tracking-wider hover:bg-zinc-200 transition-colors"
                >
                  SEND TO EMAIL
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}