// components/PomodoroTimer.tsx
'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';

type Mode = 'work' | 'shortBreak' | 'longBreak';

const WORK_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;

const PomodoroTimer = () => {
    const [mode, setMode] = useState<Mode>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_TIME);
    const [isActive, setIsActive] = useState(false);
    const [pomodoros, setPomodoros] = useState(0);
    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const switchMode = useCallback((newMode: Mode) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsActive(false);
        setMode(newMode);
        switch (newMode) {
            case 'work':
                setTimeLeft(WORK_TIME);
                break;
            case 'shortBreak':
                setTimeLeft(SHORT_BREAK_TIME);
                break;
            case 'longBreak':
                setTimeLeft(LONG_BREAK_TIME);
                break;
        }
    }, []);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsActive(false);
            audioRef.current?.play().catch(e => console.error("Audio playback failed", e));
            
            if (mode === 'work') {
                const newPomodoros = pomodoros + 1;
                setPomodoros(newPomodoros);
                if (newPomodoros % 4 === 0) {
                    switchMode('longBreak');
                } else {
                    switchMode('shortBreak');
                }
            } else {
                switchMode('work');
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, mode, pomodoros, switchMode]);

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsActive(false);
        setPomodoros(0);
        switchMode('work');
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };
    
    const ModeButton = ({ buttonMode, children }: {
        buttonMode: Mode;
        children: React.ReactNode;
    }) => (
        <button
            onClick={() => switchMode(buttonMode)}
            className={`px-2 py-1.5 rounded-full text-sm font-medium transition-colors ${
                mode === buttonMode ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
        >
            {children}
        </button>
    );

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64">
            <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3" />
            <div>
                {/* Уменьшен заголовок */}
                <h3 className="font-semibold text-slate-800 mb-3 text-lg">Pomodoro Timer</h3> 
                <div className="flex flex-wrap justify-center gap-2">
                    <ModeButton buttonMode="work">Work</ModeButton>
                    <ModeButton buttonMode="shortBreak">Short Break</ModeButton>
                    <ModeButton buttonMode="longBreak">Long Break</ModeButton>
                </div>
            </div>
            
            <div className="text-center">
                {/* Уменьшен основной таймер */}
                <p className="font-digital text-6xl text-slate-800 tracking-wider">{formatTime(timeLeft)}</p> 
            </div>
            
            <div className="flex flex-col items-center gap-3">
                 <button 
                    onClick={handleStartPause} 
                    className={`w-3/4 py-3 rounded-lg text-white font-bold text-xl tracking-wider transition-colors ${
                        isActive ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                    aria-label={isActive ? 'Pause timer' : 'Start timer'}
                >
                    {isActive ? 'PAUSE' : 'START'}
                </button>
                <div className="w-full flex justify-between items-center text-xs px-2">
                    {/* Уменьшен текст с количеством Pomodoros */}
                    <span className="text-slate-500 truncate w-1/2 text-sm">Pomodoros: {pomodoros}</span> 
                     <button onClick={handleReset} className="text-slate-500 hover:text-slate-800 font-medium transition-colors text-sm">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PomodoroTimer;