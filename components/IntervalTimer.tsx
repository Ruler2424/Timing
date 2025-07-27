// components/IntervalTimer.tsx
'use client'
import React, { useState, useEffect, useRef } from 'react';

const IntervalTimer = () => {
    const [sets, setSets] = useState(8);
    // Изменяем state и обработчики для минут
    const [workTimeMinutes, setWorkTimeMinutes] = useState(1); // По умолчанию 1 минута
    const [restTimeMinutes, setRestTimeMinutes] = useState(1); // По умолчанию 1 минута

    // Переводим минуты в секунды для внутренней логики
    const workTimeSeconds = workTimeMinutes * 60;
    const restTimeSeconds = restTimeMinutes * 60;

    const [currentSet, setCurrentSet] = useState(1);
    const [phase, setPhase] = useState<'work' | 'rest' | 'idle'>('idle');
    const [timeLeft, setTimeLeft] = useState(workTimeSeconds); // Инициализируем секундами
    const [isActive, setIsActive] = useState(false);

    const intervalRef = useRef<number | null>(null);
    const workAudioRef = useRef<HTMLAudioElement>(null);
    const restAudioRef = useRef<HTMLAudioElement>(null);

    // Функция для безопасной установки времени (не отрицательное)
    const safeSetTimeLeft = (time: number) => {
        setTimeLeft(Math.max(0, time));
    };

    // Инициализация timeLeft при изменении минут, если таймер не активен
    useEffect(() => {
        if (!isActive) {
            if (phase === 'work' || phase === 'idle') {
                safeSetTimeLeft(workTimeSeconds);
            } else if (phase === 'rest') {
                safeSetTimeLeft(restTimeSeconds);
            }
        }
    }, [workTimeSeconds, restTimeSeconds, isActive, phase]);

    // Основная логика таймера
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
                
                // Конец интервала
                if (phase === 'work') {
                    restAudioRef.current?.play().catch(e => console.error(e));
                    setPhase('rest');
                    safeSetTimeLeft(restTimeSeconds); // Устанавливаем время отдыха в секундах
                    return restTimeSeconds;
                } else if (phase === 'rest') {
                    if (currentSet < sets) {
                        workAudioRef.current?.play().catch(e => console.error(e));
                        setCurrentSet(c => c + 1);
                        setPhase('work');
                        safeSetTimeLeft(workTimeSeconds); // Устанавливаем время работы в секундах
                        return workTimeSeconds;
                    } else {
                        // Конец тренировки
                        setIsActive(false);
                        setPhase('idle');
                        setCurrentSet(1);
                        safeSetTimeLeft(workTimeSeconds); // Сбрасываем на начальное время работы
                        return workTimeSeconds;
                    }
                }
                return 0; // Этот код не должен выполняться в нормальном потоке
            });
        }, 1000);
        
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

    }, [isActive, phase, currentSet, sets, workTimeSeconds, restTimeSeconds]); // Зависимости для интервала

    const handleStart = () => {
        setCurrentSet(1);
        setPhase('work');
        safeSetTimeLeft(workTimeSeconds);
        setIsActive(true);
        workAudioRef.current?.play().catch(e => console.error(e));
    };

    const handlePause = () => setIsActive(!isActive);
    
    const handleReset = () => {
        setIsActive(false);
        setPhase('idle');
        setCurrentSet(1);
        safeSetTimeLeft(workTimeSeconds);
    };

    // Обработчики для изменения количества подходов
    const handleSetsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setSets(Math.max(1, value || 1)); // Убедимся, что минимум 1 подход
    };

    // Обработчики для изменения времени работы (в минутах)
    const handleWorkTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setWorkTimeMinutes(Math.max(0, value || 0)); // Убедимся, что минимум 0 минут
    };

    // Обработчики для изменения времени отдыха (в минутах)
    const handleRestTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setRestTimeMinutes(Math.max(0, value || 0)); // Убедимся, что минимум 0 минут
    };


    const isIdle = phase === 'idle';

    return (
        <div className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64 text-white transition-colors ${phase === 'work' ? 'bg-red-500' : phase === 'rest' ? 'bg-green-500' : 'bg-slate-700'}`}>
            <audio ref={workAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-clear-bell-notification-933.mp3" />
            <audio ref={restAudioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-quick-positive-video-game-notification-interface-265.mp3" />
            
            <div className="flex justify-between items-start">
                <h3 className="font-semibold">HIIT Timer</h3>
                {!isIdle && <span className="font-bold">Set: {currentSet} / {sets}</span>}
            </div>

            <div className="text-center">
                 <p className="text-xl font-bold uppercase tracking-widest">{phase}</p>
                 {/* ФорматируемtimeLeft для отображения в формате MM:SS */}
                 <p className="font-digital text-7xl tracking-wider">{`${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`}</p>
            </div>
            
            {isIdle ? (
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                        <label className="block mb-1">Sets</label>
                        <input 
                            type="number" 
                            value={sets} 
                            onChange={handleSetsChange} 
                            className="w-full bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
                            min="1"
                            aria-label="Number of sets"
                        />
                    </div>
                     <div>
                        <label className="block mb-1">Work (min)</label>
                        <input 
                            type="number" 
                            value={workTimeMinutes} 
                            onChange={handleWorkTimeChange} 
                            className="w-full bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
                            min="0"
                            aria-label="Work time in minutes"
                        />
                    </div>
                     <div>
                        <label className="block mb-1">Rest (min)</label>
                        <input 
                            type="number" 
                            value={restTimeMinutes} 
                            onChange={handleRestTimeChange} 
                            className="w-full bg-white/20 rounded p-1 text-center focus:outline-none focus:ring-2 focus:ring-white"
                            min="0"
                            aria-label="Rest time in minutes"
                        />
                    </div>
                </div>
            ) : <div className="h-14"></div>} {/* Placeholder для поддержания макета */}
            
            <div className="flex gap-4">
                {isIdle ? (
                    <button onClick={handleStart} className="w-full bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">START</button>
                ) : (
                    <>
                        <button onClick={handlePause} className="w-1/2 bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">{isActive ? 'PAUSE' : 'RESUME'}</button>
                        <button onClick={handleReset} className="w-1/2 bg-white/30 hover:bg-white/40 font-bold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white">RESET</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default IntervalTimer;