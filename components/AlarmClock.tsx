// components/AlarmClock.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react'; // Добавил useCallback
import { useCurrentTime } from '../hooks/useCurrentTime.ts';
import { useAudioPlayer } from '../utils/sounds/playSound.tsx'; // Импортируем наш хук

const ALARM_SOUND_SRC = '../utils/sounds/htc_basic.mp3'; // Вынесли в константу

const AlarmClock = () => {
    const [alarmTime, setAlarmTime] = useState<string>('');
    const [isAlarmSet, setIsAlarmSet] = useState<boolean>(false);
    const [isAlarmRinging, setIsAlarmRinging] = useState<boolean>(false);
    const currentTime = useCurrentTime();
    const { play, stop, isPlaying } = useAudioPlayer();

    // Функция для установки будильника
    const handleSetAlarm = useCallback(() => { // Добавил useCallback
        if (alarmTime) {
            setIsAlarmSet(true);
            setIsAlarmRinging(false); // Сбросить, если уже звонил
            stop(ALARM_SOUND_SRC); // Остановить предыдущий звонок, если был
        }
    }, [alarmTime, stop]); // Зависимости для useCallback

    // Функция для очистки будильника
    const handleClearAlarm = useCallback(() => { // Добавил useCallback
        setIsAlarmSet(false);
        setIsAlarmRinging(false);
        setAlarmTime('');
        stop(ALARM_SOUND_SRC); // Убедиться, что звук остановлен
    }, [stop]); // Зависимости для useCallback

    // Эффект для проверки срабатывания будильника
    useEffect(() => {
        if (isAlarmSet && !isAlarmRinging && alarmTime) {
            const now = currentTime;
            const [hours, minutes] = alarmTime.split(':');
            const alarmHour = parseInt(hours, 10);
            const alarmMinute = parseInt(minutes, 10);

            // Проверяем, совпадает ли время
            if (now.getHours() === alarmHour && now.getMinutes() === alarmMinute) {
                setIsAlarmRinging(true);
            }
        }
    }, [currentTime, isAlarmSet, alarmTime, isAlarmRinging]); // Зависимости для useEffect

    // Эффект для управления воспроизведением звука
    useEffect(() => {
        if (isAlarmRinging) {
            // Воспроизводим звук, если он еще не играет
            if (!isPlaying(ALARM_SOUND_SRC)) {
                play(ALARM_SOUND_SRC);
            }
        } else {
            // Останавливаем звук, если будильник не звонит
            if (isPlaying(ALARM_SOUND_SRC)) {
                stop(ALARM_SOUND_SRC);
            }
        }
    }, [isAlarmRinging, play, stop, isPlaying]); // Зависимости для useEffect


    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg h-64">
            <h3 className="font-semibold text-slate-800 self-start">Alarm Clock</h3>
            
            <div className={`relative ${isAlarmRinging ? 'animate-pulse' : ''}`}> {/* Анимация может быть не совсем "bounce", а "pulse" */}
                <svg className="w-24 h-24 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8"></circle>
                    <polyline points="12 9 12 13 15 14"></polyline>
                    <line x1="5" y1="2" x2="10" y2="4"></line>
                    <line x1="19" y1="2" x2="14" y2="4"></line>
                </svg>
            </div>
            
            {isAlarmRinging ? (
                <div className="flex flex-col items-center gap-2">
                    <p className="font-digital text-2xl text-red-500 animate-pulse">WAKE UP!</p>
                    <button onClick={handleClearAlarm} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition-colors text-md mt-2">
                        Stop
                    </button>
                </div>
            ) : isAlarmSet ? (
                 <div className="flex flex-col items-center gap-2">
                    <p className="font-digital text-2xl text-slate-700">Alarm set for {alarmTime}</p>
                     <button onClick={handleClearAlarm} className="text-sm text-red-500 hover:underline">
                        Clear Alarm
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <input 
                        type="time" 
                        value={alarmTime}
                        onChange={(e) => setAlarmTime(e.target.value)}
                        className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-sans" // Добавил font-sans для лучшего вида
                        aria-label="Set alarm time"
                    />
                    <button onClick={handleSetAlarm} disabled={!alarmTime || isAlarmSet} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Set
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlarmClock;