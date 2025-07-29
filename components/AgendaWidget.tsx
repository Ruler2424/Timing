'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ListIcon } from './icons';
import { useCurrentTime } from '../hooks/useCurrentTime';
import { useAudioPlayer } from '../utils/sounds/playSound';
import { availableSounds } from '@/utils/sounds/audioAssets';

// Types
interface AgendaItem {
    id: string;
    time: string; // Format "HH:MM"
    task: string;
}

const INITIAL_AGENDA_ITEMS: AgendaItem[] = [
    { id: '1', time: '09:00', task: 'Morning Stand-up' },
    { id: '2', time: '10:30', task: 'Team Sync Meeting' },
    { id: '3', time: '12:00', task: 'Lunch Break' },
    { id: '4', time: '14:00', task: 'Focus Work Session' },
    { id: '5', time: '16:00', task: 'Client Call' },
];

const ALERT_BEFORE_MINUTES = 5;
const AGENDA_ALERT_SOUND_ID = 'agenda_alert';

// Define the sound source definitively outside the component or with explicit type guarantee
// This ensures `agendaAlertSoundSrc` is always a string.
const agendaAlertSoundSrc = availableSounds.find(s => s.id === AGENDA_ALERT_SOUND_ID)?.src || '/sounds/agenda-alert.mp3';


