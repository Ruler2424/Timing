// components/FocusTimer.tsx
'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioPlayer } from '../utils/sounds/playSound'; // Correct path assumed
import useSound from 'use-sound';

interface FocusTimerProps {
    startSoundSrc?: string;
    endSoundSrc?: string;
}

const FocusTimer: React.FC<FocusTimerProps> = ({
    startSoundSrc = '/sounds/htc_basic.mp3',
    endSoundSrc = '/sounds/htc_basic.mp3',
}) => {
    const [duration, setDuration] = useState(3600); // Default 60 minutes
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const { play, stop, isPlaying } = useAudioPlayer(); // This `isPlaying` should work
    const [playEndSound, { stop: stopEndSound, isPlaying: isEndSoundPlaying }] = useSound(endSoundSrc, {
        volume: 0.7,
        loop: false,
    });

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            playEndSound();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, playEndSound]);

    useEffect(() => {
        if (!isActive) {
            setTimeLeft(duration);
        }
    }, [duration, isActive]);

    const handleStart = useCallback(() => {
        if (timeLeft === 0 && duration > 0) {
            setTimeLeft(duration);
        }
        setIsActive(true);
        play(startSoundSrc);
    }, [timeLeft, duration, play, startSoundSrc]);

    const handleStop = useCallback(() => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        if (isPlaying(startSoundSrc)) { // This line specifically mentioned in error
            stop(startSoundSrc);
        }
        if (isEndSoundPlaying) {
            stopEndSound();
        }
    }, [stop, startSoundSrc, stopEndSound, isPlaying, isEndSoundPlaying]);

    const formatTime = useCallback((seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }, []);

    const DurationButton = ({ minutes }: { minutes: number }) => (
        <button
            onClick={() => {
                setDuration(minutes * 60);
                if (!isActive) {
                    setTimeLeft(minutes * 60);
                }
            }}
            disabled={isActive}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
                duration === minutes * 60 && !isActive ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
        >
            {minutes} min
        </button>
    );

    return (
        <div className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64 text-white transition-colors ${isActive ? 'bg-indigo-600' : 'bg-slate-700'}`}>
            <h3 className="font-semibold">Focus Session</h3>

            {isActive || timeLeft === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <p className="font-digital text-5xl tracking-wider">{formatTime(timeLeft)}</p>
                    <p className="opacity-70 truncate">
                        {timeLeft > 0 ? 'Stay focused...' : 'Session Ended!'}
                    </p>
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <p className="text-lg mb-4">Select duration and begin.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <DurationButton minutes={30} />
                        <DurationButton minutes={60} />
                        <DurationButton minutes={90} />
                    </div>
                </div>
            )}

            <div className="w-full">
                {isActive ? (
                    <button onClick={handleStop} className="w-full bg-white/30 hover:bg-white/40 font-bold py-3 rounded-lg">
                        STOP
                    </button>
                ) : (
                    <button
                        onClick={handleStart}
                        className="w-full bg-white/90 hover:bg-white text-indigo-700 font-bold py-3 rounded-lg"
                        disabled={duration === 0}
                    >
                        BEGIN FOCUS
                    </button>
                )}
            </div>
        </div>
    );
};

export default FocusTimer;