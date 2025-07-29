// components/AlarmClock.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useAudioPlayer } from '../utils/sounds/playSound';

interface AlarmClockProps {
    alarmSoundSrc?: string;
}

const AlarmClock: React.FC<AlarmClockProps> = ({ alarmSoundSrc = '/sounds/htc_basic.mp3' }) => {
    const [alarmTime, setAlarmTime] = useState<string>('');
    const [isAlarmSet, setIsAlarmSet] = useState<boolean>(false);
    const [isAlarmRinging, setIsAlarmRinging] = useState<boolean>(false);
    const currentTime = useCurrentTime();
    const { play, stop, isPlaying } = useAudioPlayer();

    const handleSetAlarm = useCallback(() => {
        if (alarmTime) {
            setIsAlarmSet(true);
            setIsAlarmRinging(false);
            stop(alarmSoundSrc);
        }
    }, [alarmTime, stop, alarmSoundSrc]);

    const handleClearAlarm = useCallback(() => {
        setIsAlarmSet(false);
        setIsAlarmRinging(false);
        setAlarmTime('');
        stop(alarmSoundSrc);
    }, [stop, alarmSoundSrc]);

    useEffect(() => {
        if (isAlarmSet && !isAlarmRinging && alarmTime) {
            const now = currentTime;
            const [hoursStr, minutesStr] = alarmTime.split(':');
            const alarmHour = parseInt(hoursStr || '0', 10);
            const alarmMinute = parseInt(minutesStr || '0', 10);

            if (isNaN(alarmHour) || isNaN(alarmMinute)) {
                console.error("Invalid alarm time format:", alarmTime);
                setIsAlarmSet(false);
                return;
            }

            if (now.getHours() === alarmHour && now.getMinutes() === alarmMinute) {
                setIsAlarmRinging(true);
            }
        }
    }, [currentTime, isAlarmSet, alarmTime, isAlarmRinging]);

    useEffect(() => {
        if (isAlarmRinging) {
            if (!isPlaying(alarmSoundSrc)) {
                play(alarmSoundSrc);
            }
        } else {
            if (isPlaying(alarmSoundSrc)) {
                stop(alarmSoundSrc);
            }
        }
    }, [isAlarmRinging, play, stop, isPlaying, alarmSoundSrc]);

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg h-64">
            <h3 className="font-semibold text-slate-800 self-start">Alarm Clock</h3>

            <div className={`relative ${isAlarmRinging ? 'animate-pulse' : ''}`}>
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
                    <p className="font-digital text-l text-slate-700 truncate" style={{ maxWidth: '200px' }}>Alarm set for {alarmTime}</p>
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
                        className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-700 font-sans"
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