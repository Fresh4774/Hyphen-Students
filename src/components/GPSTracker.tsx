'use client'
import { useState, useEffect } from 'react'

export default function GPSTracker({ onBack }: { onBack: () => void }) {
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null)
  const [tracking, setTracking] = useState(false)
  const [error, setError] = useState('')
  const [watchId, setWatchId] = useState<number | null>(null)

  const startTracking = () => {
    if ('geolocation' in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setError('')
        },
        (err) => {
          setError(err.message)
        },
        { enableHighAccuracy: true }
      )
      setWatchId(id)
      setTracking(true)
    } else {
      setError('Geolocation not supported')
    }
  }

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
    setTracking(false)
  }

  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [watchId])

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg">
      <button onClick={onBack} className="mb-4 text-blue-600 hover:underline">← Back</button>
      
      <h2 className="text-2xl font-bold mb-4">GPS Tracker</h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      {location && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg">
          <p className="font-semibold mb-2">Current Location:</p>
          <p>Latitude: {location.lat.toFixed(6)}</p>
          <p>Longitude: {location.lng.toFixed(6)}</p>
          <a
            href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            View on Google Maps →
          </a>
        </div>
      )}
      
      {!tracking ? (
        <button
          onClick={startTracking}
          className="w-full p-3 bg-purple-500 text-white rounded-lg font-semibold"
        >
          Start Tracking
        </button>
      ) : (
        <button
          onClick={stopTracking}
          className="w-full p-3 bg-red-500 text-white rounded-lg font-semibold"
        >
          Stop Tracking
        </button>
      )}
    </div>
  )
}