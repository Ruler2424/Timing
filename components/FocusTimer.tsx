// components/FocusTimer.tsx
'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioPlayer } from '../utils/sounds/playSound'; // Импортируем useAudioPlayer
import useSound from 'use-sound'; // Импортируем useSound для звука завершения

interface FocusTimerProps {
    startSoundSrc?: string; // Звук при начале фокуса
    endSoundSrc?: string;   // Звук при завершении фокуса
}

const FocusTimer: React.FC<FocusTimerProps> = ({
    startSoundSrc = '/sounds/htc_basic.mp3', // Звук по умолчанию для старта
    endSoundSrc = '/sounds/htc_basic.mp3',     // Звук по умолчанию для завершения
}) => {
    const [duration, setDuration] = useState(3600); // Default 60 minutes
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Инициализация звуковых хуков
    const { play, stop, isPlaying } = useAudioPlayer();
    const [playEndSound, { stop: stopEndSound, isPlaying: isEndSoundPlaying }] = useSound(endSoundSrc, {
        volume: 0.7, // Можно настроить громкость
        loop: false,
    });

    // Эффект для управления интервалом таймера
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) { // Таймер завершился
            setIsActive(false); // Останавливаем таймер
            playEndSound(); // Проигрываем звук завершения
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, playEndSound]); // Добавили playEndSound в зависимости

    // Эффект для сброса timeLeft при изменении duration, если таймер не активен
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(duration);
        }
    }, [duration, isActive]);

    // Обработчик старта
    const handleStart = useCallback(() => {
        if (timeLeft === 0 && duration > 0) { // Если таймер дошел до нуля, но не был сброшен
            setTimeLeft(duration); // Сбросить время на выбранную длительность
        }
        setIsActive(true);
        play(startSoundSrc); // Проигрываем звук при старте
    }, [timeLeft, duration, play, startSoundSrc]);

    // Обработчик остановки
    const handleStop = useCallback(() => {
        setIsActive(false);
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        // Очищаем звуки при остановке, если они играют
        if (isPlaying(startSoundSrc)) {
            stop(startSoundSrc);
        }
        if (isEndSoundPlaying) { // Если звук окончания проигрывается (например, если нажали стоп сразу после завершения)
            stopEndSound();
        }
    }, [stop, startSoundSrc, stopEndSound, isPlaying, isEndSoundPlaying]);

    // Форматирование времени
    const formatTime = useCallback((seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }, []);

    // Компонент для кнопок выбора длительности
    const DurationButton = ({ minutes }: { minutes: number }) => (
        <button
            onClick={() => {
                setDuration(minutes * 60);
                // Если таймер не активен, сразу обновить timeLeft, чтобы отобразить новое выбранное время
                if (!isActive) {
                    setTimeLeft(minutes * 60);
                }
            }}
            disabled={isActive} // Отключаем кнопки, когда таймер активен
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors disabled:opacity-50 ${
                duration === minutes * 60 && !isActive ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
            }`}
        >
            {minutes} min
        </button>
    );

    return (
        <div className={`rounded-2xl p-6 flex flex-col justify-between shadow-lg h-64 text-white transition-colors ${isActive ? 'bg-indigo-600' : 'bg-slate-700'}`}>
            <h3 className="font-semibold">Focus Session</h3>

            {isActive || timeLeft === 0 ? ( // Показываем таймер, если активен или завершен (timeLeft === 0)
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <p className="font-digital text-5xl tracking-wider">{formatTime(timeLeft)}</p>
                    <p className="opacity-70 truncate">
                        {timeLeft > 0 ? 'Stay focused...' : 'Session Ended!'}
                    </p>
                </div>
            ) : ( // Показываем выбор длительности, если не активен и время не 0
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                    <p className="text-lg mb-4">Select duration and begin.</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        <DurationButton minutes={30} />
                        <DurationButton minutes={60} />
                        <DurationButton minutes={90} />
                    </div>
                </div>
            )}

            <div className="w-full">
                {isActive ? (
                    <button onClick={handleStop} className="w-full bg-white/30 hover:bg-white/40 font-bold py-3 rounded-lg">
                        STOP
                    </button>
                ) : (
                    <button
                        onClick={handleStart}
                        className="w-full bg-white/90 hover:bg-white text-indigo-700 font-bold py-3 rounded-lg"
                        disabled={duration === 0} // Отключаем кнопку, если длительность 0
                    >
                        BEGIN FOCUS
                    </button>
                )}
            </div>
        </div>
    );
};

export default FocusTimer;