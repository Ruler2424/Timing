// components/Stopwatch.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [laps, setLaps] = useState<number[]>([]);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive) {
            const startTime = Date.now() - time;
            intervalRef.current = window.setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const handleStart = () => setIsActive(true);
    const handleStop = () => setIsActive(false);
    const handleLap = () => setLaps([time, ...laps]);
    const handleReset = () => {
        setIsActive(false);
        setTime(0);
        setLaps([]);
    };

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        const centiseconds = Math.floor((milliseconds % 1000) / 10).toString().padStart(2, '0');
        return `${minutes}:${seconds}.${centiseconds}`;
    };

    const seconds = (time / 1000) % 60;
    const secondHandRotation = (seconds / 60) * 360;

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-around shadow-lg h-64">
            <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-2 border border-slate-200 rounded-full"></div>
                 {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 30}deg)` }}>
                        <div className="absolute top-1 left-1/2 -ml-px w-px h-2 bg-slate-400"></div>
                    </div>
                ))}
                <div className="absolute w-full h-full flex justify-center items-center" style={{ transform: `rotate(${secondHandRotation}deg)`, transition: 'transform 0.1s linear' }}>
                    <div className="w-0.5 h-10 bg-blue-500 rounded-full origin-bottom" style={{ transform: 'translateY(-50%)' }}></div>
                </div>
                 <div className="absolute top-1/2 left-1/2 -mt-1 -ml-1 w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
             <p className="font-digital text-xl text-slate-500">{formatTime(time)}</p>
            <div className="flex gap-4">
                {isActive ? (
                    <button onClick={handleStop} className="w-20 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-2 px-4 rounded-full transition-colors">
                        Stop
                    </button>
                ) : (
                    <button onClick={handleStart} className="w-20 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors">
                        Start
                    </button>
                )}
                <button onClick={handleLap} disabled={!isActive} className="w-20 border border-slate-300 hover:bg-slate-100 text-slate-600 font-semibold py-2 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Lap
                </button>
                 <button onClick={handleReset} className="w-20 border border-slate-300 hover:bg-slate-100 text-slate-600 font-semibold py-2 px-4 rounded-full transition-colors">
                    Reset
                </button>
            </div>
            {laps.length > 0 && (
                <div className="text-xs text-slate-400 font-mono self-start w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    Last Lap: {formatTime(laps[0]??4)}
                </div>
            )}
        </div>
    );
};


export default Stopwatch;