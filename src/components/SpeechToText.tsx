'use client'
import { useState, useEffect, useRef } from 'react'

export default function SpeechToText({ onBack }: { onBack: () => void }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [savedTranscripts, setSavedTranscripts] = useState<string[]>([])
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true

        recognitionRef.current.onresult = (event: any) => {
          let finalTranscript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript + ' '
            }
          }
          if (finalTranscript) {
            setTranscript(prev => prev + finalTranscript)
          }
        }

        recognitionRef.current.onerror = () => {
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const saveTranscript = () => {
    if (transcript.trim()) {
      setSavedTranscripts(prev => [...prev, transcript])
      setTranscript('')
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">← Back</button>
      
      <h2 className="text-2xl font-bold mb-4">Speech to Text</h2>
      
      <div className="mb-4">
        <textarea
          value={transcript}
          readOnly
          placeholder="Your speech will appear here..."
          className="w-full h-40 p-3 border rounded-lg"
        />
      </div>
      
      <div className="flex gap-2 mb-6">
        {!isListening ? (
          <button
            onClick={startListening}
            className="flex-1 p-3 bg-green-500 text-white rounded-lg font-semibold"
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex-1 p-3 bg-red-500 text-white rounded-lg font-semibold"
          >
            Stop Recording
          </button>
        )}
        <button
          onClick={saveTranscript}
          disabled={!transcript.trim()}
          className="flex-1 p-3 bg-blue-500 text-white rounded-lg font-semibold disabled:bg-gray-300"
        >
          Save
        </button>
      </div>

      <h3 className="font-bold mb-2">Saved Transcripts:</h3>
      <div className="space-y-2">
        {savedTranscripts.map((text, idx) => (
          <div key={idx} className="p-3 bg-gray-100 rounded border">
            {text}
          </div>
        ))}
      </div>
    </div>
  )
}