import React, { useState, useEffect, useRef } from 'react';

const IntervalTimer = () => {
    const [sets, setSets] = useState(8);
    const [workTime, setWorkTime] = useState(20);
    const [restTime, setRestTime] = useState(10);

    const [currentSet, setCurrentSet] = useState(1);
    const [phase, setPhase] = useState<'work' | 'rest' | 'idle'>('idle');
    const [timeLeft, setTimeLeft] = useState(workTime);
    const [isActive, setIsActive] = useState(false);

    const intervalRef = useRef<number | null>(null);
    const workAudioRef = useRef<HTMLAudioElement>(null);
    const restAudioRef = useRef<HTMLAudioElement>(null);

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
                
                // End of interval
                if (phase === 'work') {
                    restAudioRef.current?.play().catch(e => console.error(e));
                    setPhase('rest');
                    return restTime;
                } else if (phase === 'rest') {
                    if (currentSet < sets) {
                        workAudioRef.current?.play().catch(e => console.error(e));
                        setCurrentSet(c => c + 1);
                        setPhase('work');
                        return workTime;
                    } else {
                        // End of workout
                        setIsActive(false);
                        setPhase('idle');
                        setCurrentSet(1);
                        return workTime;
                    }
                }
                return 0;
            });
        }, 1000);
        
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };

    }, [isActive, phase, currentSet, sets, workTime, restTime]);

    const handleStart = () => {
        setCurrentSet(1);
        setPhase('work');
        setTimeLeft(workTime);
        setIsActive(true);
        workAudioRef.current?.play().catch(e => console.error(e));
    };

    const handlePause = () => setIsActive(!isActive);
    
    const handleReset = () => {
        setIsActive(false);
        setPhase('idle');
        setCurrentSet(1);
        setTimeLeft(workTime);
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
                 <p className="font-digital text-7xl tracking-wider">{timeLeft.toString().padStart(2, '0')}</p>
            </div>
            
            {isIdle ? (
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                        <label>Sets</label>
                        <input type="number" value={sets} onChange={e => setSets(Number(e.target.value))} className="w-full bg-white/20 rounded p-1 text-center"/>
                    </div>
                     <div>
                        <label>Work</label>
                        <input type="number" value={workTime} onChange={e => setWorkTime(Number(e.target.value))} className="w-full bg-white/20 rounded p-1 text-center"/>
                    </div>
                     <div>
                        <label>Rest</label>
                        <input type="number" value={restTime} onChange={e => setRestTime(Number(e.target.value))} className="w-full bg-white/20 rounded p-1 text-center"/>
                    </div>
                </div>
            ) : <div className="h-14"></div>}
            
            <div className="flex gap-4">
                {isIdle ? (
                    <button onClick={handleStart} className="w-full bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg">START</button>
                ) : (
                    <>
                        <button onClick={handlePause} className="w-1/2 bg-white/90 hover:bg-white text-slate-800 font-bold py-2 rounded-lg">{isActive ? 'PAUSE' : 'RESUME'}</button>
                        <button onClick={handleReset} className="w-1/2 bg-white/30 hover:bg-white/40 font-bold py-2 rounded-lg">RESET</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default IntervalTimer;