import React, { useState, useEffect } from 'react';
import { MoonIcon } from './icons.tsx';
import { useCurrentTime } from '../hooks/useCurrentTime.ts';

const FALL_ASLEEP_TIME = 15 * 60 * 1000; // 15 minutes in ms
const SLEEP_CYCLE_TIME = 90 * 60 * 1000; // 90 minutes in ms

const SleepCycleCalculator = () => {
    const now = useCurrentTime();
    const [wakeUpTimes, setWakeUpTimes] = useState<Date[]>([]);

    useEffect(() => {
        const calculateWakeUpTimes = () => {
            const startTime = now.getTime() + FALL_ASLEEP_TIME;
            const times = Array.from({ length: 6 }, (_, i) => {
                const cycleCount = i + 1;
                return new Date(startTime + (cycleCount * SLEEP_CYCLE_TIME));
            });
            setWakeUpTimes(times);
        };
        calculateWakeUpTimes();
    }, [now]);

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date);
    };

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64">
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Sleep Calculator</h3>
                <MoonIcon className="w-6 h-6 text-blue-500" />
            </div>

            <div className="flex-grow flex flex-col justify-center text-center">
                <p className="text-slate-600 mb-2">Go to bed now to wake up fresh at:</p>
                <div className="grid grid-cols-3 gap-2">
                    {wakeUpTimes.slice(0, 6).map((time, index) => (
                        <button 
                            key={index} 
                            className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-2 px-2 rounded-lg transition-colors"
                            aria-label={`Wake up at ${formatTime(time)}`}
                        >
                            {formatTime(time)}
                        </button>
                    ))}
                </div>
            </div>

            <p className="text-xs text-slate-400 text-center">
                Calculations are based on 90-minute sleep cycles.
            </p>
        </div>
    );
};

export default SleepCycleCalculator;