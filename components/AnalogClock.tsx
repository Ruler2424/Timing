// components/AnalogClock.tsx
'use client'
import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';

const AnalogClock = () => {
  const currentTime = useCurrentTime();

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const secondDeg = (seconds / 60) * 360 + 90;
  const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  const hourDeg = (hours / 12) * 360 + (minutes / 60) * 30 + 90;

  return (
    <div className="bg-white rounded-2xl p-6 flex items-center justify-center shadow-lg h-64">
      <div className="w-48 h-48 relative">
        {/* Clock face markings */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-sm font-semibold text-slate-600">12</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-sm font-semibold text-slate-600">6</span>
        <span className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 text-sm font-semibold text-slate-600">9</span>
        <span className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 text-sm font-semibold text-slate-600">3</span>
        
        {/* Hour Hand */}
        <div className="absolute top-1/2 left-1/2 w-1/4 h-1 bg-slate-800 rounded-full transform origin-left" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
        {/* Minute Hand */}
        <div className="absolute top-1/2 left-1/2 w-1/3 h-1 bg-slate-600 rounded-full transform origin-left" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
        {/* Second Hand */}
        <div className="absolute top-1/2 left-1/2 w-2/5 h-0.5 bg-blue-500 rounded-full transform origin-left" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-800 rounded-full"></div>
      </div>
    </div>
  );
};

export default AnalogClock;