// components/FlowTimer.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { SoundWaveIcon } from './icons';

// Обновляем массив SOUNDS, чтобы пути к звукам были относительными к папке public
const SOUNDS = [
    { name: 'Rain', src: '/sounds/rain.mp3' }, // Пример пути, убедитесь, что файл существует
    { name: 'Forest', src: '/sounds/forest.mp3' }, // Пример пути
    { name: 'Cafe', src: '/sounds/cafe.mp3' },     // Пример пути
];

const FlowTimer = () => {
    const [duration, setDuration] = useState(5400); // 90 минут
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const [selectedSound, setSelectedSound] = useState<string | null>(null);

    const intervalRef = useRef<number | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Сбрасываем воспроизведение
            }
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft]);
    
    useEffect(() => {
        if (audioRef.current) {
            if (isActive && selectedSound) {
                audioRef.current.src = selectedSound;
                audioRef.current.play().catch(e => console.error("Error playing sound:", e));
            } else {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Сбрасываем воспроизведение при остановке
            }
        }
    }, [isActive, selectedSound]);

    useEffect(() => {
        if (!isActive) {
             setTimeLeft(duration);
        }
    }, [duration, isActive]);

    const handleStartStop = () => setIsActive(!isActive);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };
    
    const progress = duration === 0 ? 0 : ((duration - timeLeft) / duration) * 100; // Избегаем деления на ноль

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64">
            {/* Добавляем элемент audio, src которого будет устанавливаться динамически */}
            <audio ref={audioRef} loop /> 
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Flow Timer</h3>
                <SoundWaveIcon className="w-6 h-6 text-slate-400" />
            </div>

            <div className="text-center my-2">
                <p className="font-digital text-5xl text-slate-800">{formatTime(timeLeft)}</p>
                <p className="text-sm text-slate-500 truncate">Duration: {duration/60} minutes</p>
            </div>

            <div className="space-y-4">
                 <div className="space-y-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%`, transition: 'width 1s linear' }}></div>
                    </div>
                     <input
                        type="range"
                        min="1800" max="7200" step="900" // Диапазон от 30 минут до 120 минут с шагом 15 минут
                        value={duration}
                        onChange={e => setDuration(Number(e.target.value))}
                        disabled={isActive}
                        className="w-full h-2 bg-transparent cursor-pointer"
                        aria-label="Set flow duration"
                    />
                </div>
                 <div className="flex justify-between items-center gap-2">
                    <select 
                        value={selectedSound || ''} 
                        onChange={e => setSelectedSound(e.target.value)}
                        className="flex-grow bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Select soundscape"
                    >
                        <option value="">No Sound</option>
                        {SOUNDS.map(s => <option key={s.name} value={s.src}>{s.name}</option>)}
                    </select>
                    <button 
                        onClick={handleStartStop} 
                        className={`w-28 py-2 rounded-lg text-white font-bold transition-colors ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {isActive ? 'STOP' : 'START'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlowTimer;