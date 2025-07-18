import React from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime.ts';
import { City } from '../types.ts';
import { SearchIcon } from './icons.tsx';

const cities: City[] = [
  { name: 'Tijuana', timeZone: 'America/Tijuana' },
  { name: 'New York', timeZone: 'America/New_York' },
  { name: 'London', timeZone: 'Europe/London' },
  { name: 'Paris', timeZone: 'Europe/Paris' },
  { name: 'Ankara', timeZone: 'Europe/Istanbul' },
  { name: 'Dubai', timeZone: 'Asia/Dubai' },
  { name: 'Dhaka', timeZone: 'Asia/Dhaka' },
  { name: 'Beijing', timeZone: 'Asia/Shanghai' },
  { name: 'Moscow', timeZone: 'Europe/Moscow' },
  { name: 'Chicago', timeZone: 'America/Chicago' },
  { name: 'Tokyo', timeZone: 'Asia/Tokyo' },
];


const WorldClock = () => {
  const currentTime = useCurrentTime();

  const mainCity = cities[1];
  const otherCities = [cities[0], cities[2], cities[3], cities[4], cities[5], cities[6], cities[8], cities[9], cities[7], cities[10]];

  const formatTime = (date: Date, timeZone: string, options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat('en-US', { ...options, timeZone }).format(date);
  };
  
  return (
    <div className="bg-slate-800 text-white rounded-2xl p-6 flex flex-col shadow-lg h-64">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-4xl font-light tracking-wide">{formatTime(currentTime, mainCity.timeZone, { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
          <p className="text-slate-400">{mainCity.name}</p>
        </div>
        <button className="text-slate-400 hover:text-white transition-colors"><SearchIcon className="w-6 h-6"/></button>
      </div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm flex-grow">
        {otherCities.map(city => (
            <div key={city.name}>
                <p className="text-slate-400">{city.name.substring(0,5).toUpperCase()}</p>
                <p>{formatTime(currentTime, city.timeZone, { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default WorldClock;