const AgendaWidget = () => {
    const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(INITIAL_AGENDA_ITEMS);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editedTime, setEditedTime] = useState('');
    const [editedTask, setEditedTask] = useState('');
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const editingRef = useRef<HTMLLIElement>(null);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const now = useCurrentTime();
    const { play, stop, isPlaying } = useAudioPlayer();

    // agendaAlertSoundSrc is now a guaranteed string from above

    const parseTime = (timeString: string) => {
        const parts = timeString.split(':');
        if (parts.length < 2) {
            console.warn(`Invalid time format: ${timeString}`);
            return { h: NaN, m: NaN };
        }
        const h = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        return { h, m };
    };

    const currentItemIndex = (() => {
        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
        const nextItemIdx = agendaItems.findIndex((item) => {
            const { h, m } = parseTime(item.time);
            if (isNaN(h) || isNaN(m)) return false;
            return currentTimeInMinutes < h * 60 + m;
        });
        return nextItemIdx - 1;
    })();

    const nextItemIndex = (() => {
        const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();
        return agendaItems.findIndex((item) => {
            const { h, m } = parseTime(item.time);
            if (isNaN(h) || isNaN(m)) return false;
            return currentTimeInMinutes < h * 60 + m;
        });
    })();

    useEffect(() => {
        // Now `agendaAlertSoundSrc` is definitively a string.
        // The error on line 47:28 (for `isPlaying`) and 48:28 (for `stop`) in the screenshot
        // should be resolved because `agendaAlertSoundSrc` no longer has `undefined` in its type.
        if (nextItemIndex !== -1) {
            const nextItem = agendaItems[nextItemIndex];
            if (nextItem) {
                const { h, m } = parseTime(nextItem.time);
                if (isNaN(h) || isNaN(m)) return;

                const nextMin = h * 60 + m;
                const nowMin = now.getHours() * 60 + now.getMinutes();

                if (nowMin >= (nextMin - ALERT_BEFORE_MINUTES) && nowMin < nextMin) {
                    if (!isPlaying(agendaAlertSoundSrc)) {
                         play(agendaAlertSoundSrc).catch(e => console.error('Failed to play agenda alert sound:', e));
                    }
                } else if (isPlaying(agendaAlertSoundSrc)) {
                    stop(agendaAlertSoundSrc);
                }
            }
        } else if (isPlaying(agendaAlertSoundSrc)) {
            stop(agendaAlertSoundSrc);
        }
    }, [now, nextItemIndex, agendaItems, play, stop, isPlaying, agendaAlertSoundSrc]); // agendaAlertSoundSrc is stable, so it's a valid dependency

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (editingRef.current && !editingRef.current.contains(e.target as Node)) {
                setIsEditing(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleEdit = (item: AgendaItem) => {
        setEditedTime(item.time);
        setEditedTask(item.task);
        setIsEditing(item.id);
        setMenuOpenId(null);
    };

    const handleDelete = (id: string) => {
        setAgendaItems(prev => prev.filter(i => i.id !== id));
        setMenuOpenId(null);
    };

    const handleSave = (id: string) => {
        if (!editedTime || !editedTask.trim()) {
            alert('Please enter a valid time and task.');
            return;
        }
        if (!/^\d{2}:\d{2}$/.test(editedTime)) {
             alert('Time format must be HH:MM.');
             return;
        }

        setAgendaItems(prev => {
            const updatedItems = prev.map(i => i.id === id ? { ...i, time: editedTime, task: editedTask.trim() } : i);
            return updatedItems.sort((a, b) => {
                const { h: ah, m: am } = parseTime(a.time);
                const { h: bh, m: bm } = parseTime(b.time);
                if (isNaN(ah) || isNaN(am) || isNaN(bh) || isNaN(bm)) return 0;
                return (ah * 60 + am) - (bh * 60 + bm);
            });
        });
        setIsEditing(null);
    };

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        dragItem.current = index;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDragEnter = (index: number) => {
        dragOverItem.current = index;
    };

    const handleDragEnd = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const newList = [...agendaItems];
        const draggedItem = newList.splice(dragItem.current, 1)[0];
        newList.splice(dragOverItem.current, 0, draggedItem);
        setAgendaItems(newList);
        dragItem.current = null;
        dragOverItem.current = null;
    };

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-lg h-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800">Today's Agenda</h3>
                <div className="flex items-center gap-2">
                    <button onClick={() => {
                        const newItem: AgendaItem = {
                            id: Date.now().toString(),
                            time: '08:00',
                            task: 'New Task'
                        };
                        setAgendaItems(prev => [...prev, newItem]);
                        handleEdit(newItem);
                    }}
                    aria-label="Add new agenda item"
                    >
                        <svg className="h-6 w-6 text-slate-400 hover:text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 6v6m0 6h6m-6 0H6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                    </button>
                    <ListIcon className="w-6 h-6 text-slate-400" />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                <ul className="space-y-3">
                    {agendaItems.map((item, index) => {
                        const isCurrent = index === currentItemIndex;
                        const isPast = index < currentItemIndex;
                        const isEditingItem = isEditing === item.id;

                        return (
                            <li key={item.id}
                                ref={isEditingItem ? editingRef : null}
                                className={`group flex items-center gap-2 py-1 pr-2 rounded ${isEditingItem ? 'bg-slate-100' : ''}`}
                                draggable
                                onDragStart={(e) => handleDragStart(e, index)}
                                onDragEnter={() => handleDragEnter(index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={(e) => e.preventDefault()}
                            >
                                {isEditingItem ? (
                                    <>
                                        <input
                                            type="time"
                                            value={editedTime}
                                            onChange={e => setEditedTime(e.target.value)}
                                            className="w-20 bg-transparent text-sm font-mono text-blue-600 font-bold outline-none border-b-2 border-blue-300 focus:border-blue-500"
                                            aria-label="Edit time"
                                        />
                                        <input
                                            type="text"
                                            value={editedTask}
                                            onChange={e => setEditedTask(e.target.value)}
                                            className="flex-grow text-sm text-black font-semibold bg-transparent outline-none border-b-2 border-blue-300 focus:border-blue-500"
                                            aria-label="Edit task"
                                        />
                                        <button
                                            onClick={() => handleSave(item.id)}
                                            title="Save"
                                            className="p-1 rounded-full hover:bg-slate-200"
                                            aria-label="Save changes"
                                        >
                                            ✔️
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className={`font-mono text-sm ${isCurrent ? 'text-blue-600 font-bold' : isPast ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {item.time}
                                        </span>
                                        <div className={`flex-grow border-t ${isCurrent ? 'border-blue-500' : 'border-slate-200'}`} />
                                        <span className={`text-sm truncate ${isCurrent ? 'text-slate-800 font-semibold' : isPast ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                            {item.task}
                                        </span>

                                        <div className="relative">
                                            <button
                                                onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)}
                                                aria-label="Options menu for agenda item"
                                                className="p-1 rounded-full hover:bg-slate-100"
                                            >
                                                <svg className="w-5 h-5 text-slate-500 hover:text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 104 0 2 2 0 00-4 0zM2 10a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </button>
                                            {menuOpenId === item.id && (
                                                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10 py-1">
                                                    <button className="w-full px-3 py-1 text-left text-sm hover:bg-slate-100" onClick={() => handleEdit(item)}>✏️ Edit</button>
                                                    <button className="w-full px-3 py-1 text-left text-sm hover:bg-slate-100" onClick={() => handleDelete(item.id)}>🗑 Delete</button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AgendaWidget;