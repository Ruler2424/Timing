import React, { useState, useEffect, useRef } from 'react';
import { CoffeeIcon } from './icons.tsx';

const DistractionTracker = () => {
    const [isDistracted, setIsDistracted] = useState(false);
    const [distractionTime, setDistractionTime] = useState(0);
    const [totalDistractionTime, setTotalDistractionTime] = useState(0);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isDistracted) {
            const startTime = Date.now() - distractionTime;
            intervalRef.current = window.setInterval(() => {
                setDistractionTime(Date.now() - startTime);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isDistracted]);

    const handleToggleDistraction = () => {
        setIsDistracted(prev => {
            const nowDistracted = !prev;
            if (!nowDistracted) { // Stopped being distracted
                setTotalDistractionTime(total => total + distractionTime);
                setDistractionTime(0);
            }
            return nowDistracted;
        });
    };

    const formatDuration = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between items-center shadow-lg h-64">
            <h3 className="font-semibold text-slate-800 self-start">Distraction Tracker</h3>

            <div className="flex flex-col items-center justify-center text-center">
                <CoffeeIcon className={`w-16 h-16 mb-2 transition-colors ${isDistracted ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`} />
                {isDistracted ? (
                    <>
                        <p className="font-digital text-4xl text-amber-600">{formatDuration(distractionTime)}</p>
                        <p className="text-sm text-slate-500">Currently distracted</p>
                    </>
                ) : (
                    <>
                        <p className="text-lg text-slate-700">Focused</p>
                         <p className="text-sm text-slate-400">Press button to track</p>
                    </>
                )}
            </div>

            <div className="w-full flex flex-col items-center gap-2">
                 <p className="text-xs text-slate-500">
                    Total distraction today: {formatDuration(totalDistractionTime)}
                </p>
                <button
                    onClick={handleToggleDistraction}
                    className={`w-full py-2 rounded-lg text-white font-bold transition-colors ${isDistracted ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-500 hover:bg-amber-600'}`}
                >
                    {isDistracted ? "I'm Back!" : "I'm Distracted"}
                </button>
            </div>
        </div>
    );
};

export default DistractionTracker;