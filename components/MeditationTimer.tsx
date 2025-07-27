// components/MeditationTimer.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { BellIcon } from './icons.tsx';

const MeditationTimer = () => {
    const [duration, setDuration] = useState(300);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            audioRef.current?.play().catch(e => console.error("Audio failed", e));
            setIsActive(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);

    useEffect(() => {
        setTimeLeft(duration);
        setIsActive(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, [duration]);

    const handleStartStop = () => setIsActive(!isActive);

    const handleReset = () => {
        setIsActive(false);
        setTimeLeft(duration);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const progress = ((duration - timeLeft) / duration) * 100;

    const DurationButton = ({ minutes }: { minutes: number }) => {
        const seconds = minutes * 60;
        return (
            <button
                onClick={() => setDuration(seconds)}
                disabled={isActive}
                className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors 
                    ${duration === seconds && !isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
            >
                {minutes} min
            </button>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-3 flex flex-col items-center justify-between shadow-md h-64 relative">
            <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-notification-bell-2359.mp3" />

            <h3 className="font-semibold text-slate-800 text-sm self-start">Meditation Timer</h3>

            <div className="flex justify-center gap-1 mb-1">
                <DurationButton minutes={5} />
                <DurationButton minutes={10} />
                <DurationButton minutes={15} />
            </div>

            <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-slate-200" strokeWidth="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                    <circle
                        className="text-blue-500"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 45}
                        strokeDashoffset={(2 * Math.PI * 45) * (1 - progress / 100)}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        style={{
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%',
                            transition: 'stroke-dashoffset 1s linear'
                        }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    {timeLeft === 0 && !isActive ? 
                        <BellIcon className="w-8 h-8 text-blue-500" /> 
                        : 
                        <p className="font-digital text-2xl text-slate-700">{formatTime(timeLeft)}</p>
                    }
                </div>
            </div>

            <div className="w-full flex justify-between items-center gap-2 mt-1">
                <button 
                    onClick={handleStartStop}
                    className={`flex-1 py-1 text-sm rounded-full font-semibold transition-colors 
                        ${isActive ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>

                <button 
                    onClick={handleReset} 
                    className="w-20 border border-slate-300 hover:bg-slate-100 text-slate-600 text-sm font-medium py-1 rounded-full transition-colors"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default MeditationTimer;