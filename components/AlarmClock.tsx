import React, { useState, useEffect, useRef } from 'react';
import { useCurrentTime } from '../hooks/useCurrentTime.ts';

const AlarmClock = () => {
    const [alarmTime, setAlarmTime] = useState<string>('');
    const [isAlarmSet, setIsAlarmSet] = useState<boolean>(false);
    const [isAlarmRinging, setIsAlarmRinging] = useState<boolean>(false);
    const currentTime = useCurrentTime();
    const audioRef = useRef<HTMLAudioElement>(null);

    // Effect to check if the alarm should go off
    useEffect(() => {
        if (isAlarmSet && !isAlarmRinging && alarmTime) {
            const now = currentTime;
            const [hours, minutes] = alarmTime.split(':');

            // Trigger if the current time matches the alarm time
            if (now.getHours() === parseInt(hours, 10) && now.getMinutes() === parseInt(minutes, 10)) {
                setIsAlarmRinging(true);
            }
        }
    }, [currentTime, isAlarmSet, alarmTime, isAlarmRinging]);

    // Effect to control audio playback based on ringing state
    useEffect(() => {
        if (isAlarmRinging) {
            // Browsers may block autoplay, so we catch potential errors.
            audioRef.current?.play().catch(e => console.error("Audio playback failed. User interaction might be required.", e));
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [isAlarmRinging]);


    const handleSetAlarm = () => {
        if (alarmTime) {
            setIsAlarmSet(true);
            setIsAlarmRinging(false);
        }
    };

    const handleClearAlarm = () => {
        setIsAlarmSet(false);
        setIsAlarmRinging(false);
        setAlarmTime('');
        // The audio will be stopped by the useEffect hook watching isAlarmRinging
    }

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col items-center justify-between shadow-lg h-64">
            {/* Audio element for the alarm sound. The `loop` attribute makes it repeat. */}
            <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" loop />
            
            <h3 className="font-semibold text-slate-800 self-start">Alarm clock</h3>
            
            <div className={`relative ${isAlarmRinging ? 'animate-bounce' : ''}`}>
                <svg className="w-24 h-24 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="13" r="8"></circle>
                    <polyline points="12 9 12 13 15 14"></polyline>
                    <line x1="5" y1="2" x2="10" y2="4"></line>
                    <line x1="19" y1="2" x2="14" y2="4"></line>
                </svg>
            </div>
            
            {/* Conditional UI based on alarm state */}
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
                        className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-700"
                        aria-label="Set alarm time"
                    />
                    <button onClick={handleSetAlarm} disabled={!alarmTime} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Set
                    </button>
                </div>
            )}
        </div>
    );
};

export default AlarmClock;