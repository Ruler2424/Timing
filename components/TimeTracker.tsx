'use client'
import React, { useState, useEffect, useRef } from 'react';

interface Task {
    name: string;
    duration: number;
}

const TimeTracker = () => {
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const intervalRef = useRef<number | null>(null);

    useEffect(() => {
        if (isActive) {
            const startTime = Date.now() - time;
            intervalRef.current = window.setInterval(() => {
                setTime(Date.now() - startTime);
            }, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    const handleStartStop = () => {
        if (isActive) {
            setIsActive(false);
            if (taskName.trim() !== '' && time > 0) {
                setTasks(prevTasks => [...prevTasks, { name: taskName, duration: time }]);
            }
            setTime(0);
            setTaskName('');
        } else {
            if (taskName.trim() !== '') {
                setTime(0);
                setIsActive(true);
            }
        }
    };

    const formatDuration = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <div className="bg-white rounded-2xl p-4 flex flex-col justify-between shadow-lg h-64">
            <h3 className="font-semibold text-slate-800">Time Tracker</h3>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="What are you working on?"
                className="w-full bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isActive}
            />
            <div className="flex justify-between items-center">
                <p className="font-digital text-2xl text-slate-800">{formatDuration(time)}</p>
                <button
                    onClick={handleStartStop}
                    disabled={!isActive && taskName.trim() === ''}
                    className={`px-4 py-1 rounded-lg text-sm text-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                    {isActive ? 'STOP' : 'START'}
                </button>
            </div>
            <div className="text-xs text-slate-500 overflow-y-scroll h-14 pr-1">
                {tasks.length > 0 ? (
                    <ul className="space-y-1">
                        {tasks
                            .slice()
                            .reverse()
                            .map((task, index) => (
                                <li key={index} className="flex justify-between truncate">
                                    <span className="w-3/4 overflow-hidden text-ellipsis">{task.name}</span>
                                    <span className="w-1/4 text-right">{formatDuration(task.duration)}</span>
                                </li>
                            ))}
                    </ul>
                ) : (
                    <p className="italic text-gray-400">No tasks tracked yet.</p>
                )}
            </div>
        </div>
    );
};

export default TimeTracker;
