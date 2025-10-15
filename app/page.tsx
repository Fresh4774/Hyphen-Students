'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define Geolocation Position type for clarity
interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export default function HomePage() {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [tagClicked, setTagClicked] = useState(false);
  const [tapTimer, setTapTimer] = useState<NodeJS.Timeout | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);
  
  // School location - Crossroads International School, Udaipur
  const SCHOOL_LAT = 24.6144217;
  const SCHOOL_LNG = 73.697081;
  const BOUNDARY_M = 200; // Geofence boundary for 'off-campus'
  const ON_CAMPUS_M = 100; // Geofence boundary for 'on-campus'
  
  // GPS Tracking State
  const [locationStatus, setLocationStatus] = useState<'on-campus' | 'off-campus' | 'boundary' | 'error' | 'loading'>('loading');
  const [coordinates, setCoordinates] = useState({ lat: SCHOOL_LAT, lng: SCHOOL_LNG });
  const [distance, setDistance] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [geoError, setGeoError] = useState<string | null>(null); // State to hold GPS errors

  /**
   * Calculate distance between two coordinates in meters (Haversine formula).
   * @param lat1 Latitude of point 1
   * @param lng1 Longitude of point 1
   * @param lat2 Latitude of point 2
   * @param lng2 Longitude of point 2
   * @returns Distance in meters
   */
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  /**
   * Geolocation success callback. Updates location state and geofence status.
   */
  const geoSuccess = (position: GeolocationPosition) => {
    const { latitude: newLat, longitude: newLng } = position.coords;
    
    setCoordinates({ lat: newLat, lng: newLng });
    setLastUpdate(new Date());
    setGeoError(null); // Clear any previous errors

    // Calculate distance from school
    const dist = calculateDistance(SCHOOL_LAT, SCHOOL_LNG, newLat, newLng);
    setDistance(dist);

    // Determine status based on distance (Geofencing Logic)
    if (dist <= ON_CAMPUS_M) {
      setLocationStatus('on-campus'); // Within 100m
    } else if (dist <= BOUNDARY_M) {
      setLocationStatus('boundary'); // 100m - 200m
    } else {
      setLocationStatus('off-campus'); // Beyond 200m
    }
  };

  /**
   * Geolocation error callback. Updates status to 'error'.
   */
  const geoErrorCallback = (error: GeolocationPositionError) => {
    console.error('Geolocation Error:', error);
    setLocationStatus('error');
    let errorMessage = 'GPS unavailable.';
    switch(error.code) {
      case error.PERMISSION_DENIED:
        errorMessage = 'Location access denied by the user. Cannot track GPS.';
        break;
      case error.POSITION_UNAVAILABLE:
        errorMessage = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        errorMessage = 'The request to get user location timed out.';
        break;
    }
    setGeoError(errorMessage);
    // Set coordinates to school center on error as a fallback/default
    setCoordinates({ lat: SCHOOL_LAT, lng: SCHOOL_LNG });
    setDistance(0);
  };
  
  // EFFECT HOOK FOR REAL GPS TRACKING
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      setLocationStatus('error');
      setGeoError("Geolocation is not supported by your device's browser.");
      return;
    }

    // Start watching the user's position
    const watchId = navigator.geolocation.watchPosition(
      geoSuccess,
      geoErrorCallback,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    // Cleanup function: stop watching position when the component unmounts
    return () => navigator.geolocation.clearWatch(watchId);
  }, []); // Empty dependency array ensures this runs once on mount

  // Tap handler (Remains the same)
  const handleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;

    if (tapTimer) {
      clearTimeout(tapTimer);
      setTapTimer(null);
    }
    
    if (timeSinceLastTap > 500) {
      setTapCount(1);
    } else {
      const newTapCount = tapCount + 1;
      setTapCount(newTapCount);

      if (newTapCount === 3) {
        router.push('/class');
        setTapCount(0);
        setLastTapTime(now);
        return;
      }

      if (newTapCount === 2) {
        const timer = setTimeout(() => {
          router.push('/safety');
          setTapCount(0);
        }, 300);
        setTapTimer(timer);
      }
    }

    setLastTapTime(now);
  };

  const schedule = [
    { time: '08:00 - 08:45', subject: 'Mathematics', teacher: 'Mr. Singh' },
    { time: '08:50 - 09:35', subject: 'Physics', teacher: 'Ms. Patel' },
    { time: '09:40 - 10:25', subject: 'Chemistry', teacher: 'Dr. Kumar' },
    { time: '10:25 - 10:45', subject: 'BREAK', teacher: '' },
    { time: '10:45 - 11:30', subject: 'English', teacher: 'Mrs. Verma' },
    { time: '11:35 - 12:20', subject: 'Computer Science', teacher: 'Mr. Gupta' },
    { time: '12:25 - 01:10', subject: 'Physical Education', teacher: 'Coach Reddy' },
  ];

  const getStatusColor = () => {
    switch (locationStatus) {
      case 'on-campus': return 'text-green-400';
      case 'boundary': return 'text-yellow-400';
      case 'off-campus': return 'text-red-400';
      case 'error': return 'text-red-400';
      case 'loading': return 'text-sky-400';
    }
  };

  const getStatusBg = () => {
    switch (locationStatus) {
      case 'on-campus': return 'bg-green-900/30';
      case 'boundary': return 'bg-yellow-900/30';
      case 'off-campus': return 'bg-red-900/30';
      case 'error': return 'bg-red-900/30';
      case 'loading': return 'bg-sky-900/30';
    }
  };

  const getStatusText = () => {
    switch (locationStatus) {
      case 'on-campus': return 'ON CAMPUS';
      case 'boundary': return 'NEAR BOUNDARY';
      case 'off-campus': return 'OFF CAMPUS - ALERT';
      case 'error': return 'GPS ERROR';
      case 'loading': return 'LOCATING GPS...';
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-black flex items-center justify-center p-4 font-mono">
      <div className="relative w-full max-w-md">
        {/* Attendance Tag */}
        <div 
          className="absolute -top-2 -right-2 bg-zinc-800 text-white px-4 py-1.5 text-xs tracking-wider cursor-pointer hover:bg-zinc-700 transition-colors z-10 shadow-lg"
          style={{ transform: 'rotate(3deg)' }}
          onClick={(e) => {
            e.stopPropagation();
            setTagClicked(true);
          }}
        >
          {tagClicked ? 'WELCOME BACK TO SCHOOL LOL' : 'ATTENDANCE'}
        </div>

        {/* Schedule Tag */}
        <div 
          className="absolute -top-2 -left-2 bg-zinc-800 text-white px-4 py-1.5 text-xs tracking-wider cursor-pointer hover:bg-zinc-700 transition-colors z-10 shadow-lg"
          style={{ transform: 'rotate(-3deg)' }}
          onClick={(e) => {
            e.stopPropagation();
            setShowSchedule(true);
          }}
        >
          TODAY'S SCHEDULE
        </div>

        <div 
          className="w-full bg-black overflow-hidden p-6 space-y-4 cursor-pointer"
          onClick={handleTap}
        >
          {/* School Name */}
          <div className="text-center border-b border-zinc-800 pb-3">
            <h1 className="text-xl font-sans font-light tracking-widest text-white">
              Neerja Modi School
            </h1>
          </div>

          {/* Photo */}
          <div className="flex justify-center py-4">
            <div className="size-[240px]">
              <img 
                src="/images/pfp.png" 
                alt="Student Photo" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* All Info in Single Column */}
          <div className="space-y-3 text-white overflow-hidden">
            <div className="border-b border-zinc-800 pb-2">
              <div className="text-xs text-zinc-500 mb-1">NAME</div>
              <div className="text-sm tracking-wide font-sans">ROHIT SHARMA</div>
            </div>

            <div className="border-b border-zinc-800 pb-2">
              <div className="text-xs text-zinc-500 mb-1">CLASS</div>
              <div className="text-sm tracking-wide">XI - A</div>
            </div>

            <div className="border-b border-zinc-800 pb-2">
              <div className="text-xs text-zinc-500 mb-1">DATE OF BIRTH</div>
              <div className="text-sm tracking-wide">1 JANUARY 2008</div>
            </div>

            <div className="border-b border-zinc-800 pb-2">
              <div className="text-xs text-zinc-500 mb-1">ID NUMBER</div>
              <div className="text-sm tracking-widest">NGL-12345-TBH-67890-IDK</div>
            </div>

            <div className="border-b border-zinc-800 pb-2">
              <div className="text-xs text-zinc-500 mb-1">ADDRESS</div>
              <div className="text-sm tracking-wide">SANTA CLAUS, NORTH POLE, H0H 0H0, CANADA</div>
            </div>

            <div className="border-b border-zinc-800 pb-2">
              <div className="text-xs text-zinc-500 mb-1">PHONE</div>
              <div className="text-sm tracking-wide">+91 100 112 100</div>
            </div>

            <div className="border-b border-zinc-800 pb-2">
              <div className="text-xs text-zinc-500 mb-1">EMAIL</div>
              <div className="text-sm tracking-wide">rohitSharma@gmail.com</div>
            </div>
          </div>

          {/* GPS TRACKING SYSTEM */}
          <div className="mt-6 pt-4 border-t-2 border-zinc-700">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-400 tracking-wider font-semibold">
                  GPS TRACKING SYSTEM
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${locationStatus === 'off-campus' || locationStatus === 'error' ? 'bg-red-500 animate-pulse' : locationStatus === 'loading' ? 'bg-sky-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className="text-xs text-zinc-500">{locationStatus === 'error' ? 'ERROR' : locationStatus === 'loading' ? 'WAITING' : 'ACTIVE'}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`${getStatusBg()} border border-zinc-700 rounded-lg p-3`}>
                <div className="flex justify-between items-center">
                  <div className={`text-xs font-bold tracking-widest ${getStatusColor()}`}>
                    {getStatusText()}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {locationStatus !== 'loading' && locationStatus !== 'error' ? `${distance.toFixed(0)}m from campus` : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-zinc-900 border border-zinc-800 rounded p-2">
                  <div className="text-[10px] text-zinc-500 mb-1">LATITUDE</div>
                  <div className="text-xs text-white font-mono">{coordinates.lat.toFixed(6)}</div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded p-2">
                  <div className="text-[10px] text-zinc-500 mb-1">LONGITUDE</div>
                  <div className="text-xs text-white font-mono">{coordinates.lng.toFixed(6)}</div>
                </div>
              </div>

              {/* School Location Reference */}
              <div className="bg-zinc-900 border border-zinc-800 rounded p-2">
                <div className="text-[10px] text-zinc-500 mb-1">CAMPUS CENTER</div>
                <div className="text-[10px] text-zinc-600 font-mono">
                  {SCHOOL_LAT.toFixed(6)}, {SCHOOL_LNG.toFixed(6)}
                </div>
                <div className="text-[9px] text-zinc-700 mt-1">
                  Crossroads International School, Udaipur
                </div>
              </div>

              {/* Last Update */}
              <div className="flex items-center justify-between text-[10px] text-zinc-600">
                <span>LAST UPDATE</span>
                <span className="font-mono">{locationStatus === 'loading' ? 'N/A' : lastUpdate.toLocaleTimeString()}</span>
              </div>

              {/* Warning/Error Banners */}
              {locationStatus === 'off-campus' && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 animate-pulse">
                  <div className="text-xs text-red-400 font-bold tracking-wide">
                    ⚠ STUDENT LEFT SCHOOL PREMISES
                  </div>
                  <div className="text-[10px] text-red-500 mt-1">
                    Alert sent to administration & guardians
                  </div>
                </div>
              )}

              {locationStatus === 'boundary' && (
                <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-3">
                  <div className="text-xs text-yellow-400 font-bold tracking-wide">
                    ⚠ APPROACHING BOUNDARY
                  </div>
                  <div className="text-[10px] text-yellow-500 mt-1">
                    Student near school perimeter (100m - 200m)
                  </div>
                </div>
              )}

              {locationStatus === 'error' && (
                <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
                  <div className="text-xs text-red-400 font-bold tracking-wide">
                    🔴 GEOLOCATION ERROR
                  </div>
                  <div className="text-[10px] text-red-500 mt-1">
                    {geoError || 'Cannot get current location. Check device settings and permissions.'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Popup Modal (Remains the same) */}
      {showSchedule && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={() => setShowSchedule(false)}
        >
          <div 
            className="bg-zinc-900 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-sans text-white tracking-wider">TODAY'S SCHEDULE</h2>
              <button 
                onClick={() => setShowSchedule(false)}
                className="text-zinc-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div 
                  key={index}
                  className={`border-l-4 ${
                    item.subject === 'BREAK' 
                      ? 'border-zinc-600 bg-zinc-800' 
                      : 'border-zinc-700 bg-zinc-800'
                  } p-4 rounded-r`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-sm text-white font-medium tracking-wide">
                      {item.subject}
                    </div>
                    <div className="text-xs text-zinc-400">{item.time}</div>
                  </div>
                  {item.teacher && (
                    <div className="text-xs text-zinc-500 mt-1">{item.teacher}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-700 text-center text-xs text-zinc-500">
              Wednesday, October 15, 2025
            </div>
          </div>
        </div>
      )}
    </div>
  );
}