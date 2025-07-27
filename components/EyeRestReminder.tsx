// components/EyeRestReminder.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { EyeIcon } from './icons.tsx';

const WORK_INTERVAL = 20 * 60; // 20 minutes
const REST_INTERVAL = 20; // 20 seconds

const EyeRestReminder = () => {
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'work' | 'rest'>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_INTERVAL);
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (!isActive) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                // Time to switch mode
                audioRef.current?.play().catch(e => console.error("Audio failed", e));
                if (mode === 'work') {
                    setMode('rest');
                    return REST_INTERVAL;
                } else {
                    setMode('work');
                    return WORK_INTERVAL;
                }
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, mode]);

    const handleToggle = () => {
        setIsActive(prev => {
            const nextIsActive = !prev;
            if (nextIsActive) {
                setMode('work');
                setTimeLeft(WORK_INTERVAL);
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            return nextIsActive;
        });
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64 transition-colors ${mode === 'rest' && isActive ? 'bg-green-100' : 'bg-white'}`}>
             <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-positive-notification-951.mp3" />
            <div className="flex justify-between items-start">
                <h3 className="font-semibold text-slate-800">Eye Rest Reminder</h3>
                <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isActive} onChange={handleToggle} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center flex-grow">
                 <EyeIcon className={`w-16 h-16 mb-2 ${mode === 'rest' && isActive ? 'text-green-500 animate-pulse' : 'text-slate-400'}`} />
                 {mode === 'rest' && isActive ? (
                     <div>
                        <p className="font-bold text-green-700 text-lg">Time to rest!</p>
                        <p className="text-green-600 truncate max-w-xs">Look 20 feet away for {timeLeft} seconds.</p>
                     </div>
                 ) : (
                     <div>
                        <p className="font-semibold text-slate-700">Next break in:</p>
                        <p className="font-digital text-4xl text-slate-600">{isActive ? formatTime(timeLeft) : 'Paused'}</p>
                     </div>
                 )}
            </div>
            <p className="text-xs text-slate-400 text-center truncate">Follow the 20-20-20 rule to reduce eye strain.</p>
        </div>
    );
};

export default EyeRestReminder;