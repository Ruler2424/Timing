// components/CountdownTimer.tsx
'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { TrashIcon } from './icons.tsx';
import { useAudioPlayer } from '../utils/sounds/playSound.tsx';

interface CountdownTimerProps {
    countdownSoundSrc?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ countdownSoundSrc = '/sounds/htc_basic.mp3' }) => {
  const [initialTimeInput, setInitialTimeInput] = useState({ hours: 0, minutes: 5, seconds: 0 });
  const [initialTime, setInitialTime] = useState(initialTimeInput.minutes * 60);
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const { play, stop, isPlaying } = useAudioPlayer();

  const safeSetTimeLeft = useCallback((time: number) => {
    setTimeLeft(Math.max(0, time));
  }, []);

  useEffect(() => {
    const totalSeconds = initialTimeInput.hours * 3600 + initialTimeInput.minutes * 60 + initialTimeInput.seconds;
    setInitialTime(totalSeconds);
    if (!isActive) {
      safeSetTimeLeft(totalSeconds);
    }
  }, [initialTimeInput, isActive, safeSetTimeLeft]);

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsActive(false);
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (!isPlaying(countdownSoundSrc)) {
        play(countdownSoundSrc)
          .catch(e => {
              console.error("Error playing sound in CountdownTimer:", e);
          });
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, play, isPlaying, countdownSoundSrc]);

  const handleStartStop = useCallback(() => {
    if (timeLeft === 0) {
        safeSetTimeLeft(initialTime);
        if (isPlaying(countdownSoundSrc)) {
            stop(countdownSoundSrc);
        }
    }
    setIsActive(prev => !prev);
  }, [timeLeft, initialTime, isPlaying, stop, safeSetTimeLeft, countdownSoundSrc]);

  const handleReset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setTimeLeft(initialTime);
    if (isPlaying(countdownSoundSrc)) {
        stop(countdownSoundSrc);
    }
  }, [initialTime, isPlaying, stop, countdownSoundSrc]);
  
  const handleTimeInputChange = useCallback((unit: 'hours' | 'minutes' | 'seconds', e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    const maxValue = unit === 'hours' ? 23 : 59; 

    if (!isNaN(value) && value >= 0) {
      setInitialTimeInput(prev => ({
        ...prev,
        [unit]: Math.min(value, maxValue)
      }));
    } else if (e.target.value === '') {
      setInitialTimeInput(prev => ({
        ...prev,
        [unit]: 0
      }));
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, []);

  const progress = initialTime === 0 ? 0 : (timeLeft / initialTime) * 100;
  const isIdle = !isActive && timeLeft === initialTime;

  return (
    <div className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64 text-white transition-colors ${isActive ? (timeLeft > 0 && timeLeft <= initialTime/2 ? 'bg-red-500' : 'bg-green-500') : 'bg-slate-700'}`}>
      <h3 className="font-semibold">Countdown</h3>
      <div className="text-center">
        <p className="text-xl font-bold uppercase tracking-widest">{isActive ? (timeLeft > 0 ? 'Running' : 'Finished') : 'Paused'}</p>
        <p className="font-digital text-6xl tracking-wider">{formatTime(timeLeft)}</p>
      </div>
      
      {isIdle ? (
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <label className="block mb-1">Hours</label>
            <input 
              type="number" 
              value={initialTimeInput.hours}
              onChange={(e) => handleTimeInputChange('hours', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0" max="23" aria-label="Set countdown hours" disabled={isActive}
            />
          </div>
           <div>
            <label className="block mb-1">Minutes</label>
            <input 
              type="number" 
              value={initialTimeInput.minutes}
              onChange={(e) => handleTimeInputChange('minutes', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0" max="59" aria-label="Set countdown minutes" disabled={isActive}
            />
          </div>
           <div>
            <label className="block mb-1">Seconds</label>
            <input 
              type="number" 
              value={initialTimeInput.seconds}
              onChange={(e) => handleTimeInputChange('seconds', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0" max="59" aria-label="Set countdown seconds" disabled={isActive}
            />
          </div>
        </div>
      ) : (
        <div className="h-14"></div>
      )}
      
      <div className="flex gap-4">
        {isIdle ? (
          <button onClick={handleStartStop} className="w-full bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">START</button>
        ) : (
          <>
            <button onClick={handleStartStop} className="w-1/2 bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">{isActive ? 'Pause' : 'Resume'}</button>
            <button onClick={handleReset} className="w-1/2 bg-white/30 hover:bg-white/40 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">RESET</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;