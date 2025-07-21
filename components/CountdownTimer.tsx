// components/CountdownTimer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useAudioPlayer } from '../utils/sounds/useAudioPlayer';

const SOUND_SRC = '/sounds/htc_basic.mp3'; // Путь от public

const CountdownTimer: React.FC = () => {
    const [duration, setDuration] = useState(10); // Секунды
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const { play, stop, isPlaying } = useAudioPlayer();

    const startTimer = () => {
        if (intervalRef.current) return;
        setIsRunning(true);
        setIsFinished(false);

        intervalRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    intervalRef.current = null;
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const stopTimer = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
        setIsFinished(false);
        stop(SOUND_SRC);
        setTimeLeft(duration);
    };

    useEffect(() => {
        if (isFinished && !isPlaying(SOUND_SRC)) {
            play(SOUND_SRC);
        }
    }, [isFinished]);

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setDuration(value);
            setTimeLeft(value);
        }
    };

    return (
        <div className="p-4 text-center space-y-4">
            <h1 className="text-2xl font-bold">⏱️ Таймер</h1>
            <input
                type="number"
                value={duration}
                onChange={handleDurationChange}
                disabled={isRunning}
                className="border p-2 w-32 text-center"
            />
            <div className="text-4xl">{timeLeft}s</div>
            <div className="space-x-2">
                {!isRunning && (
                    <button
                        onClick={startTimer}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Старт
                    </button>
                )}
                <button
                    onClick={stopTimer}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                >
                    Стоп
                </button>
            </div>
            {isFinished && <div className="text-red-600 font-semibold">⏰ Время вышло!</div>}
        </div>
    );
};

export default CountdownTimer;
