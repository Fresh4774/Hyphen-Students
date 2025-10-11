'use client'
import { useRef, useState, useEffect } from 'react'

export default function FightDetector({ onBack }: { onBack: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [isAlert, setIsAlert] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [cvLoaded, setCvLoaded] = useState(false)
  const [motionLevel, setMotionLevel] = useState(0)
  const [alertHistory, setAlertHistory] = useState<string[]>([])
  
  const prevGrayRef = useRef<any>(null)
  const animationFrameRef = useRef<number | null>(null)
  const highMotionCountRef = useRef(0)
  const featurePointsRef = useRef<any>(null)

  // Load OpenCV
  useEffect(() => {
    // Check if already loaded
    // @ts-ignore
    if (window.cv && window.cv.Mat) {
      setCvLoaded(true)
      return
    }

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="opencv.js"]')
    if (existingScript) {
      // @ts-ignore
      if (window.cv) {
        // @ts-ignore
        window.cv.onRuntimeInitialized = () => setCvLoaded(true)
      }
      return
    }

    const script = document.createElement('script')
    script.src = 'https://docs.opencv.org/4.5.2/opencv.js'
    script.async = true
    
    // @ts-ignore
    window.cv = window.cv || {}
    // @ts-ignore
    window.cv.onRuntimeInitialized = () => {
      setCvLoaded(true)
    }
    
    document.body.appendChild(script)
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 640, height: 480 } 
      })
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.onloadedmetadata = () => {
          setIsActive(true)
          setIsAlert(false)
          highMotionCountRef.current = 0
          setAlertHistory([])
        }
      }
      setStream(mediaStream)
    } catch (err) {
      alert('Camera access denied')
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    
    // Clean up OpenCV resources
    if (prevGrayRef.current) {
      prevGrayRef.current.delete()
      prevGrayRef.current = null
    }
    if (featurePointsRef.current) {
      featurePointsRef.current.delete()
      featurePointsRef.current = null
    }
    
    setIsActive(false)
    highMotionCountRef.current = 0
  }

  const detectMotionWithOpticalFlow = () => {
    // @ts-ignore
    if (!videoRef.current || !canvasRef.current || !isActive || !window.cv) return

    const video = videoRef.current
    const canvas = canvasRef.current
    // @ts-ignore
    const cv = window.cv

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      animationFrameRef.current = requestAnimationFrame(detectMotionWithOpticalFlow)
      return
    }

    try {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        animationFrameRef.current = requestAnimationFrame(detectMotionWithOpticalFlow)
        return
      }

      ctx.drawImage(video, 0, 0)
      
      let src, gray
      
      try {
        src = cv.imread(canvas)
        gray = new cv.Mat()
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY)
      } catch (e) {
        console.error('Error reading/converting frame:', e)
        if (src) src.delete()
        if (gray) gray.delete()
        animationFrameRef.current = requestAnimationFrame(detectMotionWithOpticalFlow)
        return
      }

      if (prevGrayRef.current && prevGrayRef.current.rows > 0) {
        let diff, thresh
        
        try {
          // Use simpler frame differencing with OpenCV for better compatibility
          diff = new cv.Mat()
          cv.absdiff(prevGrayRef.current, gray, diff)
          
          // Threshold the difference
          thresh = new cv.Mat()
          cv.threshold(diff, thresh, 25, 255, cv.THRESH_BINARY)
          
          // Count non-zero pixels (areas with motion)
          const nonZero = cv.countNonZero(thresh)
          const totalPixels = thresh.rows * thresh.cols
          const motionPercent = (nonZero / totalPixels) * 100

          setMotionLevel(Math.round(motionPercent))

          // Detect fight: sustained high motion
          if (motionPercent > 8) {
            highMotionCountRef.current++
            
            if (highMotionCountRef.current >= 4) {
              const time = new Date().toLocaleTimeString()
              setIsAlert(true)
              setAlertHistory(prev => [`${time}: High motion detected`, ...prev].slice(0, 5))
              navigator.vibrate?.(500)
              
              // Draw alert on canvas
              ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'
              ctx.fillRect(0, 0, canvas.width, canvas.height)
              ctx.font = 'bold 48px Arial'
              ctx.fillStyle = 'red'
              ctx.strokeStyle = 'white'
              ctx.lineWidth = 3
              const text = '⚠️ FIGHT DETECTED'
              ctx.strokeText(text, 50, 60)
              ctx.fillText(text, 50, 60)
            }
          } else if (motionPercent < 3) {
            highMotionCountRef.current = Math.max(0, highMotionCountRef.current - 1)
            if (highMotionCountRef.current === 0) {
              setIsAlert(false)
            }
          }
        } catch (e) {
          console.error('Error in motion detection:', e)
        } finally {
          if (diff) diff.delete()
          if (thresh) thresh.delete()
        }
      }

      if (prevGrayRef.current) {
        prevGrayRef.current.delete()
      }
      prevGrayRef.current = gray.clone()
      
      src.delete()
      gray.delete()

    } catch (err) {
      console.error('OpenCV error:', err)
    }

    animationFrameRef.current = requestAnimationFrame(detectMotionWithOpticalFlow)
  }

  useEffect(() => {
    if (isActive && cvLoaded) {
      detectMotionWithOpticalFlow()
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isActive, cvLoaded])

  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg">
      <button onClick={onBack} className="mb-4 text-blue-400 hover:underline">← Back</button>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">
          OpenCV Fight Detector
        </h2>
        {!cvLoaded && <span className="text-yellow-400 text-sm">Loading OpenCV...</span>}
      </div>

      {isAlert && (
        <div className="bg-red-600 text-white p-4 rounded-lg mb-4 animate-pulse">
          <div className="flex items-center gap-2 text-xl font-bold">
            ⚠️ FIGHT DETECTED!
          </div>
          <p className="text-sm mt-1">High sustained motion detected in frame</p>
        </div>
      )}
      
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full rounded-lg mb-4 bg-black"
        />
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full rounded-lg pointer-events-none"
        />
      </div>

      {isActive && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 text-sm">Motion Level:</span>
            <span className={`text-lg font-bold ${motionLevel > 15 ? 'text-red-400' : 'text-green-400'}`}>
              {motionLevel}%
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all ${motionLevel > 15 ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${Math.min(motionLevel, 100)}%` }}
            />
          </div>
        </div>
      )}

      {alertHistory.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg mb-4">
          <h3 className="text-white font-semibold mb-2">Alert History</h3>
          <div className="space-y-1">
            {alertHistory.map((alert, i) => (
              <div key={i} className="text-sm text-gray-300">{alert}</div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex gap-2">
        {!isActive ? (
          <button
            onClick={startCamera}
            disabled={!cvLoaded}
            className="flex-1 p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {cvLoaded ? 'Start Detection' : 'Loading OpenCV...'}
          </button>
        ) : (
          <button
            onClick={stopCamera}
            className="flex-1 p-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
          >
            Stop Detection
          </button>
        )}
      </div>

      <div className="mt-4 text-gray-400 text-sm">
        <p><strong>Using:</strong> OpenCV.js Frame Differencing + Thresholding</p>
        <p><strong>Threshold:</strong> &gt;8% motion pixels for 4 consecutive frames</p>
      </div>
    </div>
  )
}