import React, { useState, useEffect, useRef } from 'react';
import { TrashIcon } from './icons.tsx';

const CountdownTimer = () => {
  const [initialTime, setInitialTime] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);

  const handleStartStop = () => {
    if (timeLeft === 0) {
        setTimeLeft(initialTime);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(initialTime);
  };
  
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseInt(e.target.value, 10) * 60;
    setInitialTime(newTime);
    if (!isActive) {
        setTimeLeft(newTime);
    }
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const progress = (timeLeft / initialTime) * 100;

  return (
    <div className="bg-[#4A6FA5] text-white rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64">
      <h3 className="font-semibold">Countdown</h3>
      <div className="text-center">
        <p className="font-digital text-6xl tracking-wider">{formatTime(timeLeft)}</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <input 
            type="number"
            defaultValue={5}
            onChange={handleTimeChange}
            className="w-20 bg-white/20 text-white placeholder-white/70 rounded-md p-1 text-center"
            min="1"
            aria-label="Set countdown minutes"
            disabled={isActive}
          />
          <span className="text-sm">minutes</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleStartStop} className="bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full transition-colors w-28 text-center">
            {isActive ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}
          </button>
          <div className="w-full bg-white/20 rounded-full h-2.5">
            <div className="bg-white h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s linear' }}></div>
          </div>
          <button onClick={handleReset} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;