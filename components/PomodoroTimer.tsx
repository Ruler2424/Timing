'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

type Mode = 'work' | 'shortBreak' | 'longBreak';
const TIMES: Record<Mode, number> = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState(TIMES.work);
  const [isActive, setIsActive] = useState(false);
  const [pomodoros, setPomodoros] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const switchMode = useCallback((newMode: Mode) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(TIMES[newMode]);
  }, []);

  useEffect(() => {
  if (isActive && timeLeft > 0) {
    intervalRef.current = window.setInterval(() => setTimeLeft(t => t - 1), 1000);
  } else if (timeLeft === 0) {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    audioRef.current?.play().catch(console.error);

    if (mode === 'work') {
      const next = pomodoros + 1;
      setPomodoros(next);
      switchMode(next % 4 === 0 ? 'longBreak' : 'shortBreak');
    } else {
      switchMode('work');
    }
  }
  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [isActive, timeLeft, mode, pomodoros, switchMode]);


  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const ModeButton = ({ m, label }: { m: Mode; label: string }) => (
    <button
      onClick={() => switchMode(m)}
      className={`px-2 py-1.5 rounded-full text-sm font-medium transition-colors ${
        mode === m ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64">
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3" />
      <div>
        <h3 className="font-semibold text-slate-800 mb-1 text-lg">Pomodoro Timer</h3>
        <div className="flex flex-wrap justify-center gap-1">
          <ModeButton m="work" label="Work" />
          <ModeButton m="shortBreak" label="Short Break" />
          <ModeButton m="longBreak" label="Long Break" />
        </div>
      </div>
      <div className="text-center">
        <p className="font-digital text-6xl text-slate-800 tracking-wider">{formatTime(timeLeft)}</p>
      </div>
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`w-3/4 py-1 rounded-lg text-white font-bold text-5l tracking-wider transition-colors ${
            isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          aria-label={isActive ? 'Pause timer' : 'Start timer'}
        >
          {isActive ? 'PAUSE' : 'START'}
        </button>
        <div className="w-full flex justify-between items-center text-xs px-2">
          <span className="text-slate-500 truncate w-1/2 text-sm">Pomodoros: {pomodoros}</span>
          <button
            onClick={() => {
              if (intervalRef.current) clearInterval(intervalRef.current);
              setIsActive(false);
              setPomodoros(0);
              switchMode('work');
            }}
            className="text-slate-500 hover:text-slate-800 font-medium transition-colors text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
