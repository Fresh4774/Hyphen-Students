'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [tapCount, setTapCount] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [tagClicked, setTagClicked] = useState(false);
  const [tapTimer, setTapTimer] = useState<NodeJS.Timeout | null>(null);
  const [showSchedule, setShowSchedule] = useState(false);
  
  // GPS Tracking State
  const [locationStatus, setLocationStatus] = useState<'on-campus' | 'off-campus' | 'boundary'>('on-campus');
  const [coordinates, setCoordinates] = useState({ lat: 26.9124, lng: 75.7873 }); // Jaipur coordinates
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate GPS movement
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate random movement (small changes to coordinates)
      setCoordinates(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001
      }));

      // Randomly change status (for demo purposes)
      const random = Math.random();
      if (random > 0.95) {
        setLocationStatus('off-campus');
      } else if (random > 0.90) {
        setLocationStatus('boundary');
      } else {
        setLocationStatus('on-campus');
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
    }
  };

  const getStatusBg = () => {
    switch (locationStatus) {
      case 'on-campus': return 'bg-green-900/30';
      case 'boundary': return 'bg-yellow-900/30';
      case 'off-campus': return 'bg-red-900/30';
    }
  };

  const getStatusText = () => {
    switch (locationStatus) {
      case 'on-campus': return 'ON CAMPUS';
      case 'boundary': return 'NEAR BOUNDARY';
      case 'off-campus': return 'OFF CAMPUS - ALERT';
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
              <div className="text-sm tracking-wide">1 JANUATY 2008</div>
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
                  <div className={`w-2 h-2 rounded-full ${locationStatus === 'off-campus' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span className="text-xs text-zinc-500">ACTIVE</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`${getStatusBg()} border border-zinc-700 rounded-lg p-3`}>
                <div className={`text-xs font-bold tracking-widest ${getStatusColor()}`}>
                  {getStatusText()}
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

              {/* Last Update */}
              <div className="flex items-center justify-between text-[10px] text-zinc-600">
                <span>LAST UPDATE</span>
                <span className="font-mono">{lastUpdate.toLocaleTimeString()}</span>
              </div>

              {/* Warning Banner */}
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
                    Student near school perimeter
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Popup Modal */}
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