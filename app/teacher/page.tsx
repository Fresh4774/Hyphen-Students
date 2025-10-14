'use client';

import { useState } from 'react';

export default function TeacherPage() {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const submitText = async () => {
    await fetch('/api/teacher-reminder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input, type: 'text' })
    });
    setInput('');
    alert('Reminder saved!');
  };

  const recordVoice = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    const chunks: Blob[] = [];

    recorder.ondataavailable = (e) => chunks.push(e.data);
    recorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const formData = new FormData();
      formData.append('audio', blob);

      await fetch('/api/teacher-reminder', {
        method: 'POST',
        body: formData
      });

      stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      alert('Voice reminder saved!');
    };

    recorder.start();
    setTimeout(() => recorder.stop(), 10000); // 10 second limit
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Teacher Reminders</h1>
        
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type homework or announcement..."
          className="w-full p-4 border rounded-lg mb-4 h-32"
        />
        
        <div className="space-y-3">
          <button
            onClick={submitText}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            Submit Text
          </button>
          
          <button
            onClick={recordVoice}
            disabled={isRecording}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {isRecording ? 'Recording... (10s)' : 'Record Voice Message'}
          </button>
        </div>
      </div>
    </div>
  );
}