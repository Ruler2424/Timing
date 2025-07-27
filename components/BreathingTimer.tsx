// components/BreathingTimer.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';

const PHASES = [
    { name: 'Breathe In', duration: 4 },
    { name: 'Hold', duration: 4 },
    { name: 'Breathe Out', duration: 4 },
    { name: 'Hold', duration: 4 },
];

const BreathingTimer = () => {
    const [isActive, setIsActive] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [timeLeftInPhase, setTimeLeftInPhase] = useState(PHASES[0].duration);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isActive) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        intervalRef.current = window.setInterval(() => {
            setTimeLeftInPhase(prev => {
                if (prev > 1) {
                    return prev - 1;
                }
                // Time for next phase
                const nextPhaseIndex = (phaseIndex + 1) % PHASES.length;
                setPhaseIndex(nextPhaseIndex);
                return PHASES[nextPhaseIndex].duration;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, phaseIndex]);

    const handleStartStop = () => {
        if (isActive) {
            setIsActive(false);
            setPhaseIndex(0);
            setTimeLeftInPhase(PHASES[0].duration);
        } else {
            setIsActive(true);
        }
    };
    
    const currentPhase = PHASES[phaseIndex];
    const isBreathingIn = currentPhase.name === 'Breathe In';

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg h-64">
            <h3 className="font-semibold text-slate-800 self-start">Box Breathing</h3>
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className={`absolute bg-blue-200 rounded-full transition-all duration-1000 ease-in-out ${isActive ? (isBreathingIn ? 'w-28 h-28' : 'w-16 h-16') : 'w-16 h-16'}`}></div>
                    <div className="relative z-10 text-center">
                         <p className="font-semibold text-xl text-slate-700">
                             {isActive ? currentPhase.name : 'Ready?'}
                         </p>
                         {isActive && <p className="font-digital text-4xl text-slate-600">{timeLeftInPhase}</p>}
                    </div>
                </div>
            </div>
            <button 
                onClick={handleStartStop} 
                className="w-3/4 py-2 rounded-full text-white font-bold transition-colors bg-blue-500 hover:bg-blue-600"
            >
                {isActive ? 'Stop' : 'Begin'}
            </button>
        </div>
    );
};

export default BreathingTimer;