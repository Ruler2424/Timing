'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ListIcon } from './icons.tsx';
import { useCurrentTime } from '../hooks/useCurrentTime.ts';
import { useAudioPlayer } from '../utils/sounds/playSound.tsx';

// Типы
interface AgendaItem {
    id: string;
    time: string;
    task: string;
}

const INITIAL_AGENDA_ITEMS: AgendaItem[] = [ /* ... */ ];

const ALERT_BEFORE_MINUTES = 5;

const AgendaWidget = () => {
    const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(INITIAL_AGENDA_ITEMS);
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [editedTime, setEditedTime] = useState('');
    const [editedTask, setEditedTask] = useState('');
    const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
    const editingRef = useRef<HTMLDivElement>(null);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const now = useCurrentTime();
    const { play, stop, isPlaying } = useAudioPlayer();
    const agendaAlertSound = '../utils/sounds/agenda-alert.mp3';

    const currentItemIndex = (() => {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        return agendaItems.findIndex((item) => {
            const [h, m] = item.time.split(':').map(Number);
            return currentTime < h * 60 + m;
        }) - 1;
    })();

    const nextItemIndex = (() => {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        return agendaItems.findIndex((item) => {
            const [h, m] = item.time.split(':').map(Number);
            return currentTime < h * 60 + m;
        });
    })();

    useEffect(() => {
        if (nextItemIndex !== -1) {
            const [h, m] = agendaItems[nextItemIndex].time.split(':').map(Number);
            const nextMin = h * 60 + m;
            const nowMin = now.getHours() * 60 + now.getMinutes();

            if (nowMin >= (nextMin - ALERT_BEFORE_MINUTES) && nowMin < nextMin) {
                if (!isPlaying(agendaAlertSound)) play(agendaAlertSound);
            } else if (isPlaying(agendaAlertSound)) stop(agendaAlertSound);
        } else if (isPlaying(agendaAlertSound)) stop(agendaAlertSound);
    }, [now, nextItemIndex]);

    // Клик вне области редактирования закрывает редактирование
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
        if (!editedTime || !editedTask.trim()) return alert('Enter time and task');
        setAgendaItems(prev => prev.map(i => i.id === id ? { ...i, time: editedTime, task: editedTask.trim() } : i));
        setIsEditing(null);
    };

    const handleDragStart = (index: number) => {
        dragItem.current = index;
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
        dragItem.current = dragOverItem.current = null;
    };

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-lg h-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800">Today's Agenda</h3>
                <div className="flex items-center gap-2">
                    <button onClick={() => {
                        const newItem = {
                            id: Date.now().toString(),
                            time: '08:00',
                            task: 'New Task'
                        };
                        setAgendaItems(prev => [...prev, newItem]);
                        handleEdit(newItem);
                    }}>
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
                                onDragStart={() => handleDragStart(index)}
                                onDragEnter={() => handleDragEnter(index)}
                                onDragEnd={handleDragEnd}
                            >
                                {isEditingItem ? (
                                    <>
                                        <input type="time" value={editedTime} onChange={e => setEditedTime(e.target.value)} className="w-20 bg-transparent text-sm font-mono text-blue-600 font-bold" />
                                        <input type="text" value={editedTask} onChange={e => setEditedTask(e.target.value)} className="flex-grow text-sm text-black font-semibold" />
                                        <button onClick={() => handleSave(item.id)} title="Save">
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

                                        {/* Три точки */}
                                        <div className="relative">
                                            <button onClick={() => setMenuOpenId(menuOpenId === item.id ? null : item.id)} aria-label="Options">
                                                <svg className="w-5 h-5 text-slate-500 hover:text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 104 0 2 2 0 00-4 0zM2 10a2 2 0 104 0 2 2 0 00-4 0z" />
                                                </svg>
                                            </button>
                                            {menuOpenId === item.id && (
                                                <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
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
