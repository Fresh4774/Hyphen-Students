'use client'
import { useState } from 'react'
import FightDetector from '@/components/FightDetector'
import SpeechToText from '@/components/SpeechToText'
import GPSTracker from '@/components/GPSTracker'

export default function Home() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  return (
    <main className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8">Safety PWA</h1>
      
      {!activeFeature && (
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <button
            onClick={() => setActiveFeature('fight')}
            className="p-6 bg-blue-500 text-white rounded-lg text-xl font-semibold hover:bg-blue-600"
          >
            Fight Detector
          </button>
          <button
            onClick={() => setActiveFeature('stt')}
            className="p-6 bg-green-500 text-white rounded-lg text-xl font-semibold hover:bg-green-600"
          >
            Speech to Text
          </button>
          <button
            onClick={() => setActiveFeature('gps')}
            className="p-6 bg-purple-500 text-white rounded-lg text-xl font-semibold hover:bg-purple-600"
          >
            GPS Tracker
          </button>
        </div>
      )}

      {activeFeature === 'fight' && <FightDetector onBack={() => setActiveFeature(null)} />}
      {activeFeature === 'stt' && <SpeechToText onBack={() => setActiveFeature(null)} />}
      {activeFeature === 'gps' && <GPSTracker onBack={() => setActiveFeature(null)} />}
    </main>
  )
}