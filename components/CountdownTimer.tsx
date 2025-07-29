'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioPlayer } from '../utils/sounds/playSound';
import useSound from 'use-sound';

interface CountdownTimerProps {
  countdownSoundSrc?: string;
  endMusicSrc?: string; // в вашем коде пока не используется, но можно добавить
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  countdownSoundSrc = '/sounds/htc_basic.mp3',
}) => {
  const [initialTimeInput, setInitialTimeInput] = useState({ hours: 0, minutes: 5, seconds: 0 });
  const [initialTime, setInitialTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const { play, stop, isPlaying } = useAudioPlayer();

  // useSound возвращает массив: [playFunction, { stop, sound, pause, ... }]
  const [endMusicPlay, { stop: stopEndMusic, sound }] = useSound(countdownSoundSrc, {
    volume: 0.5,
    loop: false,
  });

  // Проверяем, играет ли звук через sound.playing()
  const isEndMusicPlaying = sound?.playing ? sound.playing() : false;

  useEffect(() => {
    const totalSeconds =
      initialTimeInput.hours * 3600 + initialTimeInput.minutes * 60 + initialTimeInput.seconds;
    setInitialTime(totalSeconds);
    if (!isActive && !isFinished) {
      setTimeLeft(totalSeconds);
    }
  }, [initialTimeInput, isActive, isFinished]);

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
      setIsFinished(true);
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Воспроизведение звука из вашего кастомного плеера
      play(countdownSoundSrc).catch((e) => {
        console.error('Error playing countdown sound:', e);
      });

      // Воспроизведение звука из useSound
      endMusicPlay();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, play, countdownSoundSrc, endMusicPlay]);

  const handleStartStop = useCallback(() => {
    if (timeLeft === 0 && !isActive && !isFinished) {
      setTimeLeft(initialTime);
      setIsActive(true);
    } else if (isFinished) {
      console.warn("Attempted to start/pause a finished timer without reset.");
      return;
    } else {
      setIsActive((prev) => !prev);
    }
  }, [timeLeft, isActive, isFinished, initialTime]);

  const handleReset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(initialTime);

    if (isPlaying(countdownSoundSrc)) stop(countdownSoundSrc);
    stopEndMusic();
  }, [initialTime, isPlaying, stop, stopEndMusic, countdownSoundSrc]);

  const handleStopMusic = useCallback(() => {
    stopEndMusic();
    setIsFinished(false);
  }, [stopEndMusic]);

  const handleTimeInputChange = useCallback(
    (unit: 'hours' | 'minutes' | 'seconds', e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      const maxValue = unit === 'hours' ? 23 : 59;

      if (!isNaN(value) && value >= 0) {
        setInitialTimeInput((prev) => ({
          ...prev,
          [unit]: Math.min(value, maxValue),
        }));
      } else if (e.target.value === '') {
        setInitialTimeInput((prev) => ({
          ...prev,
          [unit]: 0,
        }));
      }
    },
    []
  );

  const formatTime = useCallback((seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  }, []);

  const isIdle = !isActive && timeLeft === initialTime && !isFinished;
  const isPaused = !isActive && timeLeft !== initialTime && !isFinished;

  return (
    <div
      className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64 text-white transition-colors ${
        isActive
          ? timeLeft > 0 && timeLeft <= initialTime / 2
            ? 'bg-red-500'
            : 'bg-green-500'
          : 'bg-slate-700'
      }`}
    >
      <h3 className="font-semibold">Countdown</h3>
      <div className="text-center">
        <p className="mb-3 text-l font-bold uppercase tracking-widest">
          {isFinished ? 'Finished' : isActive ? 'Running' : isPaused ? 'Paused' : 'Stopped'}
        </p>
        <p className="font-digital text-5xl tracking-wider">{formatTime(timeLeft)}</p>
      </div>

      {isIdle ? (
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div>
            <label className="block mb-0">Hours</label>
            <input
              type="number"
              value={initialTimeInput.hours}
              onChange={(e) => handleTimeInputChange('hours', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0"
              max="23"
              disabled={isActive}
            />
          </div>
          <div>
            <label className="block mb-0">Minutes</label>
            <input
              type="number"
              value={initialTimeInput.minutes}
              onChange={(e) => handleTimeInputChange('minutes', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0"
              max="59"
              disabled={isActive}
            />
          </div>
          <div>
            <label className="block mb-0">Seconds</label>
            <input
              type="number"
              value={initialTimeInput.seconds}
              onChange={(e) => handleTimeInputChange('seconds', e)}
              className="w-16 bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
              min="0"
              max="59"
              disabled={isActive}
            />
          </div>
        </div>
      ) : (
        <div className="h-14"></div>
      )}

      <div className="flex gap-4">
        {isIdle ? (
          <button
            onClick={handleStartStop}
            className="w-full bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            disabled={initialTime === 0}
          >
            START
          </button>
        ) : isFinished && isEndMusicPlaying ? (
          <button
            onClick={handleStopMusic}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            STOP MUSIC
          </button>
        ) : (
          <>
            <button
              onClick={handleStartStop}
              className="w-1/2 bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              {isActive ? 'Pause' : 'Resume'}
            </button>
            <button
              onClick={handleReset}
              className="w-1/2 bg-white/30 hover:bg-white/40 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            >
              RESET
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
