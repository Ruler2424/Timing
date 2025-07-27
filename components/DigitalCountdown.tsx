// components/DigitalCountdown.tsx
'use client'
import React, { useState, useEffect } from 'react';

const TimeBox = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 bg-slate-200/50 rounded-lg flex items-center justify-center">
      <span className="font-digital text-4xl text-slate-800">{value}</span>
    </div>
    <span className="text-xs text-slate-500 mt-2 truncate">{label}</span>
  </div>
);

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const DigitalCountdown = () => {
    const calculateTimeLeft = (): TimeLeft => {
        const year = new Date().getFullYear();
        const difference = +new Date(`01/01/${year + 1}`) - +new Date();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };
    
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents: { value: number, label: string }[] = [
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64">
            <h3 className="font-semibold text-slate-800">New Year Countdown</h3>
            <div className="flex justify-around items-center">
                {timerComponents.map(component => (
                    <TimeBox
                        key={component.label}
                        value={(component.value).toString().padStart(2, '0')}
                        label={component.label}
                    />
                ))}
            </div>
            <div className="text-center text-slate-400 text-sm truncate">
                Until January 1, {new Date().getFullYear() + 1}
            </div>
        </div>
    );
};

export default DigitalCountdown;